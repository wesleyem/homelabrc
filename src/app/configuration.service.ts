import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from './models/settings';
import { firstValueFrom } from 'rxjs';

export function loadConfigFactory(configService: ConfigurationService) {
  return () => configService.loadSettings();
}

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private readonly settingsFileName = 'settings.json';
  public settings!: Settings;
  private readonly configDir = 'config';

  constructor(private _http: HttpClient) {}

  async loadSettings() {
    const settingsUri = `./${this.configDir}/${this.settingsFileName}`;
    this.settings = await firstValueFrom(this._http.get<Settings>(settingsUri));
  }
}
