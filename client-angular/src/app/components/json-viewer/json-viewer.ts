import { Component, computed, input, output } from '@angular/core';

interface JsonLine {
  id: string;
  text: string;
}

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.html',
  styleUrl: './json-viewer.scss',
})
export class JsonViewer {
  readonly data = input<unknown>();
  readonly allowsId = input(false);
  readonly itemClicked = output<string>();

  protected readonly lines = computed<JsonLine[]>(() => {
    const data = this.data();
    if (!Array.isArray(data) || !this.allowsId()) {
      return [];
    }
    return data.map((line, index) => ({
      id: line && typeof line === 'object' && 'id' in line ? String(line.id) : '',
      text: JSON.stringify(line, null, '  ') + (index === data.length - 1 ? '' : ','),
    }));
  });

  protected readonly formatted = computed(() => JSON.stringify(this.data(), null, '  '));
  protected readonly clickable = computed(() => Array.isArray(this.data()) && this.allowsId());
}
