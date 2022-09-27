<template>
	<td><a :href="path">{{text}}</a></td>
</template>

<script setup lang="ts">
	const { path, text } = defineProps(['path', 'text']);
</script>
