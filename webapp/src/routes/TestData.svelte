<script>
// @ts-nocheck
    import ToolTip from "./ToolTip.svelte";
    import { createEventDispatcher } from 'svelte';
    import {editor_status, editor_codes, testString, highlight_data} from "$lib/stores.js";
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
    $: disabled_input = ($editor_status == 0 ? updateEditor(true) : updateEditor(false));

</script>
<div class="heading">
    <h2>test data</h2>
    <div class="editor-status">{editor_codes[$editor_status]}</div>
</div>

<div class="container">
    <pre
        bind:this={testBackdrop}
        on:keyup
        on:keydown
        on:click={_ => ($editor_status = 1)}
    >
        <div class="custom-area">
                {#each Object.keys($highlight_data) as match_code}
                    <ToolTip match={$highlight_data[match_code]}/>
                {/each}
        </div>
    </pre>

    <textarea
        bind:this={testTextArea}
        bind:value={$testString}
        on:input={_ => dispatch("updateExpression", false)}
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

    .heading {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid var(--border-color);
        margin: 10px 0px;
        padding: 10px 0px;
        color: var(--primary-text-color);
    }
    
    h2{
        margin: 0px;
        text-transform: uppercase;
        font-weight: 500;
    }
    
    .container {
        margin-bottom: 10px;
        width: 100%;
        position: relative;
        border-radius: 3px;
        border: 1px solid var(--border-color);
        box-shadow: 0 0 10px 3px rgb(0 0 0 / 20%);
        background-color: var(--primary);
    }

    pre div {
        display: table-row;
    }
    pre, textarea{
        word-wrap: break-word;
        white-space:pre-line;
        overflow: auto;
        word-break:break-all;
        cursor:default;
        font-size: larger;
        line-height: 1.25;
        width: 100%;
        height: 100%;
        font-weight: 400;
        padding: 10px;
        margin:0;
    }

    textarea {
        top: 0;
        position: absolute;
        background-color: transparent !important;
        resize: none;
        border: none;
        outline: none;
    }
</style>