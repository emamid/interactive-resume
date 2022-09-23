<script lang="ts">
	export let colorMap: Record<string, string> = {};
</script>

<div class="legend-container">
	{#each Object.entries(colorMap) as [text, color]}
	<span
	  class="legend-item"
		style={`background-color: ${color}`}
	>
		{text === 'null' ? 'Other' : text}
	</span>
	{/each}	
</div>

<style>
	.legend-container {
		margin-top: 1em;
	}
	
	.legend-item {
		margin: 5px;
		padding: 5px;
	}
</style>
