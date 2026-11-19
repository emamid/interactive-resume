import {
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { packSiblings } from 'd3';

import { BubbleGroup } from '../bubble-group/bubble-group';
import { BubbleChartConfig, BubbleData, BubbleGroupData } from './types';

interface Layout {
  tileColumns: number;
  tileRows: number;
  tileWidth: number;
  tileHeight: number;
  tileScale: number;
  groups: BubbleGroupData[];
}

@Component({
  selector: 'app-bubble-chart',
  imports: [BubbleGroup],
  templateUrl: './bubble-chart.html',
  styleUrl: './bubble-chart.scss',
})
export class BubbleChart {
  readonly chartConfig = input.required<BubbleChartConfig>();
  readonly data = input<BubbleData[]>([]);
  readonly bubbleClicked = output<BubbleData>();

  private readonly container = viewChild<ElementRef<HTMLDivElement>>('container');
  private readonly size = signal({ width: 128, height: 128 });

  protected readonly maxValue = computed(
    () => Math.max(...this.data().map((item) => item.value), 1),
  );

  protected readonly layout = computed<Layout>(() => {
    const config = this.chartConfig();
    const width = this.size().width;
    const height = this.size().height;
    const groupValues = config.groupByProp
      ? [...new Set(this.data().map((item) => String(item[config.groupByProp] ?? 'null')))].sort()
      : ['All'];
    const grouped = new Map<string, BubbleData[]>();
    if (config.groupByProp) {
      for (const item of this.data()) {
        const key = String(item[config.groupByProp] ?? 'null');
        grouped.set(key, [...(grouped.get(key) ?? []), { ...item }]);
      }
    } else {
      grouped.set(
        'All',
        this.data().map((item) => ({ ...item })),
      );
    }

    const tileColumns = Math.max(Math.ceil(Math.sqrt(groupValues.length)), 1);
    const tileRows = Math.max(Math.floor(Math.sqrt(groupValues.length)), 1);
    const tileWidth = width / tileColumns;
    const tileHeight = height / tileRows;
    const packed = groupValues.map((groupValue, groupIndex) => {
      const group = grouped.get(groupValue) ?? [];
      packSiblings(group);
      const extents = group.reduce(
        (current, item) => ({
          minX: Math.min(current.minX, item.x - item.r),
          minY: Math.min(current.minY, item.y - item.r),
          maxX: Math.max(current.maxX, item.x + item.r),
          maxY: Math.max(current.maxY, item.y + item.r),
        }),
        { minX: 0, minY: 0, maxX: 0, maxY: 0 },
      );
      return { groupValue, group, extents, groupIndex };
    });
    const maxExtents = packed.reduce(
      (current, group) => ({
        minX: Math.min(current.minX, group.extents.minX),
        minY: Math.min(current.minY, group.extents.minY),
        maxX: Math.max(current.maxX, group.extents.maxX),
        maxY: Math.max(current.maxY, group.extents.maxY),
      }),
      { minX: 0, minY: 0, maxX: 0, maxY: 0 },
    );
    const maxGroupWidth = maxExtents.maxX - maxExtents.minX;
    const maxGroupHeight = maxExtents.maxY - maxExtents.minY;
    const tileScale =
      maxGroupWidth && maxGroupHeight
        ? Math.min(tileWidth / maxGroupWidth, tileHeight / maxGroupHeight)
        : 1;

    return {
      tileColumns,
      tileRows,
      tileWidth,
      tileHeight,
      tileScale,
      groups: packed.map(({ groupValue, group, extents, groupIndex }) => ({
        ...extents,
        centerX: tileWidth / 2 - (extents.maxX + extents.minX) / 2,
        centerY: tileHeight / 2 - (extents.maxY + extents.minY) / 2,
        column: groupIndex % tileColumns,
        data: group,
        row: Math.floor(groupIndex / tileColumns),
        title: groupValue,
      })),
    };
  });

  protected readonly columnLines = computed(() =>
    Array.from({ length: Math.max(this.layout().tileColumns - 1, 0) }, (_, index) => index + 1),
  );
  protected readonly rowLines = computed(() =>
    Array.from({ length: Math.max(this.layout().tileRows - 1, 0) }, (_, index) => index + 1),
  );

  constructor() {
    afterRenderEffect((onCleanup) => {
      const element = this.container()?.nativeElement;
      if (!element) {
        return;
      }
      const updateSize = () => {
        this.size.set({
          width: element.clientWidth || 128,
          height: element.clientHeight || 128,
        });
      };
      updateSize();
      const observer = new ResizeObserver(updateSize);
      observer.observe(element);
      onCleanup(() => observer.disconnect());
    });
  }
}
