<script>
    import {quickref} from "$lib/reference_data.js";
    $:  selectedCategory = "all";
    let lookupButton;
    export let flavor = "PCRE";
    
    function updateCategory(event){
        selectedCategory = event.target.id
    }

    function showHide() {
        if (document.getElementById(lookupButton).style.display == "none") {
            document.getElementById(lookupButton).style.display = "block";
        } else {
            document.getElementById(lookupButton).style.display = "none";
        }
    }


</script>

<div class="lookup">
    <button on:click={showHide} class="headingButton" bind:this={lookupButton}>
        <h2>
            <span>Lookup</span>
        </h2>
    </button>
    <div id="lookup">
        <div class="categories">
            <input type="text" placeholder="Search..." spellcheck="false">
            <ul>
                <button class="quickref-button" id="all" on:click={e => updateCategory(e)}>All tokens</button>
                {#each Object.keys(quickref) as category}
                    <li>
                        <button class="quickref-button" id={category} on:click={e => updateCategory(e)}>{category}</button>
                    </li>
                {/each}
            </ul>
        </div>

        <div class="data">
            <ul>
                {#if selectedCategory == "all"}
                    {#each Object.keys(quickref) as key}
                        {#each quickref[key] as item }
                            {#if item.flavors.includes(flavor)}
                            <button class="category-container">
                                <div>{item.token}</div>
                                <div>{item.desc}</div>
                            </button>
                            {/if}
                            <!-- <div>{item.info}</div> -->
                            <!-- TODO optimize this by moving it into a function -->
                            <!-- TODO show the item info when clicking on a token -->
                        {/each}        
                    {/each}
                {:else}
                    {#each quickref[selectedCategory] as item }
                        {#if item.flavors.includes(flavor)}
                        <button class="category-container">
                            <div>{item.token}</div>
                            <div>{item.desc}</div>
                        </button>
                        {/if}
                        <!-- <div>{item.info}</div> -->
                    {/each}
                {/if}
            </ul>
        </div>
    </div>
</div>

<style>
    .category-container{
        display: flex;
        flex-direction: row;
        margin: 5px;
        padding: 5px;
        justify-content: space-between;
        background-color: inherit;
        border: none;
        width: 100%;
    }

    .category-container:hover {
        background-color: var(--body-tertiary);
    }

    #lookup {
        display: flex;
        flex-direction: row;
    }
</style>