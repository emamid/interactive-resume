<script lang="ts">
import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

import type { Employer } from '@/api/types';
import getEmployers from '@/api/axios/getEmployers';
import YearRange from './YearRange.svelte';

let employers: Employer[] = [];

(async function() {
	employers = await getEmployers();
}());
</script>
	
<DataTable table$aria-label="Personal projects">
	<Head>
		<Row>
			<Cell style="width:20%">Dates</Cell>
			<Cell style="width:40%">Company</Cell>
			<Cell style="width:40%">Position</Cell>
		</Row>
	</Head>
	<Body>
	{#each employers as employer}
		<Row>
			<Cell><YearRange startDate={employer.startDate} endDate={employer.endDate} /></Cell>
			<Cell>{employer.name}</Cell>
			<Cell>{employer.position}</Cell>
		</Row>	
	{/each}		
	</Body>
</DataTable>
