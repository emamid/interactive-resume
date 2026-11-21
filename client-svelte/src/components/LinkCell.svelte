<script lang="ts">
	import { Cell } from '@smui/data-table';

	let {
		path = '',
		text = '',
	}: {
		path?: string;
		text?: string | null;
	} = $props();
</script>

<Cell><a href={path}>{text}</a></Cell>
