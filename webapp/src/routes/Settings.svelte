<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 6px;
		user-select: none;
	}
	.container {
		background-color: var(--primary);
		padding: 6px;
	}
	span {
		display: flex;
		flex-direction: column;
		height: fit-content;
	}
	button{
		border: 1px solid var(--tertiary);
		border-radius: 3px;
	}
</style>

<script>
	import { editor } from "$lib/stores.js";
	import Modal from "svelte-simple-modal";
	import EditPopup from "./EditPopup.svelte";

	$: popup = undefined;
</script>

<Modal show={popup}/>

<div>
	<h2>Settings</h2>
	<div class="container">
		<span>
			Lock timeout: {$editor.editorLockTimeout}
		</span>

		<span>
			Execution timeout: {$editor.matchTimeout}
		</span>

		<span>
			Explain timeout: {$editor.explainTimeout}
		</span>

		<span>
			Show tooltips: {$editor.showToolTips}
		</span>
		
		<span>
			Visualize special characters: {$editor.visualizeSpecialCharacters}
		</span>
		
		<button on:click={_ => {popup = EditPopup}}>Edit settings</button>
	</div>
</div>
