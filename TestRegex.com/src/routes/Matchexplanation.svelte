<script>
    import { JsonView } from '@zerodevx/svelte-json-view';
    import {MatchAstTree, status_color} from "$lib/stores.js";

    let textColors = {
        "--match-status-color":  "--jsonValStringColor: var(--senary);",
        "--base-status-color":  "--jsonValStringColor: var(--senary);",
        "--error-status-color": "--jsonValStringColor: var(--error-status-color);"
    };

</script>

<div class="right-container">
    <h2>
        Explanation
    </h2>
    <div class="tree-container" style="{textColors[$status_color]}">
        {#if Object.keys($MatchAstTree).length == 0}
            <span class="base">An explanation will automatically be generated about your regex expression.</span>
        {:else}
            <JsonView json={$MatchAstTree}/>
        {/if}
    </div>
</div>
<style>
    h2 {
        margin: 0px;
    }
    
    .tree-container{
        overflow-y: auto;
    }
</style>
