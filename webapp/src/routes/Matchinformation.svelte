<script>
    import {match_data} from "$lib/stores.js";
</script>

<div class="right-container">
    <h2>
        Information
    </h2>
    <div class="info-container">
        {#if $match_data.test_highlight.length == 0}
            <span>{$match_data.information}</span>
        {:else}
            {#each $match_data.test_highlight as match}
                <div class="match">
                    {#if match.group_num !== undefined && match.group_num !== 0}
                        <div>{`Group (${match.group_num}) ${match.group_name}`}</div>
                    {:else}
                        <div>Match {match.match_num}</div>
                    {/if}
                    <div>{match.start}-{match.end}</div>
                    <div>{match.content}</div>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
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
        background-color: var(--highlight-color);
        width: auto;
        height: fit-content;
        border-radius: 3px;
        margin-right: 6px;
    }

    .match div:nth-child(2){
        border: 0px;
        border-right: 1px solid;
        padding-right: 5px;
    }

</style>