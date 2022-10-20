<script lang="ts">
import axios from 'axios';
import Button, { Label } from '@smui/button';
import Select, { Option } from '@smui/select';
import Textfield from '@smui/textfield';
import HelperText from '@smui/textfield/helper-text';

import { apiURL } from '@/api/utils';

let endpoint = localStorage.getItem('rest-endpoint') || 'employers';
let id = '';
let allowsID: boolean = true;
let data: any = null;
let lastURL: string = null;
let statusMessage: string = null;

const idEndpoints = ['employers', 'projects', 'tags'];
const helperText = {
	'employers': 'employerID',
	'projects': 'projectID',
	'tags': 'tagID',
}

const makeRequest = async () => {
	try {
		lastURL = apiURL(`${endpoint}/${(allowsID && id?.length) ? id.trim() : ''}`)
		const response = await axios.get<any>(lastURL);
		data = response.data;
		statusMessage = null;
	} catch (error) {
		data = null;
		const { response: { status, statusText } } = error;
		statusMessage = `${status}: ${statusText}`;	
	}
}

$: {
	allowsID = idEndpoints.indexOf(endpoint) !== -1;
	localStorage.setItem('rest-endpoint', endpoint);
	localStorage.setItem('rest-id', id);
}

makeRequest();
</script>
	
<div class="rest-api">
	<div>
		<div class="mdc-typography--headline5">REST API</div>
		<div class="controls" class:controls-no-id="{!allowsID}">
			<div class="control-field">
				<Select style="width: 15em" value={endpoint} label="Endpoint" on:SMUISelect:change={event => endpoint = event.detail.value}>
					<Option value={'employers'}>employers</Option>
					<Option value={'myself'}>myself</Option>
					<Option value={'projects'}>projects</Option>
					<Option value={'project-tags'}>project-tags</Option>
					<Option value={'tags'}>tags</Option>
				</Select>	
			</div>
			{#if allowsID}
			<div class="control-field">
				<Textfield style="width: 20em" bind:value={id} label="id">
					<HelperText slot="helper">{helperText[endpoint]} (optional)</HelperText>
				</Textfield>	
			</div>
			{/if}
		</div>
		<Button on:click={makeRequest} variant="raised">
			<Label>Request</Label>
		</Button>
	</div>
	{#if data}
		<div class="mdc-typography--headline5">Response data for {lastURL}:</div>
		<pre class="data">{JSON.stringify(data, null, '  ')}</pre>
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
	
	pre.data {
		flex-grow: 1;
		width: 100%;
		overflow: auto;
		border: 1px black solid;
		padding: 5px;
	}
</style>
