<script lang="ts">
  import Card, {
    PrimaryAction,
  } from '@smui/card';	
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { push } from 'svelte-spa-router';

	import type { Tag } from '@/api/types';
	import getTag from '@/api/axios/getTag';
	import type { IDParams } from '@/types';
	
	export let params: IDParams;

	let tag: Tag;
	
	(async function() {
		tag = await getTag(params?.id);
	}());
</script>


<div class="tag">
	<div class="mdc-typography--headline5">{tag?.name}</div>
	<LayoutGrid>
		{#each (tag?.Projects || []) as project}
			<Cell span={3}>
				<Card>
					<PrimaryAction on:click={() => push(`/projects/${project.id}`)} padded>
						<div class="mdc-typography--headline5">{project.name}</div>
						<div>{project.Employer?.name || 'Personal'}</div>
					</PrimaryAction>
				</Card>			
			</Cell>
		{/each}
	</LayoutGrid>
</div>

<style>
	.tag {
		height: 100%;
		overflow: auto;
	}
</style>
