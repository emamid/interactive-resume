<script lang="ts">
import getMyself from '@/api/axios/getMyself';

const myselfPromise = getMyself();

</script>

<div class="home">
  This is the home page
	{#await myselfPromise}
	Loading
	{:then myself}
	{JSON.stringify(myself)}
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
