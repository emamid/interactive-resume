import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';

import { Employer as EmployerRecord } from '../../api/types';
import { apiURL } from '../../api/utils';
import { ReferenceList } from '../../components/reference-list/reference-list';
import { YearRange } from '../../components/year-range/year-range';

@Component({
  selector: 'app-employer',
  imports: [ReferenceList, YearRange],
  templateUrl: './employer.html',
  styleUrl: './employer.scss',
})
export class Employer {
  readonly id = input<string>();

  protected readonly employer = httpResource<EmployerRecord>(() => {
    const id = this.id();
    return id ? apiURL(`employers/${id}`) : undefined;
  });
}
