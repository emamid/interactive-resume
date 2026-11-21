<script lang="ts">
  import Card, {
    Content,
    PrimaryAction,
    Media,
  } from '@smui/card';

	import type { Image } from '@/api/types';

	let {
		image,
		onclicked,
	}: {
		image: Image;
		onclicked?: (image: Image) => void;
	} = $props();
</script>

{#if image}
<Card>
	<PrimaryAction onclick={() => onclicked?.(image)}>
		<Media style="text-align:center"><img alt={image.filename} src={`/thumbnails/${image.filename}`} /></Media>
		<Content class="mdc-typography--body2" style="text-align:center">{image.caption}</Content>
	</PrimaryAction>
</Card>
{/if}
