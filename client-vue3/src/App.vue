<template>
	<v-app>
		<v-navigation-drawer temporary v-model="drawerOpen" app>
			<v-list dense>
				<menu-item to="/" icon="mdi-home" title="Home"/>
				<menu-item to="/projects" icon="mdi-wrench" title="Projects"/>
				<menu-item to="/tags" icon="mdi-tag" title="Tags"/>
				<menu-item to="/visualize" icon="mdi-chart-bubble" title="Visualize"/>
				<v-divider />
				<menu-item imageSrc="/icons/react_logo.svg" href="/react_client" title="React"/>
				<menu-item imageSrc="/icons/svelte_logo.svg" href="/svelte_client" title="Svelte"/>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar dark color="primary" app>
			<v-app-bar-nav-icon @click.stop="drawerOpen = !drawerOpen"></v-app-bar-nav-icon>
			<v-toolbar-title>Interactive Resume</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-select
			  style="padding-right: 2em; width: 144px; max-width: 144px; min-width: 144px"
				variant="plain"
				:items="frameworkItems"
				item-title="text"
				item-value="value"
				v-model="framework"
			>
				<template v-slot:item="{ item }">
					<menu-item
						:imageSrc="(item as any).raw.imageSrc"
						:href="(item as any).raw.url + $route.fullPath"
						:title="(item as any).title"
					/>
				</template>
			</v-select>
		</v-toolbar>
		<v-main>
			<v-container class="fill-height app-main-container" fluid>
				<Suspense>
					<router-view />
				</Suspense>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import menuItem from '@/components/MenuItem.vue';

axios.defaults.withCredentials = true;

const drawerOpen = ref(false);

const frameworkItems = [{
	imageSrc: '/icons/react_logo.svg',
	url: '/react_client/#',
	value: 'react',
	text: 'React'
}, {
	imageSrc: '/icons/svelte_logo.svg',
	url: '/svelte_client/#',
	value: 'svelte',
	text: 'Svelte'
}, {
	imageSrc: '/icons/vue_logo.svg',
	url: '/vue3_client/#',
	value: 'vue3',
	text: 'Vue 3'
}];

const framework = ref('vue3');

</script>

<style>

.app-main-container {
	display: flex; 
	flex-direction: column;
}

</style>
