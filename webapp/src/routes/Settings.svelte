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
</style>

<script>
	import { editor } from "$lib/stores.js";
</script>

<div>
	<h2>Settings</h2>
	<div class="container">
		<span>
			<p>Editor lock time-out:</p>
			<input type="number" bind:value={$editor.editorLockTimeout}>
		</span>
		<span>
			<p>Show tooltips:</p>
			<button on:click={e =>{$editor.showToolTips = !$editor.showToolTips}}>{$editor.showToolTips}</button>
		</span>
		<span>
			<p>Visualize special characters:</p>
			<button on:click={e =>{$editor.visualizeSpecialCharacters = !$editor.visualizeSpecialCharacters}}>{$editor.visualizeSpecialCharacters}</button>
		</span>
	</div>
</div>
