import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue';
import Employer from '@/views/Employer.vue';
import Project from '@/views/Project.vue';
import Projects from '@/views/Projects.vue';
import Tag from '@/views/Tag.vue';
import Tags from '@/views/Tags.vue';
import Visualize from '@/views/Visualize.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/employers/:id',
		name: 'Employer',
		component: Employer,
	},
	{
		path: '/projects',
		name: 'Projects',
		component: Projects,
	},
	{
		path: '/projects/:id',
		name: 'Project',
		component: Project,
	},
	{
		path: '/tags',
		name: 'Tags',
		component: Tags,
	},
	{
		path: '/tags/:id',
		name: 'Tag',
		component: Tag,
	},
	{
		path: '/visualize',
		name: 'Visualize',
		component: Visualize,
	},
];

export default () => createRouter({
	history: createWebHashHistory(),
	routes:  routes,
});
