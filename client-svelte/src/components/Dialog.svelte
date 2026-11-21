<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		closedby?: 'any' | 'closerequest' | 'none';
		cssClass?: string;
		modal?: boolean;
		onbeforeopen?: () => {};
		onclose?: () => {};
		onopen?: () => {};
		open?: boolean;
		title?: string;
	}

	let {
		children,
		closedby = 'any',
		cssClass = '',
		modal = false,
		onbeforeopen,
		onclose,
		onopen,
		open = $bindable(false),
		title = '',
	}: Props = $props();

	// svelte-ignore non_reactive_update
	let dialogElement: HTMLDialogElement;

	$effect(() => {
		if (!!open === !!dialogElement?.open) {
			return;
		}
		if (open) {
			if (modal) {
				dialogElement?.showModal();
			} else {
				dialogElement?.show();
			}
		} else {
			dialogElement?.close();
		}
	});

	export const close = () => {		
		open = false;
	};

	export const show = () => {
		open = true;
	};

	const internalOnClosed = () => {
		open = false;
		onclose?.();
	}

	const onbeforetoggle = (event: ToggleEvent) => {
		if (event.newState === 'open') {
			onbeforeopen?.();
		}
	}

	const ontoggle = (event: ToggleEvent) => {
		if (event.newState === 'open') {
			onopen?.();
		}
	}
</script>

{#if open}
	<dialog
		bind:this={dialogElement}
		class={cssClass}
		{closedby}
		onbeforetoggle={onbeforetoggle}
		onclose={internalOnClosed}
		ontoggle={ontoggle}
	>
		<div class="demo-dialog w-full h-full flex flex-col items-center p-4">
			{#if title}
				<h2 class="text-lg font-bold mb-4">{title}</h2>
			{/if}
			{@render children?.()}
		</div>
	</dialog>
{/if}
