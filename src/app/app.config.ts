import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: "pag-parvuart", 
      appId: "1:418329811996:web:211cc357754629079553d9", 
      storageBucket: "pag-parvuart.firebasestorage.app", 
      apiKey: "AIzaSyBs1GrZ00Fi-UxXTmoM-jW9oEffYxMBSNI", 
      authDomain: "pag-parvuart.firebaseapp.com", 
      messagingSenderId: "418329811996" })), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()),
  ]
};
