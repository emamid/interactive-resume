<script lang="ts">
import axios from 'axios';
import IconButton from '@smui/icon-button';
import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';

import Home from './views/Home.svelte';

axios.defaults.withCredentials = true;
</script>

<TopAppBar variant="static" color="primary">
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<Title>Interactive Resume</Title>
		</Section>
	</Row>
</TopAppBar>
<main>
	<Home/>
</main>


<style>
</style>