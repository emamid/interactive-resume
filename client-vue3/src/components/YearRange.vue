<template>
	<span v-if="startYear || endYear">{{ withParens ? `($yearsStr)` : yearsStr }}</span>
	<span v-else />
</template>

<script setup lang="ts">
	const { startDate, endDate, withParens } = defineProps<{
		startDate?: string,
		endDate?: string,
		withParens?: boolean,
	}>();
	const startYear = startDate ? new Date(startDate).getFullYear() : null;
  const endYear = endDate ? new Date(endDate).getFullYear() : null;
	const yearsStr = (startYear === endYear) ? startYear : (endYear ? `${startYear} - ${endYear}` : `${startYear} -`);
</script>
