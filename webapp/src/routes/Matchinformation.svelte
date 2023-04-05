<script>
    import {information_message, match_content} from "$lib/stores.js";

    function generateInformation($match_content){
        let match_data = [];
        for (let i=0; i<$match_content.length; i++){
            let match = $match_content[i];
            for (let j=0; j<match.length; j++){
                if (match[j]){
                    let match_num = i + 1;
                    let group_name = match[j].name !== undefined ? match[j].name : "";
                    let start = match[j].start;
                    let end = match[j].end;
                    let content = match[j].content;
                    let match_info = {
                        match_num: match_num,
                        group_name: group_name,
                        start: start,
                        end: end,
                        content: content
                    }
                    match_data.push(match_info);
                }
            }
        }
        return match_data;
    }
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
                    {#if match.group_name !== undefined && match.group_name !== ""}
                        <div>Group {match.group_name}</div>
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