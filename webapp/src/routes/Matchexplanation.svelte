<script>
    import {JsonView} from '@zerodevx/svelte-json-view';
    import {editor, match_data} from "$lib/stores.js";

    let textColors = {
        "--match-status-color":  "--jsonValStringColor: var(--senary);",
        "--base-status-color":  "--jsonValStringColor: var(--senary);",
        "--no-match-status-color": "--jsonValStringColor: var(--senary);",
        "--error-status-color": "--jsonValStringColor: var(--error-status-color);"
    };

</script>

<div class="right-container">
    <h2>
        Explanation
    </h2>
    <div class="tree-container" style="{textColors[$editor.status_color]}">
        {#if $match_data.ast_tree == void 0 || Object.keys($match_data.ast_tree).length == 0}
            <span class="base">An explanation will automatically be generated about your regex expression.</span>
        {:else}
            <JsonView json={$match_data.ast_tree}/>
        {/if}
    </div>
</div>
<style>
    .tree-container{
        overflow-y: auto;
    }
</style>
