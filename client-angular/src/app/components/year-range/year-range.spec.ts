import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearRange } from './year-range';

describe('YearRange', () => {
  let component: YearRange;
  let fixture: ComponentFixture<YearRange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearRange],
    }).compileComponents();

    fixture = TestBed.createComponent(YearRange);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
