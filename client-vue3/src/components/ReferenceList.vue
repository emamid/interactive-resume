<template>
	<div v-if="references?.length">
		<h4>References</h4>
		<ul>
			<li v-for="reference in references">
				<a
					:href="reference.url"
					target="_blank"
					rel="noopener noreferrer"
				>
					{{reference.name}}
				</a>
			</li>
		</ul>
	</div>
	<span v-else />
</template>

<script setup lang="ts">
	const { references } = defineProps(['references']);
</script>
