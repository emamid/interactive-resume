<template>
	<div class="tags">
		<TagList :tags="tags" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import getTags from '@/api/axios/getTags';
import { Tag } from '@/api/types';
import TagList from '@/components/TagList.vue';

const tags= ref<Tag[]>([]);
tags.value = await getTags();
</script>

<style>
	.tags {
		height: 100%;
		overflow: auto;
	}
</style>
