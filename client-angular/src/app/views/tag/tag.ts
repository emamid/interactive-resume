import { httpResource } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/angular';

import { Tag as TagRecord } from '../../api/types';
import { apiURL } from '../../api/utils';

@Component({
  selector: 'app-tag',
  imports: [IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow],
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
})
export class Tag {
  private readonly router = inject(Router);

  readonly id = input<string>();

  protected readonly tag = httpResource<TagRecord>(() => {
    const id = this.id();
    return id ? apiURL(`tags/${id}`) : undefined;
  });

  protected goToProject(id: string) {
    void this.router.navigate(['/projects', id]);
  }
}
