<template>
	<div class="employer">
		<h2>
			{{employer?.position}} at {{employer?.name}} <YearRange :startDate="employer?.startDate" :endDate="employer?.endDate" withParens/>
		</h2>
		<div v-html="employer?.pageContent" />
		<br />
		<ReferenceList :references="employer?.References" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import getEmployer from '@/api/axios/getEmployer';
import { Employer } from '@/api/types';
import ReferenceList from '@/components/ReferenceList.vue';
import YearRange from '@/components/YearRange.vue';

const { params: { id } } = useRoute()

const employer = ref<Employer>();

onMounted(async () => {
	employer.value = await getEmployer(Array.isArray(id) ? id[0] : id);
})

</script>

<style>
	.employer {
		height: 100%;
		overflow: auto;
	}
</style>
