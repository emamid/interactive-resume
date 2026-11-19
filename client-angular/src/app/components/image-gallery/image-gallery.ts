import { Component, input, output } from '@angular/core';
import { IonCol, IonGrid, IonRow } from '@ionic/angular';

import { Image } from '../../api/types';
import { ImageCard } from '../image-card/image-card';

@Component({
  selector: 'app-image-gallery',
  imports: [ImageCard, IonCol, IonGrid, IonRow],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.scss',
})
export class ImageGallery {
  readonly images = input<Image[]>([]);
  readonly clicked = output<Image>();
}
