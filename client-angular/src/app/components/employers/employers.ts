import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';

import { Employer } from '../../api/types';
import { apiURL } from '../../api/utils';
import { LinkCell } from '../link-cell/link-cell';
import { YearRange } from '../year-range/year-range';

@Component({
  selector: 'app-employers',
  imports: [LinkCell, YearRange],
  templateUrl: './employers.html',
  styleUrl: './employers.scss',
})
export class Employers {
  protected readonly employers = httpResource<Employer[]>(() => apiURL('employers'));
}
