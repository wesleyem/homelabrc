import winston from 'winston';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Communicator {
  log(entry: LogEntry): void;
  // log(level: string, message: string, error?: any[]): void
  info(message: string): void;
  debug(message: string): void;
  warn(message: string): void;
  error(message: string, error: any[]): void;
}

export type LogEntry = winston.LogEntry;
