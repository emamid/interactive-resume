<script lang="ts">
import getMyself from '@/api/axios/getMyself';

import HTMLContent from '@/components/HTMLContent.svelte';
import PersonalProjects from '@/components/PersonalProjects.svelte';

const myselfPromise = getMyself();

</script>

<div class="home">
	{#await myselfPromise}
	Loading
	{:then myself}
	<HTMLContent html={myself.pageContent} />
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
