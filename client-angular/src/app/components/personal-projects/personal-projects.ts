import { Component, input } from '@angular/core';

import { BaseProject } from '../../api/types';
import { LinkCell } from '../link-cell/link-cell';
import { YearRange } from '../year-range/year-range';

@Component({
  selector: 'app-personal-projects',
  imports: [LinkCell, YearRange],
  templateUrl: './personal-projects.html',
  styleUrl: './personal-projects.scss',
})
export class PersonalProjects {
  readonly projects = input<BaseProject[]>();
}
