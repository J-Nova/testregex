<script>
// @ts-nocheck
    import ToolTip from "./ToolTip.svelte";
    import { createEventDispatcher } from 'svelte';
    import {editor_status, editor_codes, testString, match_data_list} from "$lib/stores.js";
    const dispatch = createEventDispatcher();
    function scrollFn(){testBackdrop.scrollTop = testTextArea.scrollTop;}

    let testBackdrop;
    let testCustomArea;
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
    <h2>Test string</h2>
    <div class="editor-status">{editor_codes[$editor_status]}</div>
</div>

<div class="container">
    <pre
        bind:this={testBackdrop}
        on:keyup
        on:keydown
        on:click={e => ($editor_status = 1)}
    >
    <div class="custom-area" bind:this={testCustomArea}>
        {#if $match_data_list.length === 0}
            {$testString}
        {:else}
            {#each $match_data_list as tooltip}
                {#if tooltip !== undefined}
                    <ToolTip objAttributes={tooltip}/>
                {/if}
            {/each}
        {/if}
    </div>
    </pre>

    <textarea
        bind:this={testTextArea}
        bind:value={$testString}
        on:input={e => dispatch("updateExpression", false)}
        on:scroll={scrollFn}
        spellcheck="false" 
        autocomplete="off" 
        translate="no" 
        placeholder="Insert your test string here"
    ></textarea>
</div>

<style>
    .editor-status {
        border: 1px solid var(--border-color);
        border-radius: 3px;
        padding: 3px 3px;
        height: fit-content;
        width: 150px;
        text-align: center;
    }
    .heading {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid var(--border-color);
        margin: 10px 0px;
        padding: 10px 0px;
    }
    
    h2{
        margin: 0px;
    }
    
    .container {
        position: relative;
        border-radius: 3px;
        border: 1px solid var(--border-color);
        height: 100%;
    }


    pre {
        background-color: var(--body-tertiary);
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
        font-size: x-large;
        letter-spacing: 1px;
        line-height: 1;
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