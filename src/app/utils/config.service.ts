import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as YAML from 'yaml';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly CONF_DIR = '/config';
  private readonly settingsFile = 'settings.yaml';
  private settings: any = null;

  constructor(private http: HttpClient) {}

  /**
   * Loads the configuration settings and stores them for synchronous access.
   * This should be called during app initialization using APP_INITIALIZER.
   */
  loadSettings(): Observable<any> {
    const configUrl = `${this.CONF_DIR}/${this.settingsFile}`;

    return this.http
      .get(configUrl, { responseType: 'text' })
      .pipe(
        map((rawFileContents: string) => {
          this.settings = this.parseConfig(rawFileContents)
        }),
        catchError((error) => {
          console.error('Error loading settings:', error);
          return of(null);
        })
      );
  }

  /**
   * Returns the configuration settings synchronously.
   */
  getSettings(): any {
    if (!this.settings) {
      throw new Error('Settings not loaded yet!');
    }
    return this.settings;
  }

  /**
   * Parses the configuration file content (YAML format).
   * Handles legacy layout conversion if needed.
   */
  private parseConfig(fileContent: string): any {
    try {
      const config = YAML.parse(fileContent) || {};
      return this.handleLegacyLayout(config);
    } catch (error) {
      console.error('Error parsing YAML:', error);
      return null;
    }
  }

  /**
   * Converts the layout structure if present.
   */
  private handleLegacyLayout(config: any): any {
    if (Array.isArray(config.layout)) {
      const layoutItems = config.layout;
      config.layout = {};
      layoutItems.forEach((item: any) => {
        const name = Object.keys(item)[0];
        config.layout[name] = item[name];
      });
    }
    return config;
  }
}
