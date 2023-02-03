<script>
    import { JsonView } from '@zerodevx/svelte-json-view';
    import {MatchAstTree, matchTextColor} from "$lib/stores.js";

    let toggleForm = false;
    let height = "auto";
    let textColors = {
        "base":  "--jsonValStringColor: #059669",
        "error": "--jsonValStringColor: #b54d4d"
    };

    function toggle(){
        toggleForm = !toggleForm
        if (toggleForm) height = "100%";
        else height = "auto";
    }

</script>

<div class="right-container" style="height: {height};">
    <button on:click={toggle} class="right">
        <h2>
            <span>Explanation</span>
        </h2>
    </button>
    {#if toggleForm}
        <div id="explanation" style="{textColors[$matchTextColor]}">
            {#if Object.keys($MatchAstTree).length == 0}
                <span>An explanation will automatically be generated about your regex expression.</span>
            {:else}
                <JsonView json={$MatchAstTree} />
            {/if}
        </div>
    {/if}
</div>

<style>
    .right-container {
        height: auto;
        background-color: var(--body-secondary);
        padding: 5px;
    }
    button.right {
        background-color: inherit;
        border: none;
        color: inherit;
        cursor: pointer;
        margin: 0;
        padding: 0;
        text-align: inherit;
        width: 100%;
        border-bottom: 1px solid var(--body-quaternary) ;
    }
</style>