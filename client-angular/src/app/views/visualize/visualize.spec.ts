import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Visualize } from './visualize';

describe('Visualize', () => {
  let component: Visualize;
  let fixture: ComponentFixture<Visualize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Visualize],
    }).compileComponents();

    fixture = TestBed.createComponent(Visualize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
