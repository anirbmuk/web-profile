import { initializeApp } from 'firebase/app';
import type {
  FirebaseApp,
  FirebaseConfig,
} from './../types';
import { fetchCollection } from './firebase.core';

export class FirebaseController {
  private static instance: FirebaseController | undefined;
  private app: FirebaseApp | undefined;

  private constructor(cfg: FirebaseConfig) {
    this.app = initializeApp(cfg);
  }

  static getInstance(cfg: FirebaseConfig) {
    if (!FirebaseController.instance) {
      FirebaseController.instance = new FirebaseController(cfg);
    }
    return FirebaseController.instance;
  }

  async fetch<T>(path: string, limit?: number | undefined) {
    try {
      return await fetchCollection<T>(this.app!, {
        collections: [path],
        whereClause: [{
          column: 'visibility',
          operator: '==',
          condition: 'public',
        }],
        ...((limit ?? -1) > 0 && {
          limit,
        }),
      });
    } catch {
      return [] as T[];
    }
  }
}
