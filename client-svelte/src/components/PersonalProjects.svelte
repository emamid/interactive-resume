<script lang="ts">
import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

import type { Project } from '@/api/types';
import YearRange from './YearRange.svelte';

export let projects: any[] = [];
</script>

<DataTable table$aria-label="Personal projects" style="max-width: 100%;">
  <Head>
    <Row>
      <Cell>Dates</Cell>
      <Cell>Project</Cell>
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
