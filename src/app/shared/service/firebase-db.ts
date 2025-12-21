import { Injectable } from '@angular/core';
import { Database, ref, objectVal } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class FirebaseDbService {
  constructor(private db: Database) {}

  getCuisine$(cuisine: string) {
    return objectVal(ref(this.db, `/${cuisine}`));
  }
}