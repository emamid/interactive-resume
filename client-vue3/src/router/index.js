import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue';
import Projects from '@/views/Projects.vue';
import Tags from '@/views/Tags.vue';
import Visualize from '@/views/Visualize.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/projects',
		name: 'Projects',
		component: Projects,
	},
	{
		path: '/tags',
		name: 'Tags',
		component: Tags,
	},
	{
		path: '/visualize',
		name: 'Visualize',
		component: Visualize,
	},
];

export default () => createRouter({
	history: createWebHistory(),
	routes:  routes,
});
