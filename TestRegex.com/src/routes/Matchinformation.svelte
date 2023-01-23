<script>
    export let match_html;
    export let informationMessage;
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
            {#if typeof informationMessage == "string"}
                <span>{informationMessage}</span>
            {:else}
                {#each match_html as match}
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