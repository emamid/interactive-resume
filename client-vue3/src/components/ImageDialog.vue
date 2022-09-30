<template>
	<v-dialog v-model="open" @update:model-value="updated">
		<v-sheet style="text-align:center">
			<h3>{{image?.caption}}</h3>
			<img class="dialog-image" v-if="image" :src="`/images/${image.filename}`"/>
		</v-sheet>	
	</v-dialog>
</template>

<script setup lang="ts">
	import { Image } from '@/api/types';

	const emit = defineEmits(['update:open'])

	const updated = () => {
		emit('update:open', open);
	}

	const { image, open } = defineProps<{
		image?: Image,
		open: boolean
	}>();
</script>

<style>
	.dialog-image {
		max-height: 90%;
		max-width: 90%;
	}
</style>