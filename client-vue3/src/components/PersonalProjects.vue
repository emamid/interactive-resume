<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Dates
        </th>
        <th class="text-left">
          Project
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="project in projects"
        :key="project.id"
      >
        <td><YearRange :startDate="project.startDate" :endDate="project.endDate" /></td>
				<LinkCell :path="`./#/projects/${project.id}`" :text="project.name" />
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import LinkCell from '@/components/LinkCell.vue';
import YearRange from '@/components/YearRange.vue';

const { projects } = defineProps(['projects']);

</script>