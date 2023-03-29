<script>
import {flavor} from "$lib/stores.js";
import {FLAVORS} from  "$lib/data.js";
import Icon from '@iconify/svelte';

function className(available_flavour){
    if (available_flavour == $flavor){
        return "code";
    }
    return "code-hide";
}
</script>

<div>
    <h2>Flavour</h2>
    <div class="container">
        {#each Object.keys(FLAVORS) as available_flavour}
            <span class="{className(available_flavour)}">
                <Icon class="icon" icon="carbon:{className(available_flavour)}"/>
                {available_flavour}
            </span>
        {/each}
    </div>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 6px;
        user-select: none;
    }
    .container {
        background-color: var(--primary);
        padding: 6px;
    }
    
    span {
        padding: 3px;
        color: var(--secondary-text-color);
        cursor: pointer;
    }
    .icon {
        color: var(--secondary-text-color);
        margin-right: 3px;
        vertical-align: text-top;
    }
    .code {
        border: 1px solid var(--checked-border-color);
        border-radius: 3px;
    }
    .code-hide {
        border: 1px solid var(--unchecked-border-color);
        border-radius: 3px;
    }
</style>