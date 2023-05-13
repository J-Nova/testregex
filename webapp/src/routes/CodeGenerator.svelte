<script>
    import Icon from '@iconify/svelte';
    import {FLAVORS} from "$lib/data.js";
    import {generation} from "$lib/codeTemplate.js";
    import {test} from "$lib/stores.js";

    
    function generate(flavor){
        code = generation($test.expression, $test.testString, flavor);
    }
    $: flavors = Object.keys(FLAVORS)
    $: code = "Select one of the flavours to generate code."
</script>


<div class="popup">
    <div class="header-container">
        <h1>Code generator</h1>
    </div>

    <div class="content">
        <div class="flavor">
            {#each flavors as availableFlavor}
                <span on:keydown on:click={_=> generate(availableFlavor)} class="flavor-item">
                    <Icon icon="carbon:code"/>
                    {availableFlavor}
                </span>
            {/each}
        </div>
        
    
            <textarea class="code" 
            spellcheck="false"
            autocomplete="off"
            translate="no"
            placeholder="Select one of the flavours to generate code."
            bind:value={code}/>
            
    </div>    
</div>


<style>
    .popup {
        display: flex;
        flex-direction: column;
        gap: 6px;
        height: 100%;
        width: 100%;
    }

    .header-container {
        padding: 6px;
    }

    .content {
        display: flex;
        flex-direction: row;
        gap: 6px;
        flex-grow: 1;
    }

    .flavor {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 6px;
        height: fit-content;
        width: 15%;
    }

    .flavor-item {
        border-radius: 3px;
        border: 1px solid var(--border-color);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5%;
    }

    .flavor-item:hover {
        background-color: var(--highlight-color);
        border-radius: 3px;
    }

    .code {
        width: 100%;
        height: auto;
        background-color: var(--secondary-text-color) !important;
        color: var(--primary-text-color) !important;
        position: relative;
        resize: none;
        border-radius: 3px;
        cursor: text;
    }

    span {
        padding: 3px;
        color: var(--secondary-text-color);
        cursor: pointer;
        width: 100%;
        user-select: none;
    }

    ::-webkit-scrollbar {
        border-radius: 8px;
        width: 18px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 8px;
        border: 2px solid var(--secondary);
    }
</style>