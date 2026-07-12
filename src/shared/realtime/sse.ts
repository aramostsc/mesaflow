import type { RealtimeEvent, SseFrame } from "./types";

export function serializeSseEvent(event: RealtimeEvent): string {
  validateRealtimeEvent(event);

  return [`id: ${event.id}`, `event: ${event.type}`, `data: ${JSON.stringify(event)}`, "", ""].join(
    "\n",
  );
}

export function serializeHeartbeat(timestamp: string): string {
  if (timestamp.trim().length === 0) {
    throw new Error("Heartbeat timestamp is required.");
  }

  return `: heartbeat ${timestamp}\n\n`;
}

export function serializeSseFrame(frame: SseFrame): string {
  if (frame.kind === "heartbeat") {
    return serializeHeartbeat(frame.timestamp);
  }

  return serializeSseEvent(frame.event);
}

export function validateRealtimeEvent(event: RealtimeEvent): void {
  if (event.id.trim().length === 0) {
    throw new Error("Realtime event id is required.");
  }

  if (event.type.trim().length === 0) {
    throw new Error("Realtime event type is required.");
  }

  if (event.tenantId.trim().length === 0) {
    throw new Error("Realtime event tenant id is required.");
  }

  if (!Number.isInteger(event.version) || event.version < 1) {
    throw new Error("Realtime event version must be a positive integer.");
  }
}
