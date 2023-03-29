<script>
    import {delimiter, flavor} from "$lib/stores.js";
    import {FLAVORS} from "$lib/data.js"
    let flavorObj = FLAVORS[$flavor];
    

    function setDelimiter(updatedDelimiter) {
        $delimiter = updatedDelimiter;
        available_delimiters = available_delimiters;
    }

    function checkedDelimiter(delim){
        if ($delimiter === delim){
            return "checked";
        } else {
            return "unchecked";
        }
    }

    $: available_delimiters = FLAVORS[$flavor].delimiters;
</script>

<span class="container">
    <span class="dropbtn">
        <span>{flavorObj.start}</span>
        <span class="delimiter">{$delimiter}</span>
    </span>
    <div class="dropdown-content">
        {#each available_delimiters as availableDelimiter }
            <span on:keypress on:click={_ => {setDelimiter(availableDelimiter)}} class={checkedDelimiter(availableDelimiter)}>
                {availableDelimiter}
            </span>
        {/each}
    </div>
</span>

<style>
    .checked {
        border: 1px solid var(--checked-border-color);
        border-radius: 3px;
        color: var(--checked-text-color);
    }
    
    .unchecked {
        border: 1px solid var(--unchecked-border-color);
        border-radius: 3px;
        color: var(--unchecked-text-color);
    }

    .delimiter {
        padding-top: 2px;
    }

    .checked:hover, .unchecked:hover { 
        background-color: var(--highlight-color)
    }

    .dropbtn {
        padding: 0px 12px;
        font-size: x-large;
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        gap: 10px;
        height: 100%;
    }


    .dropdown-content {
        border: 1px solid var(--border-color);
        display: none;
        position: absolute;
        background-color: var(--secondary);
        z-index: 1;
        word-wrap: break-word;
        box-shadow: 0 0 10px 3px rgb(0 0 0 / 50%);
        border-radius: 3px;
        max-height: 30rem;
        overflow:auto;
        max-width: 15rem;
    }
    
    .dropdown-content span {
        padding: 6px 6px;
        font-size: x-large;
        display: flex;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        color: var(--primary-text-color);
    }


    .container:hover .dropdown-content {     
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 4px;
    }

    .full { font-weight: bold; }
</style>