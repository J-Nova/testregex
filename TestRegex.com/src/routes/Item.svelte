<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let item;
    $: info = item.info;
    $: desc = item.desc;
    $: token = item.token;
</script>

    <card class="container">
        <div class="heading">
            <span>{desc}</span>
            <span on:keydown on:click={e => {dispatch("closeHighlight");}} class="close">Close</span>
        </div>

        <div class="information">
            <span class="token">{token}</span>
            <span class="info">{info}</span>
        </div>
    </card>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .heading{
        display: flex;
        justify-content: space-between;
        padding:0.5rem;
        background-color: var(--body-tertiary);
        align-items: center;
    }

    .close {
        width: 4rem;
        height: 2rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--border-color);
        border-radius: 2px;
    }
    
    .close:hover{
        background-color: var(--body-secondary);
    }

    .information{
        border: 1px solid var(--border-color);
        width : 100%;
        height: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .token {
        color: springgreen;
    }
</style>