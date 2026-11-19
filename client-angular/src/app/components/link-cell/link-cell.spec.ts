import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LinkCell } from './link-cell';

describe('LinkCell', () => {
  let component: LinkCell;
  let fixture: ComponentFixture<LinkCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkCell],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkCell);
    fixture.componentRef.setInput('path', '/projects/1');
    fixture.componentRef.setInput('text', 'Project');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
