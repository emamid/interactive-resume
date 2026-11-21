<script lang="ts">
  import Card, {
    PrimaryAction,
  } from '@smui/card';	
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { push } from 'svelte-spa-router';

	import type { Tag } from '@/api/types';
	import getTag from '@/api/axios/getTag';
	import type { IDParams } from '@/types';
	
	let { params }: { params?: IDParams } = $props();

	let tag = $state<Tag | undefined>();
	let projects = $derived([...(tag?.Projects || [])].sort((project1, project2) => project1.name.localeCompare(project2.name)));

	$effect(() => {
		const id = params?.id;
		if (!id) return;
		let active = true;
		getTag(id).then((result) => {
			if (active) tag = result;
		});
		return () => {
			active = false;
		};
	});
</script>

<div class="tag">
	<div class="mdc-typography--headline5">{tag?.name}</div>
	<LayoutGrid>
		{#each projects as project (project.id)}
			<Cell span={3}>
				<Card>
					<PrimaryAction onclick={() => push(`/projects/${project.id}`)} padded>
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
	}
</style>
