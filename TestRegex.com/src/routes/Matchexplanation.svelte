<script>
    import { JsonView } from '@zerodevx/svelte-json-view';
    let toggleForm = false;
    let height = "auto";
    export let json;
    export let matchColor = "base";
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
        <div id="explanation" style="{textColors[matchColor]}">
            {#if Object.keys(json).length == 0}
                <span>An explanation will automatically be generated about your regex expression.</span>
            {:else}
                <JsonView {json} />
            {/if}
        </div>
    {/if}
</div>