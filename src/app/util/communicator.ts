import winston from 'winston';

export interface Communicator {
  log(entry: LogEntry): void;
  info(message: string): void;
  debug(message: string): void;
  warn(message: string): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: string, error: any[]): void;
}

export type LogEntry = winston.LogEntry;
