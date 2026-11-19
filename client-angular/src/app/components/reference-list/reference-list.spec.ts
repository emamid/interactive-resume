import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceList } from './reference-list';

describe('ReferenceList', () => {
  let component: ReferenceList;
  let fixture: ComponentFixture<ReferenceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceList],
    }).compileComponents();

    fixture = TestBed.createComponent(ReferenceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
