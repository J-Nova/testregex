<script>
// @ts-nocheck
    import ToolTip from "./MatchTooltip.svelte";
    import { createEventDispatcher } from 'svelte';
    import {editor, test, match_data} from "$lib/stores.js";
    const dispatch = createEventDispatcher();

    let testBackdrop;
    let testTextArea;

    function unlockEditor(focus){
        testTextArea.disabled = false;
        testTextArea.style.display = "block"
        if (focus)testTextArea.focus(), testTextArea.setSelectionRange(-1, -1);
    }

    function lockEditor(lock){
        if (!testTextArea || $test.test_string.length == 0) return;
        if (!lock) {unlockEditor(false); return;}
        testTextArea.style.display = "none";
        testTextArea.disabled = true;
    }

    $: _ = (lockEditor($editor.test_lock));

</script>
<div class="heading">
    <h2>test data</h2>
</div>

<div class="container">
    <pre
        bind:this={testBackdrop}
        on:dblclick={unlockEditor}
    >
        <div class="custom-area">
            {#if $match_data.expression_highlight.length >= 1 && $test.expression.length >= 1}
                {#each $match_data.test_highlight as match}
                    <ToolTip match={match}/>
                {/each}
            {/if}
        </div>
    </pre>

    <textarea
        bind:this={testTextArea}
        bind:value={$test.test_string}
        on:input={_ => (dispatch("update", false))}
        on:scroll={_ => {testBackdrop.scrollTop = testTextArea.scrollTop;}}
        spellcheck="false" 
        autocomplete="off" 
        translate="no" 
        placeholder="Insert your test data here"
    ></textarea>
</div>

<style>
    .container {
        margin-bottom: 10px;
        width: 100%;
        position: relative;
        border-radius: 3px;
        border: 1px solid var(--border-color);
        box-shadow: 0 0 10px 3px rgb(0 0 0 / 20%);
        background-color: var(--primary);
        overflow-y: hidden;
    }
</style>