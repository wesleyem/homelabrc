import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from './models/settings';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';

export function loadConfigFactory(configService: ConfigurationService) {
  return () => {
    log('loadConfigFactory - started');
    return configService.loadSettings().then(() => {
      log('loadConfigFactory - completed');
    });
  };
}

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private readonly settingsFileName = 'settings.json';
  private _settings: Settings = {};
  private readonly configDir = 'config';

  constructor(private _http: HttpClient) {}

  public getSettings(): Settings {
    return this._settings;
  }

  async loadSettings() {
    const settingsUri = `./${this.configDir}/${this.settingsFileName}`;
    this._settings = await firstValueFrom(
      this._http.get<Settings>(settingsUri),
    );
  }
}
