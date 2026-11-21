<script lang="ts">
	import type { Reference } from '@/api/types';

	let { references = [] }: { references?: Reference[] } = $props();
</script>

{#if references?.length}
<div>
	<div class="mdc-typography--headline6">References</div>
	<ul>
		{#each references as reference (reference.id)}
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
<span></span>
{/if}
