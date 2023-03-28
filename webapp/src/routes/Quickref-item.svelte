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
            <span class="description">{desc}</span>
            <span on:keydown on:click={e => {dispatch("closeHighlight");}} class="close">Close</span>
        </div>
        <div>
            <div class="information">
                <span class="token">{token}</span>
                <span>{info}</span>
            </div>
    
            <div class="example">
                <div class="container">
                    <span class="token">/{token}/g</span>
                    <span class="test">This is the test data</span>
                </div>
                <span class="load">
                    <Icon icon="carbon:arrow-right"/>
                </span>
            </div>
        </div>
    </card>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 20%;
        padding: 6px;
    }

    .token {
        color: var(--senary);
    }

    .test {
        color: var(--primary-text-color);
    }

    .header{
        display: flex;
        justify-content: space-between;
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