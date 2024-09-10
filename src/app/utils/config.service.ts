import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as YAML from 'yaml';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly CONF_DIR = '/config';
  private readonly settingsFile = 'settings.yaml';

  constructor(private http: HttpClient) {}

  /**
   * Main entry point for loading settings.
   * Loads the configuration file and parses its content.
   */
  getSettings(): Observable<any> {
    return this.loadConfigFile().pipe(
      map((rawFileContents: string) => this.parseConfig(rawFileContents)),
      catchError((error) => {
        console.error('Error loading settings:', error);
        return of(null);
      })
    );
  }

  /**
   * Loads the configuration file from the CONF_DIR.
   */
  private loadConfigFile(): Observable<string> {
    const configUrl = `${this.CONF_DIR}/${this.settingsFile}`;

    return this.http.get(configUrl, { responseType: 'text' }).pipe(
      map((content) => {
        console.info(`Config file ${this.settingsFile} loaded`);
        return content;
      }),
      catchError((error) => {
        console.error('Error fetching config file:', error);
        return of('');
      })
    );
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
