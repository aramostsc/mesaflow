import { sql, type SQL } from "drizzle-orm";
import type {
  OutboxProbeEvent,
  OutboxProbeEventInput,
  OutboxProbePayload,
  OutboxProbeStatus,
} from "./types";

interface QueryResult<TRow> {
  rows: TRow[];
}

export interface OutboxQueryExecutor {
  execute(query: SQL): Promise<QueryResult<unknown>>;
}

interface OutboxProbeRow {
  id: string;
  tenant_id: string;
  stream_key: string;
  event_type: string;
  event_version: number;
  payload: string;
  status: OutboxProbeStatus;
  attempt_count: number;
  max_attempts: number;
  available_at: Date;
  locked_at: Date | null;
  processed_at: Date | null;
  last_error: string | null;
  created_at: Date;
}

export function validateOutboxProbePayload(payload: unknown): OutboxProbePayload {
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Outbox probe payload must be a plain object.");
  }

  const entries = Object.entries(payload);
  const normalizedPayload: OutboxProbePayload = {};

  for (const [key, value] of entries) {
    if (
      value !== null &&
      typeof value !== "string" &&
      typeof value !== "number" &&
      typeof value !== "boolean"
    ) {
      throw new Error("Outbox probe payload values must be scalar.");
    }

    normalizedPayload[key] = value;
  }

  return normalizedPayload;
}

export async function insertOutboxProbeEvent(
  executor: OutboxQueryExecutor,
  input: OutboxProbeEventInput,
): Promise<OutboxProbeEvent> {
  const id = requireText(input.id, "Outbox probe event id is required.");
  const tenantId = requireText(input.tenantId, "Outbox probe tenant id is required.");
  const streamKey = requireText(input.streamKey, "Outbox probe stream key is required.");
  const eventType = requireText(input.eventType, "Outbox probe event type is required.");
  const payload = validateOutboxProbePayload(input.payload);
  const eventVersion = requirePositiveInteger(
    input.eventVersion,
    "Outbox probe event version must be positive.",
  );
  const maxAttempts = requirePositiveInteger(
    input.maxAttempts ?? 3,
    "Outbox probe max attempts must be positive.",
  );

  const result = await executor.execute(sql`
    INSERT INTO mesaflow_technical.outbox_probe_events (
      id,
      tenant_id,
      stream_key,
      event_type,
      event_version,
      payload,
      max_attempts,
      available_at
    )
    VALUES (
      ${id},
      ${tenantId},
      ${streamKey},
      ${eventType},
      ${eventVersion},
      ${JSON.stringify(payload)},
      ${maxAttempts},
      ${input.availableAt ?? new Date()}
    )
    RETURNING *
  `);

  return mapOutboxProbeRow(result.rows[0]);
}

export function mapOutboxProbeRow(row: unknown): OutboxProbeEvent {
  const outboxRow = toOutboxProbeRow(row);

  if (outboxRow === undefined) {
    throw new Error("Outbox probe event was not returned.");
  }

  return {
    id: outboxRow.id,
    tenantId: outboxRow.tenant_id,
    streamKey: outboxRow.stream_key,
    eventType: outboxRow.event_type,
    eventVersion: outboxRow.event_version,
    payload: validateOutboxProbePayload(JSON.parse(outboxRow.payload) as unknown),
    status: outboxRow.status,
    attemptCount: outboxRow.attempt_count,
    maxAttempts: outboxRow.max_attempts,
    availableAt: outboxRow.available_at,
    lockedAt: outboxRow.locked_at,
    processedAt: outboxRow.processed_at,
    lastError: outboxRow.last_error,
    createdAt: outboxRow.created_at,
  };
}

function toOutboxProbeRow(row: unknown): OutboxProbeRow | undefined {
  if (row === undefined) {
    return undefined;
  }

  if (row === null || typeof row !== "object") {
    throw new Error("Outbox probe database row is invalid.");
  }

  const record = row as Record<string, unknown>;

  return {
    id: requireRowString(record.id, "id"),
    tenant_id: requireRowString(record.tenant_id, "tenant_id"),
    stream_key: requireRowString(record.stream_key, "stream_key"),
    event_type: requireRowString(record.event_type, "event_type"),
    event_version: requireRowNumber(record.event_version, "event_version"),
    payload: requireRowString(record.payload, "payload"),
    status: requireRowStatus(record.status),
    attempt_count: requireRowNumber(record.attempt_count, "attempt_count"),
    max_attempts: requireRowNumber(record.max_attempts, "max_attempts"),
    available_at: requireRowDate(record.available_at, "available_at"),
    locked_at: requireNullableRowDate(record.locked_at, "locked_at"),
    processed_at: requireNullableRowDate(record.processed_at, "processed_at"),
    last_error: requireNullableRowString(record.last_error, "last_error"),
    created_at: requireRowDate(record.created_at, "created_at"),
  };
}

function requireText(value: string, message: string): string {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    throw new Error(message);
  }

  return trimmedValue;
}

function requirePositiveInteger(value: number, message: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(message);
  }

  return value;
}

function requireRowString(value: unknown, fieldName: string): string {
  if (typeof value !== "string") {
    throw new Error(`Outbox probe database row field ${fieldName} is invalid.`);
  }

  return value;
}

function requireNullableRowString(value: unknown, fieldName: string): string | null {
  if (value === null) {
    return null;
  }

  return requireRowString(value, fieldName);
}

function requireRowNumber(value: unknown, fieldName: string): number {
  if (typeof value !== "number") {
    throw new Error(`Outbox probe database row field ${fieldName} is invalid.`);
  }

  return value;
}

function requireRowDate(value: unknown, fieldName: string): Date {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string") {
    const parsedDate = new Date(value);

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  throw new Error(`Outbox probe database row field ${fieldName} is invalid.`);
}

function requireNullableRowDate(value: unknown, fieldName: string): Date | null {
  if (value === null) {
    return null;
  }

  return requireRowDate(value, fieldName);
}

function requireRowStatus(value: unknown): OutboxProbeStatus {
  if (
    value === "pending" ||
    value === "processing" ||
    value === "processed" ||
    value === "failed"
  ) {
    return value;
  }

  throw new Error("Outbox probe database row field status is invalid.");
}

export type { OutboxProbeRow };
