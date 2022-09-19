<script lang="ts">
import getMyself from '@/api/axios/getMyself';

import PersonalProjects from '@/components/PersonalProjects.svelte';

const myselfPromise = getMyself();

</script>

<div class="home">
	{#await myselfPromise}
	Loading
	{:then myself}
	<PersonalProjects projects={myself.Projects}/>
	{:catch error}
	There was an error
	{/await}
</div>

<style>
	.home {
		height: '100%';
		overflow: 'auto';
	}
</style>
