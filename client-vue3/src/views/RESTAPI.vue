<template>
	<div class="rest-api">
		<div>
			<h2>REST API</h2>
			<div class="controls">
				<div class="control-field" style="width: 15em">
					<v-select
						:items="endpointItems"
						label="Endpoint"
						variant="underlined"
						v-model="endpoint"
					/>
				</div>
				<div
					v-if="allowsID(endpoint)"
					class="control-field"
					style="width: 20em"
				>
					<v-text-field
						label="id"
						variant="underlined"
						v-model="id"
						append-inner-icon="mdi-delete"
						:hint="helperText[endpoint]"
						@click:append-inner="clearID"
					/>
				</div>
			</div>
			<v-btn style="width: 7.5em" color="primary" @click="makeRequest"
				>Request</v-btn
			>
		</div>
		<div v-if="data">
			<h2>Response data for {{ lastURL }}:</h2>
			<JSONViewer
				v-if="data"
				:data="data"
				:allowsID="allowsID(lastEndpoint)"
				@item-clicked="itemClicked"
			/>
		</div>
		<div v-if="statusMessage">
			<h2>Response data for {{ lastURL }}:</h2>
			<pre>{{ statusMessage }}</pre>
		</div>
	</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, ref, watch } from 'vue';

import { apiURL } from '@/api/utils';
import JSONViewer from '@/components/JSONViewer.vue';

const endpointItems = [
	'employers',
	'myself',
	'projects',
	'project-tags',
	'tags'
];
const idEndpoints = ['employers', 'projects', 'tags'];
const helperText: Record<string, string> = {
	employers: 'employerID',
	projects: 'projectID',
	tags: 'tagID'
};

const endpoint = ref<string>(
	localStorage.getItem('rest-endpoint') || 'employers'
);
const id = ref<string>(localStorage.getItem('rest-id') || '');
const lastEndpoint = ref<string>();
const lastURL = ref<string>();
const data = ref<any>();
const statusMessage = ref<string>();

const allowsID = (testEndpoint?: string) =>
	!!testEndpoint && idEndpoints.indexOf(testEndpoint) !== -1;

const clearID = () => (id.value = '');

const itemClicked = (itemID: string) => {
	endpoint.value = lastEndpoint.value || '';
	id.value = itemID;
	makeRequest();
};

const makeRequest = async () => {
	try {
		lastEndpoint.value = endpoint.value;
		lastURL.value = apiURL(
			`${endpoint.value}/${
				allowsID(endpoint.value) && id.value?.length
					? id.value.trim()
					: ''
			}`
		);
		const response = await axios.get<any>(lastURL.value);
		data.value = response.data;
		statusMessage.value = undefined;
	} catch (error: any) {
		data.value = null;
		const {
			response: { status, statusText }
		} = error;
		statusMessage.value = `${status}: ${statusText}`;
	}
};

watch(endpoint, (newEndpoint) =>
	localStorage.setItem('rest-endpoint', newEndpoint)
);
</script>

<style>
.rest-api {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.controls {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
}

.controls-no-id {
	margin-bottom: 19px;
}

.control-field {
	margin-right: 10px;
}

.clear-button-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: -40px;
}
</style>
