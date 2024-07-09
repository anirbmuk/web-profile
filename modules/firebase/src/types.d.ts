import { type FirebaseApp } from 'firebase/app';
import type {
  OrderByDirection,
  WhereFilterOp,
} from 'firebase/firestore';

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

export type ModuleOptions = FirebaseConfig & {
  apiBasePath: string;
  apiPaths: string[];
};

export type FirebaseApp = FirebaseApp;

export type FirestoreWhere = {
  column: string;
  operator: WhereFilterOp;
  condition: unknown;
};

export type FirestoreOrderBy = {
  attr: string;
  dir: OrderByDirection;
};

export type FirestoreQuery = {
  collections: [string];
  keys: string[];
  whereClause?: FirestoreWhere[];
  orderByClause?: FirestoreOrderBy[];
  limit?: number;
  startAt?: string | number | Date | undefined;
  endAt?: string | number | Date | undefined;
};

export type SupportedParams = 'lang' | 'limit';

export type SupportedQueryParams = Record<SupportedParams, string>;
