import { randomUUID } from "node:crypto";
import type { ExecutionContext } from "./types";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const maximumIdentifierLength = 36;

export interface CreateExecutionContextInput
  extends Partial<Omit<ExecutionContext, "correlationId" | "requestId">> {
  correlationId?: string | null;
  requestId?: string | null;
}

export function isValidCorrelationId(value: unknown): value is string {
  return (
    typeof value === "string" && value.length <= maximumIdentifierLength && uuidPattern.test(value)
  );
}

export function resolveCorrelationId(value?: string | null): string {
  return isValidCorrelationId(value) ? value.toLowerCase() : randomUUID();
}

export function resolveRequestId(value?: string | null): string {
  return isValidCorrelationId(value) ? value.toLowerCase() : randomUUID();
}

export function createExecutionContext(input: CreateExecutionContextInput = {}): ExecutionContext {
  const { correlationId, requestId, ...trustedContext } = input;

  return Object.freeze({
    ...compactContext(trustedContext),
    correlationId: resolveCorrelationId(correlationId),
    requestId: resolveRequestId(requestId),
  });
}

export function compactContext(context: Partial<ExecutionContext>): Partial<ExecutionContext> {
  return Object.fromEntries(
    Object.entries(context).filter((entry): entry is [string, string] => {
      const value = entry[1];
      return typeof value === "string" && value.trim().length > 0;
    }),
  );
}
