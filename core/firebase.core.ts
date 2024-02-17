import { type FirebaseApp, initializeApp } from 'firebase/app';
import {
  Firestore,
  type OrderByDirection,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  type WhereFilterOp,
  collection,
  endAt,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore';
import type { FirebaseConfig } from './firebase';

export interface FirestoreWhere {
  column: string;
  operator: WhereFilterOp;
  condition: unknown;
}

export interface FirestoreOrderBy {
  attr: string;
  dir: OrderByDirection;
}

export interface FirestoreQuery {
  collections: [string];
  keys: string[];
  whereClause?: FirestoreWhere[];
  orderByClause?: FirestoreOrderBy[];
  limit?: number;
  startAt?: string | number | Date | undefined;
  endAt?: string | number | Date | undefined;
}

let offlineData: any | undefined;
let firebaseApp: FirebaseApp | undefined;

export function initFirebaseApp (firebaseConfig: FirebaseConfig) {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
  }
  return firebaseApp;
}

export async function fetchOfflineCollection<T> (path: string) {
  if (!offlineData) {
    offlineData = (await import('./../constants/offline')).default;
  }
  const [collection, locale] = path.split('_');
  return new Promise<T[]>((resolve) => {
    resolve(
      ((locale ? offlineData?.[collection]?.[locale] : offlineData?.[collection]) ||
        []) as T[],
    );
  });
}

export async function fetchCollection<T> (
  query: Partial<FirestoreQuery>,
): Promise<T[]> {
  const { collections, whereClause, orderByClause, limit, startAt, endAt } = query;
  if (!firebaseApp) {
    throw new Error('Firebase config is not defined');
  }
  const fetchData = await _getCollectionDataFromFireStore(
    firebaseApp,
    collections,
    whereClause,
    orderByClause,
    limit,
    startAt,
    endAt,
  );
  const data: T[] = [];
  fetchData.forEach(each => data.push(each.data() as T));
  return data;
}

function _getCollectionDataFromFireStore (
  app: FirebaseApp,
  collections: [string] | undefined,
  whereClause?: FirestoreWhere[],
  orderByClause?: FirestoreOrderBy[],
  limitValue?: number,
  startAtValue?: string | number | Date | undefined,
  endAtValue?: string | number | Date | undefined,
) {
  const db = _getFirestoreDb(app);
  if (!collections || !collections?.[0]) {
    return Promise.reject(new Error('Collection cannot be empty'));
  }
  if (collections.length === 1) {
    const collectionRootRef = collection(db, collections?.[0]);
    let collectionRootQuery = query(collectionRootRef);
    if (whereClause) {
      const clauses: QueryFieldFilterConstraint[] = [];
      whereClause.forEach((clause: FirestoreWhere) =>
        clauses.push(where(clause.column, clause.operator, clause.condition)),
      );
      collectionRootQuery = query(collectionRootRef, ...clauses);
    }
    if (orderByClause) {
      const clauses: QueryOrderByConstraint[] = [];
      orderByClause.forEach((clause: FirestoreOrderBy) =>
        clauses.push(orderBy(clause.attr, clause.dir)),
      );
      collectionRootQuery = query(collectionRootQuery, ...clauses);
    }
    if (!!limitValue && limitValue !== 0) {
      collectionRootQuery = collectionRootQuery = query(
        collectionRootQuery,
        limit(limitValue),
      );
    }
    if (startAtValue) {
      collectionRootQuery = query(collectionRootQuery, startAt(startAtValue));
    }
    if (endAtValue) {
      collectionRootQuery = query(collectionRootQuery, endAt(endAtValue));
    }
    return getDocs(collectionRootQuery);
  }
  return Promise.reject(new Error('Incorrect data set for firestore query'));
}

function _getFirestoreDb (app: FirebaseApp): Firestore {
  return getFirestore(app);
}
