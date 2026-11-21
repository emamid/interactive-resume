<script lang="ts">
	let { html = '' }: { html?: string | null } = $props();
</script>

<div class="mdc-typography--body1">
	{@html html}
</div>

<style>
	/* .custom-html-content {

	} */
</style>
