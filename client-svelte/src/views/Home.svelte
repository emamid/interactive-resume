<script lang="ts">
import type { Myself } from '@/api/types';
import getMyself from '@/api/axios/getMyself';

import HTMLContent from '@/components/HTMLContent.svelte';
import PersonalProjects from '@/components/PersonalProjects.svelte';

let myself: Myself = null;

(async function() {
	myself = await getMyself();
}());

</script>

<div class="home">
	<HTMLContent html={myself?.pageContent} />
	<PersonalProjects projects={myself?.Projects}/>
</div>

<style>
	.home {
		height: '100%';
		overflow: 'auto';
	}
</style>
