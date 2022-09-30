<template>
	<div class="legend-container">
		<span
			v-for="(value, key) in colorMap"
			class="legend-item"
			:style="`background-color: ${value}`"
		>
			{{key === 'null' ? 'Other' : key}}
		</span>
	</div>
</template>

<script setup lang="ts">
	const { colorMap } = defineProps<{ colorMap: Record<string, string>}>();
</script>

<style>
	.legend-container {
		margin-top: 1em;
	}
	
	.legend-item {
		margin: 5px;
		padding: 5px;
	}
</style>
