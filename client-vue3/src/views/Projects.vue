<template>
	<div class="projects">
		<v-table density="compact">
			<thead>
				<tr>
					<th class="text-left">
						Dates
					</th>
					<th class="text-left">
						Position
					</th>
					<th class="text-left">
						Company
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="project in projects"
					:key="project.id"
				>
					<td><YearRange :startDate="project.startDate" :endDate="project.endDate" /></td>
					<LinkCell :path="`./#/projects/${project.id}`" :text="project.name" />
					<LinkCell :path="`./#/employers/${project.employerID}`" :text="project.Employer.name" />
				</tr>
			</tbody>
		</v-table>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import getProjects from '@/api/axios/getProjects';
import { Project } from '@/api/types';
import LinkCell from '@/components/LinkCell.vue';
import YearRange from '@/components/YearRange.vue';

const projects = ref<Project[]>([]);

onMounted(async () => {
	projects.value = await getProjects();
})

</script>

<style>
	.projects {
		height: 100%;
		overflow: auto;
	}
</style>
