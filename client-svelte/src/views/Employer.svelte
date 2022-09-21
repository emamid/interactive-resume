<script lang="ts">
	import type { Employer } from '@/api/types';
	import getEmployer from '@/api/axios/getEmployer';
	import HTMLContent from '@/components/HTMLContent.svelte';
	import ReferenceList from '@/components/ReferenceList.svelte';
	import YearRange from '@/components/YearRange.svelte';
	import type { IDParams } from '@/types';
	
	export let params: IDParams;

	let employer: Employer;
	
	(async function() {
		employer = await getEmployer(params?.id);
	}());
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
		height: '100%';
		overflow: 'auto';
	}
</style>
