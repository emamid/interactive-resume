<script lang="ts">
	import type { Image, Project } from '@/api/types';
	import getProject from '@/api/axios/getProject';
	import HTMLContent from '@/components/HTMLContent.svelte';
	import ImageDialog from '@/components/ImageDialog.svelte';
	import ImageGallery from '@/components/ImageGallery.svelte';
	import TagList from '@/components/TagList.svelte';
	import YearRange from '@/components/YearRange.svelte';
	import type { IDParams } from '@/types';
	
	let { params }: { params?: IDParams } = $props();

	let dialogImage = $state<Image | undefined>();
	let imageDialogOpen = $state(false);
	let project = $state<Project | undefined>();
	let sortedTags = $derived(project?.Tags ? [...project.Tags].sort((tag1, tag2) => tag1.name.localeCompare(tag2.name)) : undefined);

	$effect(() => {
		const id = params?.id;
		if (!id) return;
		let active = true;
		getProject(id).then((result) => {
			if (active) project = result;
		});
		return () => {
			active = false;
		};
	});
</script>
	
<div class="project">
	<div class="mdc-typography--headline5">
		{project?.name}
		{#if !project?.isPersonal}
		{' at '}
		<a href={`./#/employers/${project?.employerID}`}>{project?.Employer.name}</a>
		{' '}<YearRange startDate={project?.startDate} endDate={project?.endDate}	withParens />
		{/if}
	</div>
	<br />
	<TagList tags={sortedTags} chips />
	<br />
	<HTMLContent html={project?.pageContent} />
	<br />
	<ImageGallery images={project?.Images} onclicked={(image) => {
		dialogImage = image;
		imageDialogOpen = true;
	}}/>
	<ImageDialog image={dialogImage} bind:open={imageDialogOpen} onclosed={() => imageDialogOpen = false} />
</div>

<style>
	.project {
		height: 100%;
		overflow: auto;
	}
</style>
