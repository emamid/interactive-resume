import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestApi } from './rest-api';

describe('RestApi', () => {
  let component: RestApi;
  let fixture: ComponentFixture<RestApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestApi],
    }).compileComponents();

    fixture = TestBed.createComponent(RestApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
