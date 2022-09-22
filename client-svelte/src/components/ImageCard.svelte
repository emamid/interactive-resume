<script lang="ts">
	import type { Image } from '@/api/types';

	export let image: Image;

</script>

{#if image}
	<img alt={image.filename} src={`/thumbnails/${image.filename}`} />
	<div>{image.caption}</div>
{/if}
