import {
  mergeApplicationConfig,
  ApplicationConfig,
  APP_INITIALIZER,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {
  ConfigurationService,
  loadConfigFactory,
} from './configuration.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigFactory,
      deps: [ConfigurationService],
      multi: true,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
