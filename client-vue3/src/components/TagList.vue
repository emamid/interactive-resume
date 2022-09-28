<template>
	<template v-for="tag in tags">
		<v-chip
			v-if="chips"
			variant="outlined"
			@click="goToTag(tag.id)"
		>
			{{tag.name}}
		</v-chip>
		<v-btn
			class="style-button"
			v-else
			variant="outlined"
			color="primary"
			@click="goToTag(tag.id)"
		>
			{{tag.name}}
		</v-btn>
	</template>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { Tag } from '@/api/types';

	const { chips, tags } = defineProps<{
		chips?: boolean,
		tags: Tag[],
	}>();
	const router = useRouter();
	const goToTag = (id: string) => router.push(`/tags/${id}`);
</script>

<style>
	.style-button {
		margin-right: 8px;
		margin-bottom: 16px;
		padding: 0 15px;
	}
</style>