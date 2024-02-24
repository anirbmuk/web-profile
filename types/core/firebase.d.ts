import { type FirebaseApp, initializeApp } from 'firebase/app';

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  storageBucket: string;
  projectId: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  databaseURL?: string;
};

export type FirebaseApp = FirebaseApp;
