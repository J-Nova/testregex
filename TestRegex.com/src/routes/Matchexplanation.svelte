<script>
    import { JsonView } from '@zerodevx/svelte-json-view';
    let toggle = false;
    export let json;
    export let selectedColor = "base";
    let textColors = {
        "base":  "--jsonValStringColor: #059669",
        "error": "--jsonValStringColor: #b54d4d"
    }

</script>

<div class="explanation">
    <button on:click={() => (toggle = !toggle)} class="headingButton">
        <h2>
            <span>Explanation</span>
        </h2>
    </button>
    <div id="explanation" style="{textColors[selectedColor]}">
        {#if Object.keys(json).length == 0}
            <span>An explanation will automatically be generated about your regex expression.</span>
        {:else}
            <JsonView {json} />
        {/if}
    </div>
</div>

<style>

.headingButton {
        background-color: inherit;
        border: none;
        color: inherit;
        cursor: pointer;
        margin: 0;
        padding: 0;
        text-align: inherit;
        width: 100%;
    }

    #explanation {
        max-height: 35vh;
        overflow-y: auto;
    }

    div.explanation {
        height: auto;
        background-color: var(--body-secondary);
        padding: 5px;
    }

</style>