<script lang="ts">
	let {
		startDate,
		endDate,
		withParens = false,
	}: {
		startDate?: string | null;
		endDate?: string | null;
		withParens?: boolean;
	} = $props();

	let startYear = $derived(startDate ? new Date(startDate).getFullYear() : null);
	let endYear = $derived(endDate ? new Date(endDate).getFullYear() : null);
	let yearsStr = $derived((startYear === endYear) ? startYear : (endYear ? `${startYear} - ${endYear}` : `${startYear} -`));
</script>

{#if startYear || endYear}
	{#if withParens}
		<span>({yearsStr})</span>	
	{:else}
		<span>{yearsStr}</span>	
	{/if}
{:else}
	<span></span>
{/if}
