import { httpResource } from '@angular/common/http';
import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Image, Project as ProjectRecord } from '../../api/types';
import { apiURL } from '../../api/utils';
import { ImageDialog } from '../../components/image-dialog/image-dialog';
import { ImageGallery } from '../../components/image-gallery/image-gallery';
import { TagList } from '../../components/tag-list/tag-list';
import { YearRange } from '../../components/year-range/year-range';

@Component({
  selector: 'app-project',
  imports: [ImageDialog, ImageGallery, RouterLink, TagList, YearRange],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project {
  readonly id = input<string>();

  protected readonly project = httpResource<ProjectRecord>(() => {
    const id = this.id();
    return id ? apiURL(`projects/${id}`) : undefined;
  });
  protected readonly dialogImage = signal<Image | undefined>(undefined);
  protected readonly imageDialogOpen = signal(false);
  protected readonly sortedTags = computed(() => {
    const tags = this.project.hasValue() ? this.project.value().Tags : [];
    return [...(tags ?? [])].sort((tag1, tag2) => tag1.name.localeCompare(tag2.name));
  });

  protected imageClicked(image: Image) {
    this.dialogImage.set(image);
    this.imageDialogOpen.set(true);
  }
}
