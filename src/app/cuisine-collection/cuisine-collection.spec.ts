import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineCollection } from './cuisine-collection';

describe('CuisineCollection', () => {
  let component: CuisineCollection;
  let fixture: ComponentFixture<CuisineCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuisineCollection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuisineCollection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
