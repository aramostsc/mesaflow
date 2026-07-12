import type { LogMetadata, SafeLogValue, SerializedLogError } from "./types";

export const redactedValue = "[REDACTED]";

const maximumDepth = 4;
const maximumEntries = 50;
const maximumArrayItems = 20;
const maximumStringLength = 500;

const sensitiveKeys = new Set([
  "password",
  "passwordhash",
  "accesstoken",
  "refreshtoken",
  "authorization",
  "authorizationheader",
  "cookie",
  "setcookie",
  "sessiontoken",
  "apikey",
  "databaseurl",
  "secret",
  "mfacode",
  "phonenumber",
  "phone",
  "statustoken",
  "privatemessage",
  "messagebody",
  "notebody",
]);

export function redactMetadata(metadata?: LogMetadata): Record<string, SafeLogValue> | undefined {
  if (!metadata) {
    return undefined;
  }

  const sanitized = sanitizeObject(metadata, 0, new WeakSet<object>());
  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

export function serializeLogError(error: unknown): SerializedLogError {
  if (error instanceof Error) {
    return {
      name: normalizeErrorText(error.name, "Error"),
      message: redactLogText(normalizeErrorText(error.message, "Unexpected error")),
    };
  }

  return {
    name: "UnknownError",
    message: "Unexpected error",
  };
}

export function redactLogText(value: string): string {
  return value
    .replace(/\bBearer\s+[^\s,;]+/gi, `Bearer ${redactedValue}`)
    .replace(/\b(?:postgres|postgresql):\/\/[^\s]+/gi, redactedValue)
    .replace(
      /\b(password|access[_-]?token|refresh[_-]?token|session[_-]?token|authorization|cookie|api[_-]?key|database[_-]?url|secret|mfa[_-]?code)\b\s*[:=]\s*[^\s,;]+/gi,
      (_match, label: string) => `${label}=${redactedValue}`,
    );
}

function sanitizeObject(
  value: Record<string, unknown>,
  depth: number,
  seen: WeakSet<object>,
): Record<string, SafeLogValue> {
  if (seen.has(value)) {
    return { value: "[CIRCULAR]" };
  }

  seen.add(value);
  const result: Record<string, SafeLogValue> = {};

  for (const [key, entryValue] of Object.entries(value).slice(0, maximumEntries)) {
    result[key] = isSensitiveKey(key) ? redactedValue : sanitizeValue(entryValue, depth + 1, seen);
  }

  seen.delete(value);
  return result;
}

function sanitizeValue(value: unknown, depth: number, seen: WeakSet<object>): SafeLogValue {
  if (value === null || typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : String(value);
  }

  if (typeof value === "string") {
    return value.slice(0, maximumStringLength);
  }

  if (typeof value === "bigint") {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value instanceof Error) {
    return serializeLogError(value) as unknown as Record<string, SafeLogValue>;
  }

  if (depth > maximumDepth) {
    return "[TRUNCATED]";
  }

  if (Array.isArray(value)) {
    return value.slice(0, maximumArrayItems).map((entry) => sanitizeValue(entry, depth + 1, seen));
  }

  if (typeof value === "object") {
    return sanitizeObject(value as Record<string, unknown>, depth, seen);
  }

  return String(value).slice(0, maximumStringLength);
}

function isSensitiveKey(key: string): boolean {
  return sensitiveKeys.has(key.toLowerCase().replace(/[^a-z0-9]/g, ""));
}

function normalizeErrorText(value: string, fallback: string): string {
  const normalized = value.trim();
  return normalized.length > 0 ? normalized.slice(0, maximumStringLength) : fallback;
}
