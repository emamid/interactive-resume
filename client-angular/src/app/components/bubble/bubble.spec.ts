import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bubble } from './bubble';

describe('Bubble', () => {
  let component: Bubble;
  let fixture: ComponentFixture<Bubble>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bubble],
    }).compileComponents();

    fixture = TestBed.createComponent(Bubble);
    fixture.componentRef.setInput('data', {
      id: '1',
      name: 'Tag',
      value: 1,
      r: 10,
      x: 0,
      y: 0,
    });
    fixture.componentRef.setInput('chartConfig', {
      colorByProp: 'name',
      groupByProp: '',
      colorMap: { Tag: '#dd0031' },
    });
    fixture.componentRef.setInput('maxValue', 1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
