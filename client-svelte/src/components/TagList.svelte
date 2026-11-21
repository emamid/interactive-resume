<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Chip, { Text } from '@smui/chips';
	import { push } from 'svelte-spa-router';

	import type { BaseTag } from '@/api/types';

	let {
		tags = [],
		chips = false,
	}: {
		tags?: BaseTag[];
		chips?: boolean;
	} = $props();
</script>

{#each tags as tag (tag.id)}
  {#if chips}
	<Chip chip={tag.id} onclick={() => push(`/tags/${tag.id}`)}>
		<Text>{tag.name}</Text>
	</Chip>
	{:else}
	<Button color="primary" onclick={() => push(`/tags/${tag.id}`)} variant="outlined">
		<Label>{tag.name}</Label>
	</Button>	
	{/if}
{/each}
