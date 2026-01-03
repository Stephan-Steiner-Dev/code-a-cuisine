import { Injectable } from '@angular/core';
import { Database, objectVal } from '@angular/fire/database';
import { ref, query, orderByChild, limitToLast } from 'firebase/database';
import { listVal } from 'rxfire/database';
import { combineLatest, map } from 'rxjs';

export interface RecipeLite {
  id: string;        // <- Firebase Key
  title?: string;
  likes?: number;
  cuisine: string;
}

@Injectable({ providedIn: 'root' })
export class FirebaseDbService {
  constructor(private db: Database) {}

  getCuisine$(cuisine: string) {
    return objectVal(ref(this.db, `/${cuisine}`));
  }
}