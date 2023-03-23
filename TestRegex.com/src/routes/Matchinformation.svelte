<script>
    import {information_message, match_data_list} from "$lib/stores.js";
</script>

<div class="right-container">
    <h2>
        Information
    </h2>
    <div class="info-container">
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
</div>

<style>
    h2 {
        margin: 0px;
    }
    
    .info-container {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .match {
        display: flex;
        flex-direction: row;
        padding:5px;
        gap: 5px;
        background-color: var(--body-quaternary);
        width: 100%;
        height: fit-content;
    }

    .match div:nth-child(2){
        border: 0px;
        border-right: 1px solid;
        padding-right: 5px;
    }

</style>