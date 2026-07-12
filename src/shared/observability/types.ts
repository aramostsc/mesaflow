export const logLevels = ["debug", "info", "warn", "error"] as const;

export type LogLevel = (typeof logLevels)[number];

export type SafeLogValue =
  | string
  | number
  | boolean
  | null
  | SafeLogValue[]
  | { [key: string]: SafeLogValue };

export type LogMetadata = Record<string, unknown>;

export interface ExecutionContext {
  readonly correlationId: string;
  readonly requestId: string;
  readonly tenantId?: string;
  readonly userId?: string;
  readonly module?: string;
  readonly operation?: string;
  readonly eventId?: string;
  readonly jobId?: string;
  readonly provider?: string;
}

export interface SerializedLogError {
  name: string;
  message: string;
}

export interface StructuredLogRecord extends ExecutionContext {
  timestamp: string;
  level: LogLevel;
  message: string;
  service: string;
  environment: string;
  metadata?: Record<string, SafeLogValue>;
  error?: SerializedLogError;
}

export type LogSink = (record: StructuredLogRecord) => void;

export interface LoggerPort {
  debug(message: string, metadata?: LogMetadata): void;
  info(message: string, metadata?: LogMetadata): void;
  warn(message: string, metadata?: LogMetadata): void;
  error(message: string, error?: unknown, metadata?: LogMetadata): void;
  child(context: Partial<Omit<ExecutionContext, "correlationId" | "requestId">>): LoggerPort;
}
