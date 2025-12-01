import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishTitle } from './dish-title';

describe('DishTitle', () => {
  let component: DishTitle;
  let fixture: ComponentFixture<DishTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
