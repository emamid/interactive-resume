interface MinimumBubbleData {
	id: string,
	name: string,
	value: number,
	r: number,
	x: number,
	y: number,
}

type AnyBubbleData = Record<string, any>;

export interface BubbleData extends AnyBubbleData, MinimumBubbleData {};
export interface Extents {
	minX?: number;
	minY?: number;
	maxX?: number;
	maxY?: number;
}

export interface BubbleGroupData extends Extents {
	data: any[];
	column: number;
	row: number;
	centerX?: number;
	centerY?: number;
	title: string;
}

export interface BubbleChartConfig {
	colorByProp: string;
	groupByProp: string;
	colorMap: Record<string, string>;
}
