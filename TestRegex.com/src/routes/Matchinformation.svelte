<script>
    let informationButton;
    export let match_html;
    export let informationMessage;
    function showHide() {
        if (document.getElementById(informationButton).style.display == "none") {
            document.getElementById(informationButton).style.display = "block";
        } else {
            document.getElementById(informationButton).style.display = "none";
        }
    }
</script>

<div class="information"> 
    <button on:click={showHide} class="headingButton" bind:this={informationButton}>
        <h2>
            <span>Information</span>
        </h2>
    </button>
    <div id="information">
        {#if typeof informationMessage == "string"}
            <span>{informationMessage}</span>
        {:else}
            {#each match_html as match}
                {#if match.start !== undefined}
                <div class="detailed-match">
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
    .detailed-match {
        display: flex;
        flex-direction: row;
        margin: 5px;
        padding:5px;
        gap: 5px;
        background-color: var(--body-quaternary);
        width: auto;
    }

    .detailed-match div:nth-child(2){
        border: 0px;
        border-right: 1px;
        border-style: solid;
        padding-right: 3px;
    }

    div.information {
        height: auto;
        background-color: var(--body-secondary);
        padding: 5px;
    }

    #explanation, #information, #lookup {
        max-height: 35vh;
        overflow-y: auto;
    }
</style>