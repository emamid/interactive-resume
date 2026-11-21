<script lang="ts">
	let {
		data = null,
		allowsID = false,
		onitemClicked,
	}: {
		data?: any;
		allowsID?: boolean;
		onitemClicked?: (id: string) => void;
	} = $props();

	const itemClicked = (id: string) => onitemClicked?.(id);
</script>

{#if Array.isArray(data) && allowsID}
<div class="data">
	<pre class="bracket">[</pre>
	{#each data as line (line.id)}
		<div
			class="item"
			role="button"
			tabindex="0"
			onclick={() => itemClicked(line.id)}
			onkeydown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					itemClicked(line.id);
				}
			}}
		>{JSON.stringify(line, null, '  ')}{#if line !== data[data.length-1]},{/if}</div>
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
	div.item {
		margin: 0 0 0 2em;
		white-space: pre;
		font-family: monospace;
	}

	div.item:hover {
		background-color: lightgrey;
	}
</style>
