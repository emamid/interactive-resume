<script lang="ts">
export let html: string = '';
</script>

<div class="custom-html-content">
	{@html html}
</div>

<style>
	.custom-html-content {
		padding: 10px;
	}
</style>
