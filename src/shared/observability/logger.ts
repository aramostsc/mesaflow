import { compactContext } from "./context";
import { redactLogText, redactMetadata, serializeLogError } from "./redaction";
import type {
  ExecutionContext,
  LogLevel,
  LogMetadata,
  LogSink,
  LoggerPort,
  StructuredLogRecord,
} from "./types";

export interface CreateStructuredLoggerOptions {
  service: string;
  environment: string;
  context: ExecutionContext;
  sink?: LogSink;
  now?: () => Date;
}

export function createStructuredLogger(options: CreateStructuredLoggerOptions): LoggerPort {
  return new StructuredLogger(
    requireLabel(options.service, "service"),
    requireLabel(options.environment, "environment"),
    options.context,
    options.sink ?? consoleJsonSink,
    options.now ?? (() => new Date()),
  );
}

export const consoleJsonSink: LogSink = (record) => {
  console.log(JSON.stringify(record));
};

class StructuredLogger implements LoggerPort {
  constructor(
    private readonly service: string,
    private readonly environment: string,
    private readonly context: ExecutionContext,
    private readonly sink: LogSink,
    private readonly now: () => Date,
  ) {}

  debug(message: string, metadata?: LogMetadata): void {
    this.write("debug", message, metadata);
  }

  info(message: string, metadata?: LogMetadata): void {
    this.write("info", message, metadata);
  }

  warn(message: string, metadata?: LogMetadata): void {
    this.write("warn", message, metadata);
  }

  error(message: string, error?: unknown, metadata?: LogMetadata): void {
    this.write("error", message, metadata, error);
  }

  child(context: Partial<Omit<ExecutionContext, "correlationId" | "requestId">>): LoggerPort {
    return new StructuredLogger(
      this.service,
      this.environment,
      { ...this.context, ...compactContext(context) },
      this.sink,
      this.now,
    );
  }

  private write(level: LogLevel, message: string, metadata?: LogMetadata, error?: unknown): void {
    const record: StructuredLogRecord = {
      timestamp: this.now().toISOString(),
      level,
      message: redactLogText(requireLabel(message, "message")),
      service: this.service,
      environment: this.environment,
      ...this.context,
    };
    const safeMetadata = redactMetadata(metadata);

    if (safeMetadata) {
      record.metadata = safeMetadata;
    }

    if (error !== undefined) {
      record.error = serializeLogError(error);
    }

    try {
      this.sink(Object.freeze(record));
    } catch {
      // Telemetry failure must never change the outcome of the observed operation.
    }
  }
}

function requireLabel(value: string, field: string): string {
  const normalized = value.trim();

  if (normalized.length === 0) {
    throw new Error(`Structured logger ${field} is required.`);
  }

  return normalized.slice(0, 200);
}
