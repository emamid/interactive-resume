<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let data: any = null;
	export let allowsID: boolean = false;

	const dispatch = createEventDispatcher();
	const itemClicked = (id: string) => dispatch('itemClicked', id);
</script>

{#if Array.isArray(data) && allowsID}
<div class="data">
	<pre class="bracket">[</pre>
	{#each data as line}
		<pre class="item" on:click={() => itemClicked(line.id)}>{JSON.stringify(line, null, '  ')}{#if line !== data[data.length-1]},{/if}</pre>
	{/each}		
	<pre class="bracket">]</pre>
</div>
{:else}
<pre class="data">{JSON.stringify(data, null, '  ')}</pre>
{/if}

<style>
	.data {
		flex-grow: 1;
		width: 100%;
		overflow: auto;
		border: 1px black solid;
		padding: 5px;
	}

	pre.bracket {
		margin: 0;
	}
	pre.item {
		margin: 0 0 0 2em;
	}

	pre.item:hover {
		background-color: lightgrey;
	}
</style>
