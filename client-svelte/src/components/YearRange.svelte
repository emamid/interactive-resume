<script lang="ts">
	export let startDate: string;
	export let endDate: string;
	export let withParens: boolean = false;

	let startYear;
	let endYear;
	let yearsStr;
	$: {
		startYear = startDate ? new Date(startDate).getFullYear() : null;
    endYear = endDate ? new Date(endDate).getFullYear() : null;
	  yearsStr = (startYear === endYear) ? startYear : (endYear ? `${startYear} - ${endYear}` : `${startYear} -`);
	}
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
