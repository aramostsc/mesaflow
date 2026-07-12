export const outboxProbeStatuses = ["pending", "processing", "processed", "failed"] as const;

export type OutboxProbeStatus = (typeof outboxProbeStatuses)[number];

export type OutboxProbePayloadValue = string | number | boolean | null;

export type OutboxProbePayload = Record<string, OutboxProbePayloadValue>;

export interface OutboxProbeEvent {
  id: string;
  tenantId: string;
  streamKey: string;
  eventType: string;
  eventVersion: number;
  payload: OutboxProbePayload;
  status: OutboxProbeStatus;
  attemptCount: number;
  maxAttempts: number;
  availableAt: Date;
  lockedAt: Date | null;
  processedAt: Date | null;
  lastError: string | null;
  createdAt: Date;
}

export interface OutboxProbeEventInput {
  id: string;
  tenantId: string;
  streamKey: string;
  eventType: string;
  eventVersion: number;
  payload: unknown;
  maxAttempts?: number;
  availableAt?: Date;
}

export interface OutboxProbeBatchResult {
  claimed: number;
  processed: number;
  retried: number;
  failed: number;
}
