<template>
	<span v-if="startDate || endDate">{{ withParens ? `(${yearsStr})` : yearsStr }}</span>
	<span v-else />
</template>

<script setup lang="ts">
	const { startDate, endDate, withParens } = defineProps<{
		startDate?: string,
		endDate?: string,
		withParens?: boolean,
	}>();
	let startYear = startDate ? new Date(startDate || '').getFullYear() : null;
  let endYear = endDate ? new Date(endDate).getFullYear() : null;
	let yearsStr = (startYear === endYear) ? startYear : (endYear ? `${startYear} - ${endYear}` : `${startYear} -`);
</script>
