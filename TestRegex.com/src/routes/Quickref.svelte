<script>
    import {quickref} from "$lib/reference_data.js";
    import {flavor} from "$lib/stores.js";
    import Item from "./Item.svelte";

    $: selectedCategoryItems = getCategoryData("all");


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
        selectedCategoryItems = items;
        return items;
    }


    function updateCategory(event){
        getCategoryData(event.target.id);
    }
    function highlighter(item){
        highlightItem = item;
    }
    $:  highlightItem = undefined;
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
                <input type="text" placeholder="Search..." spellcheck="false">
                <button class="item" id="all" on:click={e => updateCategory(e)}>All tokens</button>
                {#each Object.keys(quickref) as category}
                    <button class="item" id={category} on:click={e => updateCategory(e)}>
                        {category}
                    </button>
                {/each}
            </div>
            <div class="results">
                {#each selectedCategoryItems as item}
                    <button class="result-item" on:click={e => {highlighter(item)}}>
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
        background-color: var(--body-tertiary);
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
        color:mediumseagreen;
        white-space: nowrap;
        flex-shrink: 1;
    }
</style>