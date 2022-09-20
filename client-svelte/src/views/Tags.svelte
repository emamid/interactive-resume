<script lang="ts">
	import Chip, { Text } from '@smui/chips';

	import type { Tag } from '@/api/types';
	import getTags from '@/api/axios/getTags';
	
	let tags: Tag[] = [];
	
	(async function() {
		tags = await getTags();
	}());
</script>
	
<div class="tags">
	{#each tags as tag}
		<Chip chip={tag.id}><Text>{tag.name}</Text></Chip>
	{/each}
</div>

<style>
	.tags {
		height: '100%';
		overflow: 'auto';
	}
</style>
