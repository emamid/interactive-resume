<template>
	<div v-if="Array.isArray(data) && allowsID" class="data">
		<pre class="bracket">[</pre>
		<pre
			v-for="line in data"
			class="item"
			@click="() => emit('itemClicked', line.id)"
			>{{ lineText(line) }}</pre
		>
		<pre class="bracket">]</pre>
	</div>
	<pre v-else class="data">{{ JSON.stringify(data, null, '  ') }}</pre>
</template>

<script setup lang="ts">
const { data, allowsID } = defineProps<{
	data?: any;
	allowsID?: boolean;
}>();
const emit = defineEmits(['itemClicked']);
const lineText = (line: any): string =>
	JSON.stringify(line, null, '  ') +
	(line === data[data.length - 1] ? '' : ',');
</script>

<style>
.data {
	overflow: auto;
	flex-grow: 1;
	width: 100%;
	border: 1px black solid;
	padding: 5px;
}

pre.bracket {
	margin: 0;
}

pre.item {
	margin: 0 0 0 2em;
}

pre.item:hover {
	background-color: lightgrey;
}
</style>
