<script>
// @ts-nocheck
    import {quickref} from "$lib/reference_data.js";
    import {flavor} from "$lib/stores.js";
    import Item from "./Quickref-item.svelte";

    function getCategoryData(categoryKey){
        let items = [];
        if (categoryKey === "all") {
            Object.entries(quickref).forEach(([key, _]) => {
                Object.entries(quickref[key]).forEach(([_, value]) => {
                    if (value.flavors.includes($flavor)) {
                        items.push(value);
                    }
                });
            }); 
        } else {
            Object.entries(quickref[categoryKey]).forEach(([_, value]) => {
                if (value.flavors.includes($flavor)) {
                    items.push(value);
                }
            });
        }
        selectedItems = items;
        return items;
    }

    function getSearchData(searchString){
        let items = []
        Object.entries(quickref).forEach(([_, cr_items]) => {
                cr_items.forEach((item) => {
                    if (
                        item.flavors.includes($flavor) && 
                        (item.desc.includes(searchString) || item.info.includes(searchString))) 
                        { items.push(item); }
                });
            });
            selectedItems = items;
        return items;
    }

    function search(){
        if (searchString.length > 0) {
            getSearchData(searchString);
        }
        else {
            getCategoryData("all")
        }
    }

    function updateCategory(event){
        getCategoryData(event.target.id);
    }

    function highlighter(item){
        highlightItem = item;
    }
    $: selectedItems = getCategoryData("all");
    $: highlightItem = undefined;
    let searchString = undefined;
</script>

<div class="right-container">
    {#if highlightItem !== undefined}
            <Item item={highlightItem} on:closeHighlight={e => {highlightItem = undefined}}/>
    {:else}
        <h2>
            Lookup
        </h2>
        <div class="quickref">
            <div class="category">
                <input type="text" placeholder="Search..." spellcheck="false" on:keyup={search} bind:value={searchString}>
                <button class="item" id="all" on:click={updateCategory}>All tokens</button>
                {#each Object.keys(quickref) as category}
                    <button class="item" id={category} on:click={updateCategory}>
                        {category}
                    </button>
                {/each}
            </div>
            <div class="results">
                {#each selectedItems as item}
                    <button class="result-item" on:click={_ => {highlighter(item)}}>
                        <div class="desc">{item.desc}</div>
                        <div class="token">{item.token}</div>
                    </button>
                {/each}        
            </div>
        </div>
    {/if}
</div>

<style>
    h2 {
        margin: 0px;
    }

    .quickref{
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow: hidden;
        height: 100%;
        flex-grow: 1;
    }

    .category, .results {
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100%;
    }

    .item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: inherit;
        border: none;
        width: 100%;
    }

    .result-item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: inherit;
        border: none;
        width: 100%;
    }

    .item:hover, .result-item:hover {
        background-color: var(--highlight-color);
        border-radius: 3px;
    }
    
    .desc {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        flex-grow: 1;
        text-align: left;
        margin-right: 10px;
    }

    .token {
        color:#3cb371;
        white-space: nowrap;
        flex-shrink: 1;
    }
</style>