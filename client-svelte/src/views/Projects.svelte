<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	
	import type { Project } from '@/api/types';
	import getProjects from '@/api/axios/getProjects';
	import LinkCell from '@/components/LinkCell.svelte';
	import YearRange from '@/components/YearRange.svelte';
	
	let projects = $state<Project[]>([]);

	$effect(() => {
		let active = true;
		getProjects().then((result) => {
			if (active) projects = result;
		});
		return () => {
			active = false;
		};
	});
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
		{#each projects as project (project.id)}
			<Row>
				<Cell><YearRange startDate={project.startDate} endDate={project.endDate} /></Cell>
				<LinkCell path={`./#/projects/${project.id}`} text={project.name} />
				<LinkCell path={`./#/employers/${project?.employerID}`} text={project.Employer?.name} />
			</Row>	
		{/each}		
		</Body>
	</DataTable>
</div>

<style>
	.projects {
		height: 100%;
	}
</style>
