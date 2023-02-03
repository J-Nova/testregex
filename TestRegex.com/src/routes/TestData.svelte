<script>
    import ToolTip from "./ToolTip.svelte";
    import { createEventDispatcher } from 'svelte';
    import {editor_status, testString, match_data_list} from "$lib/stores.js";

    let testBackdrop;
    let testCustomArea;
    let testTextArea;

    const dispatch = createEventDispatcher();

    function updateExpression(){
        dispatch("updateExpression", false);
    }

    function lockEditor(){
        if ($testString.length > 0){
            testTextArea.style.display = "none";
            $editor_status = "View mode";
        }
    }

    function unlockEditor(){
        testTextArea.style.display = "";
        testTextArea.focus();
        testTextArea.setSelectionRange(-1, -1)
        $editor_status = "Edit mode"
    }

    function scrollFn(){ // Sets the scroll position to match each other.
        testBackdrop.scrollTop = testTextArea.scrollTop;
    }

</script>
<div class="string">
    <h2>
        <span>Test string</span>
    </h2>
    <div class="input" > 
        <!-- Create input container -->
        <div class="container">
            <div class="editorStatus">{$editor_status}</div>
            <pre
                bind:this={testBackdrop}
                on:keydown
                on:click={unlockEditor}
                style="max-height: 25em; min-height: 25em"
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
                on:input={updateExpression}
                on:blur={lockEditor}
                on:mouseleave={lockEditor}
                on:scroll={scrollFn}
                spellcheck="false" 
                autocomplete="off" 
                translate="no" 
                placeholder="Insert your test string here" 
            ></textarea>
        </div>
        <!-- End of creating input container -->
    </div>
</div>

<style>
    .string .input {
        border-radius: 3px;
        border: 1px solid;
    }
    .string h2 { /* this is the header for the inputs */
        padding: 5px 0px;
        border-bottom: 1px solid var(--body-primary);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .container {
        position: relative;
        width: 100%;
    }

    .editorStatus {
        position: absolute;
        right: 0;
        padding: 10px;
    }

    pre {
        background-color: var(--body-tertiary);
        top: 0;
    }
    pre div {
        display: table-row;
    }
    pre, textarea{
        word-wrap: break-word;
        white-space:pre-line;
        overflow: auto;
        word-break:break-all;
        
        letter-spacing: 1px;
        line-height: 1;
        
        width: 100%;
        height: 100%;
        
        /* font-family: 'Courier New', Courier, monospace; */
        font-size: x-large;
        font-weight: 400;
        
        padding: 10px;
        box-sizing: border-box;
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