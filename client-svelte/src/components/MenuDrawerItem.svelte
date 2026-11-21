<script lang="ts">
	import { Item, Text, Graphic } from '@smui/list';

	let {
		href = '',
		imageSrc = '',
		icon = '',
		text = '',
		onnavigated,
	}: {
		href?: string;
		imageSrc?: string;
		icon?: string;
		text?: string;
		onnavigated?: () => void;
	} = $props();
</script>

<Item
  {href}
	onclick={() => onnavigated?.()}
>
	<Graphic class="material-icons">
		{#if imageSrc}
		<img alt="Logo" src={imageSrc} />
		{/if}
		{icon}
	</Graphic>
	<Text>{text}</Text>
</Item>
