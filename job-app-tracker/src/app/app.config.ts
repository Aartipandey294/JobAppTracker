import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { JobAppListComponent } from './features/job-applications/job-app-list.component';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(),
    provideRouter([
      { path: '', component: JobAppListComponent },
      { path: '**', redirectTo: '' }
    ])
    ]
};
