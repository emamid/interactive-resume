<script lang="ts">
	import type { Employer } from '@/api/types';
	import getEmployer from '@/api/axios/getEmployer';
	import HTMLContent from '@/components/HTMLContent.svelte';
	import ReferenceList from '@/components/ReferenceList.svelte';
	import YearRange from '@/components/YearRange.svelte';
	import type { IDParams } from '@/types';
	
	let { params }: { params?: IDParams } = $props();

	let employer = $state<Employer | undefined>();

	$effect(() => {
		const id = params?.id;
		if (!id) return;
		let active = true;
		getEmployer(id).then((result) => {
			if (active) employer = result;
		});
		return () => {
			active = false;
		};
	});
</script>
	
<div class="employer">
	<div class="mdc-typography--headline5">
		{employer?.position} at {employer?.name} <YearRange startDate={employer?.startDate} endDate={employer?.endDate} withParens/>
	</div>
	<HTMLContent html={employer?.pageContent} />
	<br />
	<ReferenceList references={employer?.References} />
</div>

<style>
	.employer {
		height: 100%;
		overflow: auto;
	}
</style>
