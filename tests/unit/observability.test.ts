import { describe, expect, it } from "vitest";
import {
  createExecutionContext,
  createStructuredLogger,
  type LoggerPort,
  type StructuredLogRecord,
} from "../../src/shared/observability";

const validCorrelationId = "123e4567-e89b-42d3-a456-426614174000";
const validRequestId = "019c2b7a-3456-4789-8abc-1234567890ab";
const fixedTime = new Date("2026-07-12T12:00:00.000Z");

describe("observability foundation", () => {
  it("preserves valid correlation and request ids", () => {
    const context = createExecutionContext({
      correlationId: validCorrelationId,
      requestId: validRequestId,
    });

    expect(context).toMatchObject({ correlationId: validCorrelationId, requestId: validRequestId });
  });

  it("replaces invalid or missing ids", () => {
    const context = createExecutionContext({ correlationId: "not-an-id" });

    expect(context.correlationId).not.toBe("not-an-id");
    expect(context.correlationId).toMatch(/^[0-9a-f-]{36}$/);
    expect(context.requestId).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("does not share ids between independent contexts", () => {
    const first = createExecutionContext();
    const second = createExecutionContext();

    expect(first.correlationId).not.toBe(second.correlationId);
    expect(first.requestId).not.toBe(second.requestId);
  });

  it("writes structured records and preserves log levels", () => {
    const records: StructuredLogRecord[] = [];
    const logger = createStructuredLogger({
      service: "mesaflow",
      environment: "test",
      context: createExecutionContext({
        correlationId: validCorrelationId,
        requestId: validRequestId,
        module: "technical-probe",
      }),
      sink: (record) => records.push(record),
      now: () => fixedTime,
    });

    logger.debug("debug message");
    logger.info("info message");
    logger.warn("warn message");
    logger.error("error message", new TypeError("probe failed"));

    expect(records.map(({ level }) => level)).toEqual(["debug", "info", "warn", "error"]);
    expect(records[1]).toMatchObject({
      timestamp: fixedTime.toISOString(),
      level: "info",
      service: "mesaflow",
      environment: "test",
      correlationId: validCorrelationId,
      requestId: validRequestId,
      module: "technical-probe",
    });
    expect(records[3]?.error).toEqual({ name: "TypeError", message: "probe failed" });
  });

  it("keeps parent context and adds child context", () => {
    const records: StructuredLogRecord[] = [];
    const parent = createStructuredLogger({
      service: "mesaflow-worker",
      environment: "test",
      context: createExecutionContext({
        correlationId: validCorrelationId,
        requestId: validRequestId,
        module: "outbox",
      }),
      sink: (record) => records.push(record),
    });

    parent.child({ operation: "process-probe", jobId: "job-1" }).info("processed");

    expect(records[0]).toMatchObject({
      correlationId: validCorrelationId,
      requestId: validRequestId,
      module: "outbox",
      operation: "process-probe",
      jobId: "job-1",
    });
  });

  it("preserves ordinary metadata while redacting sensitive fields", () => {
    const records: StructuredLogRecord[] = [];
    const logger = createStructuredLogger({
      service: "mesaflow",
      environment: "test",
      context: createExecutionContext(),
      sink: (record) => records.push(record),
    });

    logger.info("operation", {
      attempt: 2,
      result: "retrying",
      credentials: { accessToken: "secret-token", region: "eu" },
    });

    expect(records[0]?.metadata).toEqual({
      attempt: 2,
      result: "retrying",
      credentials: { accessToken: "[REDACTED]", region: "eu" },
    });
  });

  it("supports a replaceable fake logger", async () => {
    const messages: string[] = [];
    const fake: LoggerPort = {
      debug: (message) => messages.push(message),
      info: (message) => messages.push(message),
      warn: (message) => messages.push(message),
      error: (message) => messages.push(message),
      child: () => fake,
    };
    const workerLikeFunction = async (logger: LoggerPort) => {
      logger.child({ operation: "worker-probe" }).info("worker completed");
    };

    await workerLikeFunction(fake);

    expect(messages).toEqual(["worker completed"]);
  });

  it("does not propagate sink failures into the observed operation", () => {
    const logger = createStructuredLogger({
      service: "mesaflow",
      environment: "test",
      context: createExecutionContext(),
      sink: () => {
        throw new Error("sink unavailable");
      },
    });

    expect(() => logger.info("operation succeeded")).not.toThrow();
  });

  it("does not infer tenant identity from metadata", () => {
    const records: StructuredLogRecord[] = [];
    const logger = createStructuredLogger({
      service: "mesaflow",
      environment: "test",
      context: createExecutionContext(),
      sink: (record) => records.push(record),
    });

    logger.info("untrusted input", { tenantId: "client-supplied-tenant" });

    expect(records[0]?.tenantId).toBeUndefined();
    expect(records[0]?.metadata?.tenantId).toBe("client-supplied-tenant");
  });
});
