<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Dates
        </th>
        <th class="text-left">
          Company
        </th>
        <th class="text-left">
          Position
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="employer in employers"
        :key="employer.id"
      >
        <td><YearRange :startDate="employer.startDate" :endDate="employer.endDate" /></td>
				<LinkCell :path="`./#/employers/${employer.id}`" :text="employer.name" />
				<LinkCell :path="`./#/employers/${employer.id}`" :text="employer.position" />
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import getEmployers from '@/api/axios/getEmployers';
import { Employer } from '@/api/types';
import LinkCell from '@/components/LinkCell.vue';
import YearRange from '@/components/YearRange.vue';

const employers = ref<Employer[]>([]);

onMounted(async () => {
	employers.value = await getEmployers();
})

</script>