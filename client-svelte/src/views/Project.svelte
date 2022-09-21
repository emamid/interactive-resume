<script lang="ts">
	import type { Project } from '@/api/types';
	import getProject from '@/api/axios/getProject';
	import type { IDParams } from '@/types';
	
	export let params: IDParams;

	let project: Project;
	
	(async function() {
		project = await getProject(params?.id);
	}());
</script>
	
<div class="project">
	Project view, in progress
	<div>{JSON.stringify(project)}</div>
</div>

<style>
	.project {
		height: '100%';
		overflow: 'auto';
	}
</style>
