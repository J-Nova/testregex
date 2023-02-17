<script>
    import {delimiter, flags, editor_status, expressionString, testString, status, information_message, match_data_list, MatchAstTree, matchTextColor, editorLockTimeout, flavor} from "$lib/stores.js";
    let toggleForm = false;
    let height = "auto";

    function toggle(){
        toggleForm = !toggleForm
    }

</script>

<div class="right-container"> 
    <button on:click={toggle} class="toggle">
        <h2>
            Information
        </h2>
    </button>
    {#if toggleForm}
        <div class="right-data-container">
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

</style>