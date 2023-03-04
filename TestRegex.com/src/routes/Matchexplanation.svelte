<script>
    import { JsonView } from '@zerodevx/svelte-json-view';
    import {MatchAstTree, matchTextColor} from "$lib/stores.js";

    let textColors = {
        "base":  "--jsonValStringColor: #059669",
        "error": "--jsonValStringColor: #b54d4d"
    };

</script>

<div class="right-container">
    <h2>
        Explanation
    </h2>
    <div class="tree-container" style="{textColors[$matchTextColor]}">
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
