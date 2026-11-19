import { Component, input, model } from '@angular/core';
import { IonModal } from '@ionic/angular';

import { Image } from '../../api/types';

@Component({
  selector: 'app-image-dialog',
  imports: [IonModal],
  templateUrl: './image-dialog.html',
  styleUrl: './image-dialog.scss',
})
export class ImageDialog {
  readonly image = input<Image>();
  readonly open = model(false);
}
