<template>
	<div class="project">
		<h2>
			{{project?.name}}
			<template v-if="!project?.isPersonal">
				{{' at '}}
			</template>
			<a :href="`./#/employers/${project?.employerID}`">{{project?.Employer?.name}}</a>
			{{' '}}<YearRange :startDate="project?.startDate" :endDate="project?.endDate" withParens/>
		</h2>
		<TagList :tags="project?.Tags || []" chips />
		<div v-html="project?.pageContent" />
		<br />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import getProject from '@/api/axios/getProject';
import { Project } from '@/api/types';
import TagList from '@/components/TagList.vue';
import YearRange from '@/components/YearRange.vue';

const { params: { id } } = useRoute()

const project = ref<Project>();

project.value = await getProject(Array.isArray(id) ? id[0] : id);

</script>

<style>
	.project {
		height: 100%;
		overflow: auto;
	}
</style>
