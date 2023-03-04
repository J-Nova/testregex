<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import Options from "./Options.svelte"
    import {match_status} from "$lib/data.js";
    import {expressionString, status} from "$lib/stores.js";
    let expressionBackdrop;
    let expressionCustomArea;
    let expressionTextArea;

</script>

<div class="heading">
    <h2>Regular Expression Input</h2>
    <span class="result">{match_status[$status]}</span>
</div>
<div class="input">
    <Options/>
        <!-- Create input container -->
        <div class="container">
            <pre
                bind:this={expressionBackdrop}
                aria-hidden="true"
                class="pre-container"
                >
            <div class="custom-area" bind:this={expressionCustomArea}>{$expressionString}</div>
            </pre>
        
            <textarea
                bind:this={expressionTextArea}
                bind:value={$expressionString}
                on:input={e => {dispatch("updateExpression", true);}}
                on:scroll={e => {expressionBackdrop.scrollTop = expressionTextArea.scrollTop;}}
                spellcheck="false" 
                autocomplete="off" 
                translate="no" 
                placeholder="Insert your expression here" 
            ></textarea>
        </div>
        <!-- End of creating input container -->
        <Options showFlags={true}/>
</div>

<style>
    .heading {
        border-bottom: 1px solid var(--border-color);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0px;
        padding: 5px 0px;
    }

    .result {
        border: 1px solid var(--border-color);
        border-radius: 3px;
        padding: 3px 3px;
        height: fit-content;
        width: 150px;
        text-align: center;
    }

    h2 {
        margin: 0px;
    }

    .input {
        background-color: var(--body-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 3px;
        display: flex;
        flex-direction: row;
    }
    
    .container {
        position: relative;
        width: 100%;
    }
    .pre-container{
        max-height: inherit !important;
        min-height: inherit !important;
    }
    pre {
        background-color: var(--body-tertiary);
        top: 0;
    }
    pre div {
        display: contents;
    }
    pre, textarea{
        word-wrap: break-word;
        white-space:pre-line;
        overflow-y: auto;
        word-break:break-all;
        letter-spacing: 1px;
        line-height: 1;
        width: 100%;
        height: 100%;
        font-size: x-large;
        font-weight: 400;
        padding: 1px 1px 1px 1px;
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