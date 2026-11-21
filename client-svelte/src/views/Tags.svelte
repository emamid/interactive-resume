<script lang="ts">
	import type { Tag } from '@/api/types';
	import getTags from '@/api/axios/getTags';

	import TagList from '@/components/TagList.svelte';
	
	let tags = $state<Tag[]>([]);

	$effect(() => {
		let active = true;
		getTags().then((result) => {
			if (active) tags = result;
		});
		return () => {
			active = false;
		};
	});
</script>
	
<div class="tags">
	<TagList {tags} />
</div>

<style>
	.tags {
		height: 100%;
	}
</style>
