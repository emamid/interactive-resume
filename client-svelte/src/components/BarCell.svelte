<script lang="ts">
	import type { ColumnConfig } from '@emamid/svelte-data-table'

	interface Props {
		column: ColumnConfig;
		item: any;
		value: number;
		maxValue?: number;
		backgroundClass?: string;
		barClass?: string;
		[key: string]: any;
	};

	let {
		column,
		item,
		value,
		maxValue = 100,
		backgroundClass = 'bg-green-900 w-24 h-4 margin-8',
		barClass = 'bg-green-400 h-full',
	}: Props = $props();

	let percent = $derived(maxValue ? Math.max(Math.min(value/maxValue, 1), 0) * 100 : 100);

	let domNode: Element;
	let parentHeight: number = 1;

</script>

<div class={backgroundClass} bind:this={domNode}>
	<div class={barClass} style:width='{percent}%'></div>
</div>
