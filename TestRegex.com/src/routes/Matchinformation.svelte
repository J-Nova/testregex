<script>
    import {delimiter, flags, editor_status, expressionString, testString, status, information_message, match_data_list, MatchAstTree, matchTextColor, editorLockTimeout, flavor} from "$lib/stores.js";
    let toggleForm = false;
    let height = "auto";

    function toggle(){
        toggleForm = !toggleForm
        if (toggleForm) height = "100%";
        else height = "auto";
    }

</script>

<div class="right-container" style="height: {height};"> 
    <button on:click={toggle} class="right">
        <h2>
            <span>Information</span>
        </h2>
    </button>
    {#if toggleForm}
        <div id="information">
            {#if typeof $information_message == "string"}
                <span>{$information_message}</span>
            {:else}
                {#each $match_data_list as match}
                    {#if match.start !== undefined}
                    <div class="match">
                        <div>Match {(parseInt(match.matchNumber)+1)}</div>
                        <div>{match.start}-{match.end}</div>
                        <div>{match.content}</div>
                    </div>
                    {/if}
                {/each}
            {/if}
        </div>
    {/if}
</div>

<style>
    .match {
        display: flex;
        flex-direction: row;
        margin: 5px;
        padding:5px;
        gap: 5px;
        background-color: var(--body-quaternary);
        width: auto;
    }

    .match div:nth-child(2){
        border: 0px;
        border-right: 1px solid;
        padding-right: 5px;
    }

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