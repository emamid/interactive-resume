import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'td[appLinkCell]',
  imports: [RouterLink],
  templateUrl: './link-cell.html',
  styleUrl: './link-cell.scss',
})
export class LinkCell {
  readonly path = input.required<string>();
  readonly text = input.required<string>();
}
