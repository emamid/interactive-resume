import { Component, input, output } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular';

import { Image } from '../../api/types';

@Component({
  selector: 'app-image-card',
  imports: [IonCard, IonCardContent],
  templateUrl: './image-card.html',
  styleUrl: './image-card.scss',
})
export class ImageCard {
  readonly image = input.required<Image>();
  readonly clicked = output<Image>();
}
