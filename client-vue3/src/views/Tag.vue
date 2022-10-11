<template>
	<div class="tag">
		<h2>
			{{tag?.name}}
		</h2>
		<v-container>
			<v-row>
				<v-col
					v-for="project in tag?.Projects"
					:key="project.id"
					md="3"
					sm="6"
					cols="12"
				>
					<v-card
						:title="project.name"
						:subtitle="project.Employer.name"
						@click="goToProject(project.id)"
					/>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import getTag from '@/api/axios/getTag';
import { Tag } from '@/api/types';

const { params: { id } } = useRoute();
const router = useRouter();

const tag = ref<Tag>();
const goToProject = (id: string) => router.push(`/projects/${id}`);
tag.value = await getTag(Array.isArray(id) ? id[0] : id);
</script>

<style>
	.tag {
		height: 100%;
		overflow: auto;
	}
</style>
