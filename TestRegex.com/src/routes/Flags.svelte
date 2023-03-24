<script>
    import {flags, flavor} from "$lib/stores.js";
    import {FLAVORS} from "$lib/data.js"

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

    $: available_flags = FLAVORS[$flavor].flags;

</script>

<span class="container">
    <span class="dropbtn">
        {$flags.sort().join("")}
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

<style>
    .checked {
        border: 1px solid var(--checked-border-color);
        border-radius: 3px;
        color: var(--primary-text-color);
    }
    
    .unchecked {
        border: 1px solid var(--unchecked-border-color);
        border-radius: 3px;
        color: var(--primary-text-color );
    }

    .checked:hover, .unchecked:hover { 
        background-color: var(--highlight-color)
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
        user-select: none;
    }

    .dropdown-content #flag {
        display: block;
        padding: 2px;
        border-radius: 3px;
    }

    .container:hover .dropdown-content { 
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }

    .dropbtn {
        padding: 0px 12px;
        font-size: x-large;
        border: none;
        cursor: pointer;
        color: var(--flag-color);
    }

    .full { font-weight: bold; }
</style>