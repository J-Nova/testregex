<style>
	button {
		border: 1px solid var(--tertiary);
		border-radius: 3px;
	}
</style>

<script>
	// @ts-nocheck

	import Modal from "svelte-simple-modal";
	import EditPopup from "./EditPopup.svelte";
	$: popup = undefined;
</script>

<Modal show={popup} />

<div class="flex flex-col gap-1 select-none">
	<button
		on:click={_ => {
			popup = EditPopup;
		}}>Edit settings</button
	>
</div>
