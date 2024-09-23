/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MessengerService } from './util/messenger/messenger.service';

export function loadConfiguration(configService: ConfigurationService) {
  return () => configService.loadConfiguration();
}

export interface Config {
  layout?: Record<string, any>;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private readonly yamlFile = 'settings.yaml';
  private _configuration: any;
  private readonly configDir = 'config';

  constructor(
    private _http: HttpClient,
    private _messengerService: MessengerService,
  ) {}

  public getSettings(): Config {
    return this._configuration;
  }

  public loadConfiguration() {
    const settingsYaml = `./${this.configDir}/${this.yamlFile}`;
    return this._http.get(settingsYaml, { responseType: 'text' }).pipe(
      map((fileContents: string) => {
        this._configuration = fileContents;
        this._messengerService.log(this._configuration);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 404) {
          console.error(`${this.yamlFile}: `, error.message);
        }
        return of(null);
      }),
    );
  }
}
