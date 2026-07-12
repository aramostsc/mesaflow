import { describe, expect, it } from "vitest";
import {
  RealtimeProbeStore,
  serializeHeartbeat,
  serializeSseEvent,
  validateRealtimeEvent,
  type RealtimeEvent,
} from "../../src/shared/realtime";

const tenantA = { tenantId: "tenant-a" };
const tenantB = { tenantId: "tenant-b" };

function createEvent(overrides: Partial<RealtimeEvent> = {}): RealtimeEvent {
  return {
    id: "1",
    type: "technical.probe.updated",
    version: 1,
    tenantId: tenantA.tenantId,
    payload: { status: "ready" },
    createdAt: "2026-07-12T00:00:00.000Z",
    ...overrides,
  };
}

describe("SSE realtime proof", () => {
  it("serializes SSE events correctly", () => {
    const event = createEvent();

    expect(serializeSseEvent(event)).toBe(
      ["id: 1", "event: technical.probe.updated", `data: ${JSON.stringify(event)}`, "", ""].join(
        "\n",
      ),
    );
  });

  it("requires id, type, version and payload on events", () => {
    const event = createEvent();

    expect(event).toMatchObject({
      id: "1",
      type: "technical.probe.updated",
      version: 1,
      payload: { status: "ready" },
    });
  });

  it("serializes heartbeat keepalive frames", () => {
    expect(serializeHeartbeat("2026-07-12T00:00:00.000Z")).toBe(
      ": heartbeat 2026-07-12T00:00:00.000Z\n\n",
    );
  });

  it("receives tenant-scoped events in order", () => {
    const store = new RealtimeProbeStore();
    const first = store.publish(tenantA, "technical.probe.created", { position: 1 });
    const second = store.publish(tenantA, "technical.probe.updated", { position: 2 });

    expect(store.listEvents(tenantA)).toEqual([first, second]);
    expect(Number(first.id)).toBeLessThan(Number(second.id));
    expect(first.version).toBe(1);
    expect(second.version).toBe(2);
  });

  it("reconnects with last event id and replays later events", () => {
    const store = new RealtimeProbeStore();
    const first = store.publish(tenantA, "technical.probe.created", { position: 1 });
    const second = store.publish(tenantA, "technical.probe.updated", { position: 2 });
    const third = store.publish(tenantA, "technical.probe.updated", { position: 3 });

    const result = store.reconnect(tenantA, first.id, 1);

    expect(result).toEqual({ mode: "replay", events: [second, third] });
  });

  it("reconnect without last event id returns a snapshot for safe reconciliation", () => {
    const store = new RealtimeProbeStore();
    store.publish(tenantA, "technical.probe.updated", { position: 1 });

    const result = store.reconnect(tenantA, null, 0);

    expect(result).toEqual({
      mode: "snapshot",
      snapshot: {
        tenantId: tenantA.tenantId,
        reason: "missing_last_event_id",
        lastEventId: null,
        version: 1,
        payload: { position: 1 },
      },
    });
  });

  it("detects missed event gaps and returns a snapshot", () => {
    const store = new RealtimeProbeStore();
    const first = store.publish(tenantA, "technical.probe.created", { position: 1 });
    store.publish(tenantA, "technical.probe.updated", { position: 2 });

    const result = store.reconnect(tenantA, first.id, 0);

    expect(result).toMatchObject({
      mode: "snapshot",
      snapshot: {
        tenantId: tenantA.tenantId,
        reason: "version_gap",
        lastEventId: first.id,
        version: 2,
      },
    });
  });

  it("does not deliver Tenant A events to Tenant B replay", () => {
    const store = new RealtimeProbeStore();
    store.publish(tenantA, "technical.probe.updated", { position: 1 });
    const tenantBEvent = store.publish(tenantB, "technical.probe.updated", { position: 1 });

    expect(store.listEvents(tenantB)).toEqual([tenantBEvent]);
  });

  it("rejects invalid realtime events safely", () => {
    expect(() => validateRealtimeEvent(createEvent({ id: "" }))).toThrow(
      "Realtime event id is required.",
    );
    expect(() => validateRealtimeEvent(createEvent({ type: "" }))).toThrow(
      "Realtime event type is required.",
    );
    expect(() => validateRealtimeEvent(createEvent({ version: 0 }))).toThrow(
      "Realtime event version must be a positive integer.",
    );
  });

  it("does not depend on waitlist or product domain events", () => {
    const store = new RealtimeProbeStore();
    const event = store.publish(tenantA, "technical.probe.updated", { status: "technical-only" });

    expect(event.type).toBe("technical.probe.updated");
    expect(event.payload).toEqual({ status: "technical-only" });
  });
});
