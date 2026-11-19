import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';

import { withCredentialsInterceptor } from './api/credentials';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation(), withComponentInputBinding()),
    provideHttpClient(withInterceptors([withCredentialsInterceptor])),
    provideIonicAngular({ mode: 'md' }),
  ],
};
