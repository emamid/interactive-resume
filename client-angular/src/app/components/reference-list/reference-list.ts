import { Component, input } from '@angular/core';

import { Reference } from '../../api/types';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.html',
  styleUrl: './reference-list.scss',
})
export class ReferenceList {
  readonly references = input<Reference[]>();
}
