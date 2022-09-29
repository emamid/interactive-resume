<template>
	<v-card @click="clicked">
		<v-img max-height="94px" :src="`/thumbnails/${image.filename}`"/>
		<v-card-text>{{image.caption}}</v-card-text>
	</v-card>				
</template>

<script setup lang="ts">
	import { Image } from '@/api/types';

	const emit = defineEmits(['clicked'])
	const clicked = () => {
		emit('clicked', image)
	}

	const { image } = defineProps<{
		image: Image
	}>();
</script>
