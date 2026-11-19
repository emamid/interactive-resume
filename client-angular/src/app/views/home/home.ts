import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';

import { Myself } from '../../api/types';
import { apiURL } from '../../api/utils';
import { Employers } from '../../components/employers/employers';
import { PersonalProjects } from '../../components/personal-projects/personal-projects';

@Component({
  selector: 'app-home',
  imports: [Employers, PersonalProjects],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly myself = httpResource<Myself>(() => apiURL('myself'));
}
