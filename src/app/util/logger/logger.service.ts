/* eslint-disable @typescript-eslint/no-explicit-any */
import winston, { Logger } from 'winston';
import { Communicator, LogEntry } from '../communicator';

export class LoggerService implements Communicator {
  private logger: Logger;
  private logFileName = "homelabrc.log";
  private logPath: string;

  constructor(private _logPath: string) {
    this.logPath = _logPath;
    this.logger = winston.createLogger({
      level: 'info', // Default log level
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `${this.logPath}/${this.logFileName}`})
      ],
    });
  }
  log(entry: LogEntry): void {
    this.logger.log(entry);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string, error: any[]): void {
    this.logger.error(message, ...error);
  }
}
