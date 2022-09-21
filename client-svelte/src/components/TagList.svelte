<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Chip, { Text } from '@smui/chips';
	import { push } from 'svelte-spa-router';

	import type { Tag } from '@/api/types';

	export let tags: Tag[] = [];
	export let useChips = false;
</script>

{#each tags as tag}
  {#if useChips}
	<Chip chip={tag.id} on:click={() => push(`/tags/${tag.id}`)}>
		<Text>{tag.name}</Text>
	</Chip>
	{:else}
	<Button color="primary" on:click={() => push(`/tags/${tag.id}`)} variant="outlined">
		<Label>{tag.name}</Label>
	</Button>	
	{/if}
{/each}
