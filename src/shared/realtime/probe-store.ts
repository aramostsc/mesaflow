import type {
  RealtimeEvent,
  RealtimeProbePayload,
  RealtimeReconnectResult,
  RealtimeScope,
  RealtimeSnapshot,
} from "./types";

interface StoredTenantState {
  readonly events: RealtimeEvent<RealtimeProbePayload>[];
  snapshotPayload: RealtimeProbePayload;
  version: number;
}

export class RealtimeProbeStore {
  private nextEventId = 1;
  private readonly tenantStates = new Map<string, StoredTenantState>();

  publish(
    scope: RealtimeScope,
    type: string,
    payload: RealtimeProbePayload,
  ): RealtimeEvent<RealtimeProbePayload> {
    const tenantState = this.getTenantState(scope.tenantId);
    const version = tenantState.version + 1;
    const event: RealtimeEvent<RealtimeProbePayload> = {
      id: String(this.nextEventId),
      type,
      tenantId: scope.tenantId,
      version,
      payload,
      createdAt: new Date().toISOString(),
    };

    validatePublishInput(event);
    this.nextEventId += 1;
    tenantState.events.push(event);
    tenantState.snapshotPayload = payload;
    tenantState.version = version;

    return event;
  }

  reconnect(
    scope: RealtimeScope,
    lastEventId: string | null,
    clientVersion: number,
  ): RealtimeReconnectResult<RealtimeProbePayload> {
    const tenantState = this.getTenantState(scope.tenantId);

    if (lastEventId === null) {
      return {
        mode: "snapshot",
        snapshot: this.createSnapshot(scope, tenantState, "missing_last_event_id", null),
      };
    }

    const lastEventIndex = tenantState.events.findIndex((event) => event.id === lastEventId);

    if (lastEventIndex === -1) {
      return {
        mode: "snapshot",
        snapshot: this.createSnapshot(scope, tenantState, "unknown_last_event_id", lastEventId),
      };
    }

    const nextEvents = tenantState.events.slice(lastEventIndex + 1);
    const firstReplayVersion = nextEvents[0]?.version;

    if (firstReplayVersion !== undefined && firstReplayVersion !== clientVersion + 1) {
      return {
        mode: "snapshot",
        snapshot: this.createSnapshot(scope, tenantState, "version_gap", lastEventId),
      };
    }

    return {
      mode: "replay",
      events: nextEvents,
    };
  }

  listEvents(scope: RealtimeScope): readonly RealtimeEvent<RealtimeProbePayload>[] {
    return [...this.getTenantState(scope.tenantId).events];
  }

  private getTenantState(tenantId: string): StoredTenantState {
    const normalizedTenantId = tenantId.trim();

    if (normalizedTenantId.length === 0) {
      throw new Error("Realtime tenant id is required.");
    }

    const existing = this.tenantStates.get(normalizedTenantId);

    if (existing !== undefined) {
      return existing;
    }

    const created: StoredTenantState = {
      events: [],
      snapshotPayload: {},
      version: 0,
    };

    this.tenantStates.set(normalizedTenantId, created);

    return created;
  }

  private createSnapshot(
    scope: RealtimeScope,
    tenantState: StoredTenantState,
    reason: RealtimeSnapshot["reason"],
    lastEventId: string | null,
  ): RealtimeSnapshot<RealtimeProbePayload> {
    return {
      tenantId: scope.tenantId,
      reason,
      lastEventId,
      version: tenantState.version,
      payload: tenantState.snapshotPayload,
    };
  }
}

function validatePublishInput(event: RealtimeEvent): void {
  if (event.type.trim().length === 0) {
    throw new Error("Realtime event type is required.");
  }

  if (!Number.isInteger(event.version) || event.version < 1) {
    throw new Error("Realtime event version must be a positive integer.");
  }
}
