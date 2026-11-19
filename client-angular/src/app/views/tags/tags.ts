import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';

import { Tag } from '../../api/types';
import { apiURL } from '../../api/utils';
import { TagList } from '../../components/tag-list/tag-list';

@Component({
  selector: 'app-tags',
  imports: [TagList],
  templateUrl: './tags.html',
  styleUrl: './tags.scss',
})
export class Tags {
  protected readonly tags = httpResource<Tag[]>(() => apiURL('tags'));
}
