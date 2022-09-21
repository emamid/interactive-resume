<script lang="ts">
	import type { Reference } from '@/api/types';

	export let references: Reference[] = [];
</script>

{#if references?.length}
<div>
	<div class="mdc-typography--headline6">References</div>
	<ul>
		{#each references as reference}
			<li>
				<a
					href={reference.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					{reference.name}
				</a>
			</li>
		{/each}		
	</ul>
</div>
{:else}
<span />
{/if}
