import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'sala-de-juegos-cruz',
        appId: '1:555371744448:web:b2bbd38950b49cf510b125',
        storageBucket: 'sala-de-juegos-cruz.appspot.com',
        apiKey: 'AIzaSyDvdd4bGzKwqit-M-kTMW0-zLUL0weqSQo',
        authDomain: 'sala-de-juegos-cruz.firebaseapp.com',
        messagingSenderId: '555371744448',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
