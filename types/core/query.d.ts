import type { OrderByDirection, WhereFilterOp } from 'firebase/firestore';

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
