<script>
import Icon from '@iconify/svelte';

</script>

<div>
    <h2>Tools</h2>
    <div class="container">
        <span class="tool">
            <Icon class="icon" icon="carbon:save"/>
            Save
        </span>
        <span class="tool">
            <Icon class="icon" icon="carbon:edge-node"/>
            Code generator
        </span>
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
    .tool {
        border: 1px solid var(--border-color);
        border-radius: 3px;
        color: var(--secondary-text-color);
        padding:3px;
    } 

</style>