import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ResumeApi } from './resume-api';

describe('ResumeApi', () => {
  let service: ResumeApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    });
    service = TestBed.inject(ResumeApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
