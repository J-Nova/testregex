<script>
// @ts-nocheck
    import ToolTip from "./MatchTooltip.svelte";
    import { createEventDispatcher } from 'svelte';
    import {editor, test, match_data} from "$lib/stores.js";
    
    const dispatch = createEventDispatcher();
    function scrollFn(){testBackdrop.scrollTop = testTextArea.scrollTop;}

    let testBackdrop;
    let testTextArea;


    function updateEditor(locking){
        if (locking){
            testBackdrop.focus();
            testTextArea.style.display = "none";
            testTextArea.disabled = true;
        } else if (testTextArea && !locking) {
            testTextArea.disabled = false;
            testTextArea.style.display = "block";
            testTextArea.focus();
            testTextArea.setSelectionRange(-1, -1);
        }
        return locking;
    }

    $: disabled_input = ($editor.test_status == 0 ? updateEditor(true) : updateEditor(false));

</script>
<div class="heading">
    <h2>test data</h2>
    <div class="editor-status">{$editor.getEditorStatus()}</div>
</div>

<div class="container">
    <pre
        bind:this={testBackdrop}
        on:keyup
        on:keydown
        on:click={_ => ($editor.test_status = 1)}
    >
        <div class="custom-area">
            {#each Object.keys($match_data.test_highlight) as match_code}
                <ToolTip match={$match_data.test_highlight[match_code]}/>
            {/each}
        </div>
    </pre>

    <textarea
        bind:this={testTextArea}
        bind:value={$test.test_string}
        on:input={_ => (dispatch("update", false))}
        on:scroll={scrollFn}
        spellcheck="false" 
        autocomplete="off" 
        translate="no" 
        placeholder="Insert your test data here"
    ></textarea>
</div>

<style>
    .editor-status {
        border: 1px solid var(--border-color);
        border-radius: 3px;
        padding: 3px 3px;
        height: fit-content;
        width: fit-content;
        text-align: center;
        background-color: var(--base-status-color);
        color: var(--secondary-text-color);
    }
    
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