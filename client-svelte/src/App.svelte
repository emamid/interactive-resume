<script lang="ts">
import axios from 'axios';

import Home from './views/Home.svelte';

axios.defaults.withCredentials = true;
</script>

<main>
	<Home/>
</main>


<style>
</style>