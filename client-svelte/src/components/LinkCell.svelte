<script lang="ts">
	import { Cell } from '@smui/data-table';

	export let path = '';
	export let text = '';
</script>

<Cell><a href={path}>{text}</a></Cell>
