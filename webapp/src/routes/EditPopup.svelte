<style>
    input, button{
		border: 1px solid var(--tertiary);
		border-radius: 3px;
	}
</style>



<script>
    import { editor } from "$lib/stores.js";
</script>

<div class="container">
    <span>
        <p>Lock timeout:</p>
        <input type="number" bind:value={$editor.editorLockTimeout}>
    </span>
    <span>
        <p>Execution timeout:</p>
        <input type="number" bind:value={$editor.matchTimeout}>
    </span>
    <span>
        <p>Explain timeout:</p>
        <input type="number" bind:value={$editor.explainTimeout}>
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