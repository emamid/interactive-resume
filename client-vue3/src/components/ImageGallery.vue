<template>
	<v-div v-if="images?.length">
		<h3>Gallery</h3>
		<v-row>
			<v-col
				v-for="image in images"
				:key="image.sortOrder"
				cols="3"
			>
				<ImageCard :image="image" @clicked="() => imageClicked(image)"/>
			</v-col>
		</v-row>
	</v-div>
</template>

<script setup lang="ts">
	import ImageCard from '@/components/ImageCard.vue';
	import { Image } from '@/api/types';

	const emit = defineEmits(['clicked'])
	const imageClicked = (image: Image) => {
		emit('clicked', image)
	}

	const { images } = defineProps<{
		images: Image[],
	}>();
</script>
