import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfigService } from './utils/config.service';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

export function loadConfig(configService: ConfigService) {
  return () => configService.loadSettings();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true
    }
  ]
};
