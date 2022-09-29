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
		<br />
		<TagList :tags="project?.Tags || []" chips />
		<div v-html="project?.pageContent" />
		<br />
		<ImageDialog :image="dialogImage" v-model:open="imageDialogOpen"/>
		<ImageGallery :images="project?.Images || []" @clicked="imageClicked"/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import getProject from '@/api/axios/getProject';
import { Image, Project } from '@/api/types';
import ImageDialog from '@/components/ImageDialog.vue';
import ImageGallery from '@/components/ImageGallery.vue';
import TagList from '@/components/TagList.vue';
import YearRange from '@/components/YearRange.vue';

const { params: { id } } = useRoute()

const imageClicked = (image: Image) => {
	dialogImage.value = image;
	imageDialogOpen.value = true;
}

const imageDialogClosed = () => {
	imageDialogOpen.value = false;
	dialogImage.value = undefined;
}

const project = ref<Project>();
const dialogImage = ref<Image>();
const imageDialogOpen = ref<boolean>(false);

project.value = await getProject(Array.isArray(id) ? id[0] : id);

</script>

<style>
	.project {
		height: 100%;
		overflow: auto;
	}
</style>
