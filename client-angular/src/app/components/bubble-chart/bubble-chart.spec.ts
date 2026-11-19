import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleChart } from './bubble-chart';

describe('BubbleChart', () => {
  let component: BubbleChart;
  let fixture: ComponentFixture<BubbleChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleChart],
    }).compileComponents();

    fixture = TestBed.createComponent(BubbleChart);
    fixture.componentRef.setInput('chartConfig', {
      colorByProp: 'category',
      groupByProp: '',
      colorMap: {},
    });
    fixture.componentRef.setInput('data', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
