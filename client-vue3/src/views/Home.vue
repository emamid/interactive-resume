<template>
	<div v-html="myself?.pageContent" />
	<br />
	<h4>Employment History</h4>
	<Employers />
	<br />
	<h4>Personal Projects</h4>
	<PersonalProjects :projects="myself?.Projects" />
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';

	import getMyself from '@/api/axios/getMyself';
	import { Myself } from '@/api/types'	
	import Employers from '@/components/Employers.vue';
	import PersonalProjects from '@/components/PersonalProjects.vue';
	
	const myself = ref<Myself>();

	onMounted(async () => {
		myself.value = await getMyself();
	})

</script>
