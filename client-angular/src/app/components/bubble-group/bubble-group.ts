import { Component, input, output } from '@angular/core';

import { Bubble } from '../bubble/bubble';
import { BubbleChartConfig, BubbleData, BubbleGroupData } from '../bubble-chart/types';

@Component({
  selector: 'g[appBubbleGroup]',
  imports: [Bubble],
  templateUrl: './bubble-group.html',
  styleUrl: './bubble-group.scss',
})
export class BubbleGroup {
  readonly data = input.required<BubbleGroupData>();
  readonly chartConfig = input.required<BubbleChartConfig>();
  readonly maxValue = input.required<number>();
  readonly tileWidth = input.required<number>();
  readonly tileHeight = input.required<number>();
  readonly tileScale = input.required<number>();
  readonly bubbleClicked = output<BubbleData>();
}
