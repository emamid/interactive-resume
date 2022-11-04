<script lang="ts">
import axios from 'axios';
import Button, { Label } from '@smui/button';
import IconButton from '@smui/icon-button';
import Select, { Option } from '@smui/select';
import Textfield from '@smui/textfield';
import HelperText from '@smui/textfield/helper-text';

import { apiURL } from '@/api/utils';
import JSONViewer from '@/components/JSONViewer.svelte';

let endpoint = localStorage.getItem('rest-endpoint') || 'employers';
let id = localStorage.getItem('rest-id') || '';
let data: any = null;
let lastURL: string = null;
let lastEndpoint: string = null;
let statusMessage: string = null;

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
	} catch (error) {
		data = null;
		const { response: { status, statusText } } = error;
		statusMessage = `${status}: ${statusText}`;	
	}
}

const clearID = () => {
	id = '';
}

const itemClicked = (itemID: string) => {
	endpoint = lastEndpoint;
	id = itemID;
	makeRequest();
}

const setEndpoint = (newEndpoint: string) => {
	endpoint = newEndpoint;
	id = '';
}

$: {
	localStorage.setItem('rest-endpoint', endpoint);
	localStorage.setItem('rest-id', id);
}

makeRequest();
</script>
	
<div class="rest-api">
	<div>
		<div class="mdc-typography--headline5">REST API</div>
		<div class="controls" class:controls-no-id="{!allowsID(endpoint)}">
			<div class="control-field">
				<Select style="width: 15em" value={endpoint} label="Endpoint" on:SMUISelect:change={event => setEndpoint(event.detail.value)}>
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
						<HelperText slot="helper">{helperText[endpoint]} (optional)</HelperText>
					</Textfield>	
				</div>
				<div class="clear-button-wrapper">
					<IconButton class="material-icons" on:click={clearID}>delete</IconButton>
				</div>
			{/if}
		</div>
		<Button on:click={makeRequest} variant="raised">
			<Label>Request</Label>
		</Button>
	</div>
	{#if data}
		<div class="mdc-typography--headline5">Response data for {lastURL}:</div>
		<JSONViewer {data} allowsID={allowsID(lastEndpoint)} on:itemClicked={event => itemClicked(event.detail)}/>
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
