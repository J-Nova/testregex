<script>
    import {quickref} from "$lib/reference_data.js";
    export let flavor = "PCRE";
    let infoToggle = false;
    let toggleForm = false;
    let height = "auto";

    $: selectedCategoryItems = getCategoryData("all");


    function getCategoryData(categoryKey){
        let items = [];
        if (categoryKey === "all") {
            Object.entries(quickref).forEach(([key, _]) => {
                Object.entries(quickref[key]).forEach(([_, value]) => {
                    if (value.flavors.includes(flavor)) {
                        items.push(value);
                    }
                });
            }); 
        } else {
            Object.entries(quickref[categoryKey]).forEach(([_, value]) => {
                if (value.flavors.includes(flavor)) {
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

    function toggle(){
        toggleForm = !toggleForm
        if (toggleForm) height = "100%";
        else height = "auto";
    }

</script>

<div class="right-container" style="height: {height};">
    <button on:click={toggle} class="right">
        <h2>
            <span>Lookup</span>
        </h2>
    </button>
    {#if toggleForm}
        <div id="lookup">
            <div class="categories">
                <ul>
                    <li><input type="text" placeholder="Search..." spellcheck="false"></li>
                    <li><button id="all" on:click={e => updateCategory(e)}>All tokens</button></li>
                    {#each Object.keys(quickref) as category}
                        <li>
                            <button id={category} on:click={e => updateCategory(e)}>{category}</button>
                        </li>
                    {/each}
                </ul>
            </div>

            <div class="results">
                <ul>
                    {#each selectedCategoryItems as item}
                        <button class="item" on:click={() => (infoToggle = !infoToggle)}>
                            <div class="token">{item.token}</div>
                            <div class="desc">{item.desc}</div>
                            <div class="info">{item.info}</div>
                        </button>
                    {/each}        
                </ul>
            </div>
        </div>
    {/if}
</div>

<style>
    #lookup {
        display: flex;
        flex-direction: row;
    }

    .categories {
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
    }

    .results {
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        padding:10px;
    }

    .item{
        display: flex;
        flex-direction: row;
        margin: 5px;
        padding: 5px;
        justify-content: space-between;
        background-color: inherit;
        border: none;
        width: 100%;
    }

    .item:hover {
        background-color: var(--body-tertiary);
    }
    
    .item .token{
        color:mediumseagreen;
    }
    
    .item .desc {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    
    .item .info {
        display: none;
        position: relative;
        top:0;
        left:0;
    }

</style>