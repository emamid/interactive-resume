<script lang="ts">
import axios from 'axios';
import Button, { Label } from '@smui/button';
import IconButton from '@smui/icon-button';
import Select, { Option } from '@smui/select';
import Textfield from '@smui/textfield';
import HelperText from '@smui/textfield/helper-text';

import { apiURL } from '@/api/utils';
import JSONViewer from '@/components/JSONViewer.svelte';

let endpoint = $state(localStorage.getItem('rest-endpoint') || 'employers');
let id = $state(localStorage.getItem('rest-id') || '');
let data = $state<any>(null);
let lastURL = $state<string | null>(null);
let lastEndpoint = $state<string | null>(null);
let statusMessage = $state<string | null>(null);

const idEndpoints = ['employers', 'projects', 'tags'];
const helperText = {
	'employers': 'employerID',
	'projects': 'projectID',
	'tags': 'tagID',
}

const allowsID = (endpoint: string) => idEndpoints.indexOf(endpoint) !== -1;

const makeRequest = async () => {
	try {
		lastEndpoint = endpoint;
		lastURL = apiURL(`${endpoint}/${(allowsID(endpoint) && id?.length) ? id.trim() : ''}`)
		const response = await axios.get<any>(lastURL);
		data = response.data;
		statusMessage = null;
	} catch (error: any) {
		data = null;
		const { response: { status, statusText } } = error;
		statusMessage = `${status}: ${statusText}`;	
	}
}

const clearID = () => {
	id = '';
}

const itemClicked = (itemID: string) => {
	if (lastEndpoint) endpoint = lastEndpoint;
	id = itemID;
	makeRequest();
}

const setEndpoint = (newEndpoint: string) => {
	endpoint = newEndpoint;
	id = '';
}

$effect(() => {
	localStorage.setItem('rest-endpoint', endpoint);
	localStorage.setItem('rest-id', id);
});

makeRequest();
</script>
	
<div class="rest-api">
	<div>
		<div class="mdc-typography--headline5">REST API</div>
		<div class="controls" class:controls-no-id="{!allowsID(endpoint)}">
			<div class="control-field">
				<Select style="width: 15em" value={endpoint} label="Endpoint" onSMUISelectChange={(event: CustomEvent<{ value: string }>) => setEndpoint(event.detail.value)}>
					<Option value={'employers'}>employers</Option>
					<Option value={'myself'}>myself</Option>
					<Option value={'projects'}>projects</Option>
					<Option value={'project-tags'}>project-tags</Option>
					<Option value={'tags'}>tags</Option>
				</Select>	
			</div>
			{#if allowsID(endpoint)}
				<div class="control-field">
					<Textfield style="width: 20em" bind:value={id} label="id">
						{#snippet helper()}
							<HelperText>{helperText[endpoint as keyof typeof helperText]} (optional)</HelperText>
						{/snippet}
					</Textfield>	
				</div>
				<div class="clear-button-wrapper">
					<IconButton class="material-icons" onclick={clearID}>delete</IconButton>
				</div>
			{/if}
		</div>
		<Button onclick={makeRequest} variant="raised">
			<Label>Request</Label>
		</Button>
	</div>
	{#if data}
		<div class="mdc-typography--headline5">Response data for {lastURL}:</div>
		<JSONViewer {data} allowsID={allowsID(lastEndpoint || '')} onitemClicked={itemClicked}/>
	{/if}
	{#if statusMessage}
		<div class="mdc-typography--headline5">Response data for {lastURL}:</div>
		<pre>{statusMessage}</pre>
	{/if}
</div>

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
