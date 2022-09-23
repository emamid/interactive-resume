<script lang="ts">
	import type { Image, Project } from '@/api/types';
	import getProject from '@/api/axios/getProject';
	import HTMLContent from '@/components/HTMLContent.svelte';
	import ImageDialog from '@/components/ImageDialog.svelte';
	import ImageGallery from '@/components/ImageGallery.svelte';
	import TagList from '@/components/TagList.svelte';
	import YearRange from '@/components/YearRange.svelte';
	import type { IDParams } from '@/types';
	
	export let params: IDParams;

	let dialogImage: Image;
	let imageDialogOpen = false;
	let project: Project;
	
	(async function() {
		project = await getProject(params?.id);
	}());
</script>
	
<div class="project">
	<div class="mdc-typography--headline5">
		{project?.name}
		{#if !project?.isPersonal}
		{' '}at{' '}
		<a href={`./#/employers/${project?.employerID}`}>{project?.Employer.name}</a>
		{' '}<YearRange startDate={project?.startDate} endDate={project?.endDate}	withParens />
		{/if}
	</div>
	<br />
	<TagList tags={project?.Tags} chips />
	<br />
	<HTMLContent html={project?.pageContent} />
	<br />
	<ImageGallery images={project?.Images} on:clicked={event => {
		dialogImage = event.detail;
		imageDialogOpen = true;
	}}/>
	<ImageDialog image={dialogImage} open={imageDialogOpen} on:closed={() => imageDialogOpen = false} />
</div>

<style>
	.project {
		height: '100%';
		overflow: 'auto';
	}
</style>
