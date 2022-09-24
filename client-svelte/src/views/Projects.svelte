<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	
	import type { Project } from '@/api/types';
	import getProjects from '@/api/axios/getProjects';
	import LinkCell from '@/components/LinkCell.svelte';
	import YearRange from '@/components/YearRange.svelte';
	
	let projects: Project[] = [];
	
	(async function() {
		projects = await getProjects();
	}());
</script>

<div class="projects">
	<DataTable table$aria-label="Projects">
		<Head>
			<Row>
				<Cell style="width:20%">Dates</Cell>
				<Cell style="width:40%">Project</Cell>
				<Cell style="width:40%">Company</Cell>
			</Row>
		</Head>
		<Body>
		{#each projects as project}
			<Row>
				<Cell><YearRange startDate={project.startDate} endDate={project.endDate} /></Cell>
				<LinkCell path={`./#/projects/${project.id}`} text={project.name} />
				<LinkCell path={`./#/employers/${project?.Employer.id}`} text={project.Employer?.name} />
			</Row>	
		{/each}		
		</Body>
	</DataTable>
</div>

<style>
	.projects {
		height: 100%;
		overflow: auto;
	}
</style>
