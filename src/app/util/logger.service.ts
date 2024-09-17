import winston, { Logger } from 'winston';

export class LoggerService {
  private logger: Logger;
  constructor() {
    this.logger = winston.createLogger({
      level: 'info', // Default log level, can be 'info', 'warn', 'error', etc.
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/homelabrc.log'})
      ],
    });
  }

  log(level: string, message: string): void {
    this.logger.log({ level, message });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: string, error: any[]): void {
    this.logger.error(message, ...error);
  }
}
