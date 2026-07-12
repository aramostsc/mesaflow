import { describe, expect, it } from "vitest";
import {
  createExecutionContext,
  createStructuredLogger,
  isValidCorrelationId,
  type StructuredLogRecord,
} from "../../src/shared/observability";

function captureRecord(metadata: Record<string, unknown>): StructuredLogRecord {
  const records: StructuredLogRecord[] = [];
  const logger = createStructuredLogger({
    service: "mesaflow-security-test",
    environment: "test",
    context: createExecutionContext(),
    sink: (record) => records.push(record),
  });

  logger.info("security probe", metadata);
  return records[0] as StructuredLogRecord;
}

describe("observability security policy", () => {
  it("redacts tokens and API keys recursively", () => {
    const record = captureRecord({
      accessToken: "access-secret",
      nested: { refresh_token: "refresh-secret", apiKey: "api-secret" },
    });

    expect(record.metadata).toEqual({
      accessToken: "[REDACTED]",
      nested: { refresh_token: "[REDACTED]", apiKey: "[REDACTED]" },
    });
  });

  it("redacts cookies and authorization headers", () => {
    const record = captureRecord({
      cookie: "session=secret",
      headers: { authorization: "Bearer secret", setCookie: "private=secret" },
    });

    expect(JSON.stringify(record)).not.toContain("secret");
    expect(record.metadata).toEqual({
      cookie: "[REDACTED]",
      headers: { authorization: "[REDACTED]", setCookie: "[REDACTED]" },
    });
  });

  it("rejects excessively long correlation ids", () => {
    const supplied = "a".repeat(1_000);
    const context = createExecutionContext({ correlationId: supplied });

    expect(isValidCorrelationId(supplied)).toBe(false);
    expect(context.correlationId).not.toBe(supplied);
    expect(context.correlationId).toHaveLength(36);
  });

  it("rejects correlation ids with invalid UUID format", () => {
    const supplied = "123e4567-e89b-02d3-a456-426614174000";
    const context = createExecutionContext({ correlationId: supplied });

    expect(isValidCorrelationId(supplied)).toBe(false);
    expect(context.correlationId).not.toBe(supplied);
  });

  it("does not expose stack traces or custom sensitive error properties", () => {
    const records: StructuredLogRecord[] = [];
    const logger = createStructuredLogger({
      service: "mesaflow-security-test",
      environment: "test",
      context: createExecutionContext(),
      sink: (record) => records.push(record),
    });
    const error = Object.assign(new Error("provider failed"), {
      accessToken: "error-secret",
      response: { authorization: "Bearer error-secret" },
    });

    logger.error("safe failure", error);

    expect(records[0]?.error).toEqual({ name: "Error", message: "provider failed" });
    expect(JSON.stringify(records[0])).not.toContain("error-secret");
    expect(JSON.stringify(records[0])).not.toContain("stack");
  });

  it("redacts credentials embedded in error messages", () => {
    const records: StructuredLogRecord[] = [];
    const logger = createStructuredLogger({
      service: "mesaflow-security-test",
      environment: "test",
      context: createExecutionContext(),
      sink: (record) => records.push(record),
    });

    logger.error(
      "provider failure",
      new Error("authorization=Bearer-secret postgres://user:password@example.test/database"),
    );

    expect(JSON.stringify(records[0])).not.toContain("Bearer-secret");
    expect(JSON.stringify(records[0])).not.toContain("user:password");
  });

  it("redacts database URLs, MFA codes and private message content", () => {
    const record = captureRecord({
      databaseUrl: "postgres://user:password@example.test/database",
      mfaCode: "123456",
      privateMessage: "private customer content",
      normalResult: "failed",
    });

    expect(record.metadata).toEqual({
      databaseUrl: "[REDACTED]",
      mfaCode: "[REDACTED]",
      privateMessage: "[REDACTED]",
      normalResult: "failed",
    });
  });
});
