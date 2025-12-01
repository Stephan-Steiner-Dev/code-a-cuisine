import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Directions } from './directions';

describe('Directions', () => {
  let component: Directions;
  let fixture: ComponentFixture<Directions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Directions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Directions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
