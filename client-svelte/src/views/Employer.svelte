<script lang="ts">
	import type { Employer } from '@/api/types';
	import getEmployer from '@/api/axios/getEmployer';
	import type { IDParams } from '@/types';
	
	export let params: IDParams;

	let employer: Employer;
	
	(async function() {
		employer = await getEmployer(params?.id);
	}());
</script>
	
<div class="employer">
	Employer view, in progress
	<div>{JSON.stringify(employer)}</div>
</div>

<style>
	.employer {
		height: '100%';
		overflow: 'auto';
	}
</style>
