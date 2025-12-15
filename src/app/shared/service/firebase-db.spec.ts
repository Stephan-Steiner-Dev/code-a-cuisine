import { TestBed } from '@angular/core/testing';

import { FirebaseDb } from './firebase-db';

describe('FirebaseDb', () => {
  let service: FirebaseDb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseDb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
