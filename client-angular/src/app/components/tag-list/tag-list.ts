import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonChip } from '@ionic/angular';

import { BaseTag } from '../../api/types';

@Component({
  selector: 'app-tag-list',
  imports: [IonButton, IonChip],
  templateUrl: './tag-list.html',
  styleUrl: './tag-list.scss',
})
export class TagList {
  private readonly router = inject(Router);

  readonly chips = input(false);
  readonly tags = input<BaseTag[]>([]);

  protected goToTag(id: string) {
    void this.router.navigate(['/tags', id]);
  }
}
