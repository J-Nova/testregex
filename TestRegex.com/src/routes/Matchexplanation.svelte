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
    }

</script>

<div class="right-container">
    <button on:click={toggle} class="toggle">
        <h2>
            Explanation
        </h2>
    </button>
    {#if toggleForm}
        <div class="right-data-container" style="{textColors[$matchTextColor]}">
            {#if Object.keys($MatchAstTree).length == 0}
                <span>An explanation will automatically be generated about your regex expression.</span>
            {:else}
                <JsonView json={$MatchAstTree}/>
            {/if}
        </div>
    {/if}
</div>

<style>
    /* .right-data-container {
        height: calc(100vh/3 - 50px);
    } */
</style>