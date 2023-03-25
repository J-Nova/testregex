<script>
    import { createEventDispatcher } from 'svelte';
    import { delimiter, flags} from "$lib/stores.js";
    import Icon from '@iconify/svelte';
    const dispatch = createEventDispatcher();
    export let item;
    $: info = item.info;
    $: desc = item.desc;
    $: token = item.token;
</script>

    <card class="container">
        <div class="header">
            <span>{desc}</span>
            <span on:keydown on:click={e => {dispatch("closeHighlight");}} class="close">Close</span>
        </div>

        <div class="information">
            <span class="token">{token}</span>
            <span class="info">{info}</span>
        </div>

        <div class="example">
            <div class="container">
                <span class="expression token">/{token}/g</span>
                <span class="test">This is the test data</span>
            </div>
            <span class="load">
                <Icon icon="carbon:arrow-right"/>
            </span>
        </div>
        
    </card>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 6px;
    }

    .token {
        color: var(--senary);
        letter-spacing: 3px;
    }

    .header{
        display: flex;
        justify-content: space-between;
        background-color: var(--body-tertiary);
        align-items: center;
        padding: 6px;
        border-bottom: 1px solid var(--border-color);
    }

    .close {
        width: 4rem;
        height: 2rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--tertiary);
        border-radius: 2px;
    }
    
    .close:hover{
        background-color: var(--highlight-color);
    }

    .example{
        border: 1px solid var(--border-color);
        border-radius: 3px;
        width : 100%;
        height: auto;
        gap: 1rem;
        background-color: var(--secondary);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .load {
        background-color: var(--tertiary);
        border-radius: 100%;
        height: 25px;
        width: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
    }
</style>