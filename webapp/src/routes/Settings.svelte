<script>
import {editorLockTimeout, showToolTips, visualizeSpecialCharacters} from "$lib/stores.js";
</script>

<div>
    <h2>Settings</h2>
    <div class="container">
        <span>Editor lock time-out: {$editorLockTimeout}</span>
        <span>Show tooltips: {$showToolTips}</span>
        <span>Visualize special characters: {$visualizeSpecialCharacters}</span>
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
</style>
