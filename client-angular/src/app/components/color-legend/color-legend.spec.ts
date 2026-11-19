import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorLegend } from './color-legend';

describe('ColorLegend', () => {
  let component: ColorLegend;
  let fixture: ComponentFixture<ColorLegend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorLegend],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorLegend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
