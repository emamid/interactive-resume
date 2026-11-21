<script lang="ts">
	import Dialog, { Title, Content } from '@smui/dialog';

	import type { Image } from '@/api/types';

	let {
		image,
		open = $bindable(false),
		onclosed,
	}: {
		image?: Image;
		open?: boolean;
		onclosed?: () => void;
	} = $props();
</script>

<Dialog
  bind:open
  aria-labelledby="image-dialog-title"
	onSMUIDialogClosed={() => onclosed?.()}
	fullscreen
>
	{#if image && open}
		<Title style="text-align:center" id="image-dialog-title">{image.caption}</Title>
		<Content style="text-align:center">
			<img class="dialog-image" alt={image.caption} src={`/images/${image.filename}`} />
		</Content>
	{/if}
</Dialog>

<style>
	.dialog-image {
		max-height: 90%;
		max-width: 90%;
	}
</style>