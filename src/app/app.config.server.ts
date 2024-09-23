import {
  mergeApplicationConfig,
  ApplicationConfig,
  APP_INITIALIZER,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {
  ConfigurationService,
  loadConfiguration,
} from './configuration.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [ConfigurationService],
      multi: true,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
