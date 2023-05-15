<style>
	input,
	button {
		border: 1px solid var(--tertiary);
		border-radius: 3px;
		width: 30%;
	}

	span {
		display: flex;
		flex-direction: row;
		gap: 5%;
		width: 100%;
		justify-content: space-between;
	}
	div.container {
		display: flex;
		flex-direction: column;
		gap: 12px;
		align-items: flex-start;
		justify-content: center;
	}
</style>

<script>
	import { editor } from "$lib/stores.js";
</script>

<div class="container">
	<span>
		<p>Lock timeout:</p>
		<input type="number" bind:value={$editor.editorLockTimeout} />
	</span>
	<span>
		<p>Execution timeout:</p>
		<input type="number" bind:value={$editor.matchTimeout} />
	</span>
	<span>
		<p>Explain timeout:</p>
		<input type="number" bind:value={$editor.explainTimeout} />
	</span>
	<span>
		<p>Show tooltips:</p>
		<button
			on:click={_ => {
				$editor.showToolTips = !$editor.showToolTips;
			}}>{$editor.showToolTips}</button
		>
	</span>
	<span>
		<p>Visualize special characters:</p>
		<button
			on:click={_ => {
				$editor.visualizeSpecialCharacters = !$editor.visualizeSpecialCharacters;
			}}>{$editor.visualizeSpecialCharacters}</button
		>
	</span>
</div>
