<script lang="ts">
	import type { Tag } from '@/api/types';
	import getTag from '@/api/axios/getTag';
	import type { IDParams } from '@/types';
	
	export let params: IDParams;

	let tag: Tag;
	
	(async function() {
		tag = await getTag(params?.id);
	}());
</script>
	
<div class="tag">
	Tag view, in progress
	<div>{JSON.stringify(tag)}</div>
</div>

<style>
	.tag {
		height: '100%';
		overflow: 'auto';
	}
</style>
