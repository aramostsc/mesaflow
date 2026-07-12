export interface RealtimeScope {
  readonly tenantId: string;
}

export interface RealtimeEvent<TPayload = unknown> extends RealtimeScope {
  readonly id: string;
  readonly type: string;
  readonly version: number;
  readonly payload: TPayload;
  readonly createdAt: string;
}

export interface RealtimeSnapshot<TPayload = unknown> extends RealtimeScope {
  readonly reason: "missing_last_event_id" | "unknown_last_event_id" | "version_gap";
  readonly lastEventId: string | null;
  readonly version: number;
  readonly payload: TPayload;
}

export type RealtimeReconnectResult<TPayload = unknown> =
  | {
      readonly mode: "replay";
      readonly events: readonly RealtimeEvent<TPayload>[];
    }
  | {
      readonly mode: "snapshot";
      readonly snapshot: RealtimeSnapshot<TPayload>;
    };

export type SseFrame =
  | {
      readonly kind: "event";
      readonly event: RealtimeEvent;
    }
  | {
      readonly kind: "heartbeat";
      readonly timestamp: string;
    };

export type RealtimeProbePayload = Record<string, string | number | boolean | null>;
