<script lang="ts">
import type { Myself } from '@/api/types';
import getMyself from '@/api/axios/getMyself';

import HTMLContent from '@/components/HTMLContent.svelte';
import Employers from '@/components/Employers.svelte';
import PersonalProjects from '@/components/PersonalProjects.svelte';

let myself: Myself = null;

(async function() {
	myself = await getMyself();
}());
</script>

<div class="home">
	<HTMLContent html={myself?.pageContent} />
	<div>Employment History</div>
	<Employers />
	<div class="personal-projects-title">Personal Projects</div>
	<PersonalProjects projects={myself?.Projects}/>
</div>

<style>
	.home {
		height: 100%;
	}
	.personal-projects-title {
		margin-top: 2rem;
	}
</style>
