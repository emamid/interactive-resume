<template>
	<v-app>
		<v-navigation-drawer temporary v-model="drawerOpen" app>
			<v-list dense>
				<menu-item to="/" icon="mdi-home" title="Home"/>
				<menu-item to="/projects" icon="mdi-wrench" title="Projects"/>
				<menu-item to="/tags" icon="mdi-tag" title="Tags"/>
				<menu-item to="/visualize" icon="mdi-chart-bubble" title="Visualize"/>
				<v-divider />
				<menu-item title="React"/>
				<menu-item title="Svelte"/>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar dark color="primary" app>
			<v-app-bar-nav-icon @click.stop="drawerOpen = !drawerOpen"></v-app-bar-nav-icon>
			<v-toolbar-title>Interactive Resume</v-toolbar-title>
			<v-spacer></v-spacer>
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
</script>

<style>

.app-main-container {
	display: flex; 
	flex-direction: column;
}

</style>
