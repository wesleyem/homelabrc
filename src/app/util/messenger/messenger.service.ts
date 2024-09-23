/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { API_ENDPOINTS } from '../../constants/constants';
import { Communicator, LogEntry } from '../communicator';

@Injectable({
  providedIn: 'root',
})
export class MessengerService implements Communicator {
  constructor(private http: HttpClient) {}

  log(entry: LogEntry): void {
    // this.http.post(API_ENDPOINTS.LOG, entry).subscribe();
    console.log(entry);
  }

  info(message: string): void {
    this.log({ level: 'info', message });
  }

  debug(message: string): void {
    this.log({ level: 'debug', message });
  }

  warn(message: string): void {
    this.log({ level: 'warn', message });
  }

  error(message: string, error: any[]): void {
    this.log({ level: 'error', message, error });
  }
}
