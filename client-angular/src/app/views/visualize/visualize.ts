import { httpResource } from '@angular/common/http';
import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonCol, IonRange, IonRow, IonSelect, IonSelectOption } from '@ionic/angular';
import { scaleOrdinal, schemeSet3 } from 'd3';

import { ProjectTags } from '../../api/types';
import { apiURL, readStorage, writeStorage } from '../../api/utils';
import { BubbleChart } from '../../components/bubble-chart/bubble-chart';
import { BubbleData } from '../../components/bubble-chart/types';
import { ColorLegend } from '../../components/color-legend/color-legend';
import { filterByValue, maxValue, valueRangeMin, ValueRange } from './value-range';

@Component({
  selector: 'app-visualize',
  imports: [BubbleChart, ColorLegend, IonCol, IonRange, IonRow, IonSelect, IonSelectOption],
  templateUrl: './visualize.html',
  styleUrl: './visualize.scss',
})
export class Visualize {
  private readonly router = inject(Router);
  private readonly colors = scaleOrdinal(schemeSet3);

  protected readonly colorByItems = [
    { value: 'category', text: 'Category' },
    { value: 'layer', text: 'Layer' },
    { value: 'value', text: 'Value' },
  ];
  protected readonly groupByItems = [
    { value: '', text: 'None' },
    { value: 'category', text: 'Category' },
    { value: 'layer', text: 'Layer' },
  ];
  protected readonly colorBy = signal(readStorage('visualize-colorBy', 'category'));
  protected readonly groupBy = signal(readStorage('visualize-groupBy', ''));
  protected readonly rangeMin = valueRangeMin;
  private readonly projectTags = httpResource<ProjectTags>(() => apiURL('project-tags'));

  private readonly allBubbles = computed<BubbleData[]>(() => {
    const tags = this.projectTags.hasValue() ? this.projectTags.value() : [];
    return tags.map((tag) => ({
      id: tag.tagID,
      name: tag.Tag.name,
      category: tag.Tag.category,
      layer: tag.Tag.layer,
      value: tag.projectCount,
      r: 4 + tag.projectCount * 11,
      x: 0,
      y: 0,
    }));
  });
  protected readonly valueMax = computed(() => maxValue(this.allBubbles()));
  protected readonly valueRange = linkedSignal(() => ({
    lower: this.rangeMin,
    upper: this.valueMax(),
  }));
  protected readonly bubbles = computed(() => filterByValue(this.allBubbles(), this.valueRange()));
  protected readonly colorMap = computed(() => {
    const colorBy = this.colorBy();
    const values = [...new Set(this.bubbles().map((tag) => String(tag[colorBy] ?? 'null')))].sort();
    return values.reduce<Record<string, string>>((currentMap, value) => {
      currentMap[value] = this.colors(value);
      return currentMap;
    }, {});
  });
  protected readonly chartConfig = computed(() => ({
    colorByProp: this.colorBy(),
    groupByProp: this.groupBy(),
    colorMap: this.colorMap(),
  }));

  constructor() {
    effect(() => writeStorage('visualize-colorBy', this.colorBy()));
    effect(() => writeStorage('visualize-groupBy', this.groupBy()));
  }

  protected setColorBy(value: unknown) {
    if (typeof value === 'string') {
      this.colorBy.set(value);
    }
  }

  protected setGroupBy(value: unknown) {
    if (typeof value === 'string') {
      this.groupBy.set(value);
    }
  }

  protected setValueRange(value: unknown) {
    if (!isValueRange(value)) {
      return;
    }
    const current = this.valueRange();
    if (current.lower === value.lower && current.upper === value.upper) {
      return;
    }
    this.valueRange.set({ lower: value.lower, upper: value.upper });
  }

  protected bubbleClicked(data: BubbleData) {
    void this.router.navigate(['/tags', data.id]);
  }
}

const isValueRange = (value: unknown): value is ValueRange =>
  !!value &&
  typeof value === 'object' &&
  'lower' in value &&
  'upper' in value &&
  typeof value.lower === 'number' &&
  typeof value.upper === 'number';
