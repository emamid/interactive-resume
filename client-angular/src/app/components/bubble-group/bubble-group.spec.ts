import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleGroup } from './bubble-group';

describe('BubbleGroup', () => {
  let component: BubbleGroup;
  let fixture: ComponentFixture<BubbleGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(BubbleGroup);
    fixture.componentRef.setInput('data', {
      data: [],
      column: 0,
      row: 0,
      centerX: 0,
      centerY: 0,
      title: 'All',
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
    });
    fixture.componentRef.setInput('chartConfig', {
      colorByProp: 'category',
      groupByProp: '',
      colorMap: {},
    });
    fixture.componentRef.setInput('maxValue', 1);
    fixture.componentRef.setInput('tileWidth', 100);
    fixture.componentRef.setInput('tileHeight', 100);
    fixture.componentRef.setInput('tileScale', 1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
