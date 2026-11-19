import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';

import { Project } from '../../api/types';
import { apiURL } from '../../api/utils';
import { LinkCell } from '../../components/link-cell/link-cell';
import { YearRange } from '../../components/year-range/year-range';

@Component({
  selector: 'app-projects',
  imports: [LinkCell, YearRange],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly projects = httpResource<Project[]>(() => apiURL('projects'));
}
