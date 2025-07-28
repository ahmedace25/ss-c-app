import { ApplicationConfig, importProvidersFrom, isDevMode, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { BookmarkEffects } from './sections/state/bookmark/bookmark.effects';
import { bookmarkReducer } from './sections/state/bookmark/bookmark.reducer';
import { provideHttpClient } from '@angular/common/http';
import { MemoryData } from './sections/@core/services/memory-data/memory-data';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({bookmarks: bookmarkReducer}),
    provideEffects([BookmarkEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(InMemoryWebApiModule.forRoot(MemoryData, { delay: 1000 })),
  ]
};
