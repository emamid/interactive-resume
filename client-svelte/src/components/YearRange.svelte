<script lang="ts">
	export let startDate: string;
	export let endDate: string;
	export let withParens: boolean = false;

	const startYear = startDate ? new Date(startDate).getFullYear() : null;
	const endYear = endDate ? new Date(endDate).getFullYear() : null;
	const yearsStr = (startYear === endYear) ? startYear : (endYear ? `${startYear} - ${endYear}` : `${startYear} -`);
</script>

{#if startYear || endYear}
	{#if withParens}
		<span>({yearsStr})</span>	
	{:else}
		<span>{yearsStr}</span>	
	{/if}
{:else}
	<span/>
{/if}
