import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-color-legend',
  templateUrl: './color-legend.html',
  styleUrl: './color-legend.scss',
})
export class ColorLegend {
  readonly colorMap = input<Record<string, string>>({});

  protected readonly entries = computed(() => Object.entries(this.colorMap()));
}
