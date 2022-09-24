<script lang="ts">
	import type { Tag } from '@/api/types';
	import getTags from '@/api/axios/getTags';

	import TagList from '@/components/TagList.svelte';
	
	let tags: Tag[] = [];

	(async function() {
		tags = await getTags();
	}());
</script>
	
<div class="tags">
	<TagList {tags} />
</div>

<style>
	.tags {
		height: 100%;
		overflow: auto;
	}
</style>
