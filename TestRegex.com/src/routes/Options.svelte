<script>
    export let showFlags = false;
    import {delimiter, flags, flavor} from "$lib/stores.js";
    import {FLAVORS} from "$lib/data.js"
    let flavorObj = FLAVORS[$flavor];
    

    function setDelimiter(updatedDelimiter) {
        $delimiter = updatedDelimiter;
        available_delimiters = available_delimiters;
    }

    function setFlags(updateFlag) {
        updateFlag = Object.keys(updateFlag)[0];
        if ($flags.includes(updateFlag)) {
            $flags = $flags.filter(e => e !== updateFlag);
        }else {
            $flags.push(updateFlag);
            $flags = $flags
        }
        available_flags = FLAVORS[$flavor].flags;
    }

    function checkedFlag(flag){
        if ($flags.includes(Object.keys(flag)[0])){
            return "checked";
        }else {
            return "unchecked";
        }
    }

    function checkedDelimiter(delim){
        if ($delimiter === delim){
            return "checked";
        } else {
            return "unchecked";
        }
    }

    $: available_flags = FLAVORS[$flavor].flags;
    $: available_delimiters= FLAVORS[$flavor].delimiters;
</script>

<span class="container">
    <span class="dropbtn">{flavorObj.start}{$delimiter}</span>
    <div class="dropdown-content">
        {#each available_delimiters as availableDelimiter }
            <span on:keypress on:click={e => {setDelimiter(availableDelimiter)}} class={checkedDelimiter(availableDelimiter)}>
                {availableDelimiter}
            </span>
        {/each}
    </div>
</span>

{#if showFlags === true}
    <span class="container">
        <span class="dropbtn">
            {$flags.join("")}
        </span>
        <div class="dropdown-content">
            {#each available_flags as availableFlag }
                <span on:keypress on:click={e=> {setFlags(availableFlag)}} class={checkedFlag(availableFlag)} id="flag">
                    <span id="flag" class="full">{availableFlag[Object.keys(availableFlag)[0]].full}</span>
                    <span>{availableFlag[Object.keys(availableFlag)[0]].desc}</span>
                </span>
            {/each}
        </div>
    </span>
{/if}

<style>
    .checked {background-color: greenyellow;}
    .checked:hover {background-color: rgba(172, 255, 47, 0.49);}
    .unchecked:hover { background-color: #f1f1f162;}
    .unchecked {background-color: var(--body-tertiarry);}

    .dropbtn {
        padding: 0px 12px;
        font-size: x-large;
        border: none;
        cursor: pointer;
    }


    .dropdown-content {
        border: 1px solid var(--border-color);
        display: none;
        position: absolute;
        background-color: var(--body-secondary);
        z-index: 1;
        word-wrap: break-word;
        box-shadow: 0 0 10px 3px rgb(0 0 0 / 50%);
        border-radius: 3px;
        max-height: 30rem;
        white-space:wrap;
        overflow:auto;
        max-width: 15rem;
    }
    
    .dropdown-content span {
        color: black;
        padding: 6px 6px;
        font-size: x-large;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }

    .dropdown-content #flag {
        display: block;
        justify-content: left;
    }

    .container:hover .dropdown-content { display: block;}

    .full { font-weight: bold; }
</style>