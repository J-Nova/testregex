<script>
    import {information_message, match_content} from "$lib/stores.js";
    import {generateInformation} from "$lib/explainer.js";

</script>

<div class="right-container">
    <h2>
        Information
    </h2>
    <div class="info-container">
        {#if Object.keys($match_content).length == 0}
            <span>{$information_message}</span>
        {:else}
            {#each generateInformation($match_content) as match}
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