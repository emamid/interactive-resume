import { Component, input, output } from '@angular/core';

import { BubbleChartConfig, BubbleData } from '../bubble-chart/types';

@Component({
  selector: 'g[appBubble]',
  templateUrl: './bubble.html',
  styleUrl: './bubble.scss',
})
export class Bubble {
  readonly data = input.required<BubbleData>();
  readonly chartConfig = input.required<BubbleChartConfig>();
  readonly maxValue = input.required<number>();
  readonly bubbleClicked = output<BubbleData>();

  protected color() {
    const config = this.chartConfig();
    return config.colorMap[String(this.data()[config.colorByProp] ?? 'null')] ?? 'transparent';
  }

  protected fontSize() {
    return `${100 - Math.pow(this.maxValue() - this.data().value, 1.8)}%`;
  }

  protected click() {
    this.bubbleClicked.emit(this.data());
  }
}
