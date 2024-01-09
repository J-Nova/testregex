<style>
	input,
	button {
		border: 1px solid var(--tertiary);
		width: 30%;
	}

	span {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		width: 100%;
		justify-content: space-between;
	}
</style>

<script>
	import { editor } from "$lib/stores.js";
</script>

<div class="flex flex-col gap-3 items-start justify-center m-10">
	<span>
		<p>Execution timeout:</p>
		<input class="rounded" type="number" bind:value={$editor.matchTimeout} />
	</span>
	<span>
		<p>Explain timeout:</p>
		<input class="rounded" type="number" bind:value={$editor.explainTimeout} />
	</span>
	<span>
		<p>Show tooltips:</p>
		<button
			class="rounded"
			on:click={_ => {
				$editor.showToolTips = !$editor.showToolTips;
			}}>{$editor.showToolTips}</button
		>
	</span>
	<span>
		<p>Visualize special characters:</p>
		<button
			class="rounded"
			on:click={_ => {
				$editor.visualizeSpecialCharacters = !$editor.visualizeSpecialCharacters;
			}}>{$editor.visualizeSpecialCharacters}</button
		>
	</span>
</div>
