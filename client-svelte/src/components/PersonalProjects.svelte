<script lang="ts">
import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

import type { BaseProject } from '@/api/types';
import YearRange from './YearRange.svelte';

export let projects: BaseProject[] = [];
</script>

<DataTable table$aria-label="Personal projects">
  <Head>
    <Row>
      <Cell style="width:30%">Dates</Cell>
      <Cell style="width:70%">Project</Cell>
    </Row>
  </Head>
	<Body>
	{#each projects as project}
		<Row>
			<Cell><YearRange startDate={project.startDate} endDate={project.endDate} /></Cell>
			<Cell>{project.name}</Cell>
		</Row>	
	{/each}		
	</Body>
</DataTable>
