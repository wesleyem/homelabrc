/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import * as YAML from 'yaml';

interface Config {
  layout?: Record<string, any>;
  [key: string]: any;
}

export class ConfigService {
  private readonly yamlFiles = ['settings.yaml', 'settings.yml']
  private settings!: Config;

  constructor(private readonly configDir = '/config') {
    this.init();
  }

  public init(): ConfigService {
    this.settings = this.loadSettings();
    return this;
  }

  /**
   * Returns the configuration settings.
   */
   public getSettings(): Config {
    return this.settings;
   }

  /**
   * Loads the configuration settings and stores them for access.
   */
  private loadSettings(): Config {
    for (const yamlFile of this.yamlFiles) {
      const settingsYaml = join(this.configDir, yamlFile);
      if (existsSync(settingsYaml)) {
        return this.parseConfig(settingsYaml);
      }
    }
    throw new Error('No configuration file found (settings.yaml or settings.yml)');
  }


  /**
   * Parses the configuration file content (YAML format).
   * Handles layout conversion if needed.
   */
  private parseConfig(settingsYaml: string): Config {
    try {
      const content = readFileSync(settingsYaml, 'utf-8');
      return YAML.parse(content) || {};
    } catch (error) {
      console.error(`Error parsing ${settingsYaml}:`, error);
      return {};
    }
  }


  /**
   * Converts the layout structure if present.
   */
  private handleLayout(config: Config): Config {
    if (Array.isArray(config.layout)) {
      config.layout = config.layout.reduce((acc, item) => {
        const name = Object.keys(item)[0];
        acc[name] = item[name];
        return acc;
      }, {});
    }
    return config;
  }

}
