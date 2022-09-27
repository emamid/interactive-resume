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
		<v-app-bar dark color="primary" app>
			<v-app-bar-nav-icon @click.stop="drawerOpen = !drawerOpen"></v-app-bar-nav-icon>
			<v-toolbar-title v-text="title"/>
			<v-spacer></v-spacer>
		</v-app-bar>
		<v-main>
			<v-container class="fill-height app-main-container" fluid>
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import menuItem from '@/components/MenuItem.vue';

export default {
	name: 'App',
	components: {
		'menu-item': menuItem
	},
	data() {
		return {
			drawerOpen: false
		}
	},
}
</script>

<style>

.app-main-container {
	display: flex; 
	flex-direction: column;
}

</style>
