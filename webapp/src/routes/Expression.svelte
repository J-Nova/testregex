<script>
    import Options from "./Options.svelte";
    import Flags from "./Flags.svelte";
    import Optimize from "./Optimize.svelte";
    import Transpile from "./Transpile.svelte";
    import {expressionString, match_status, status_color, match_codes} from "$lib/stores.js";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let expressionBackdrop;
    let expressionTextArea;

</script>

<div class="heading">
    <h2>regular expression</h2>
    <Optimize/>
    <Transpile/>
    <span class="result" style="background-color:var({$status_color})">{match_codes[$match_status]}</span>
</div>
<div class="input">
    <Options/>
        <div class="container">
            <pre
                bind:this={expressionBackdrop}
                aria-hidden="true"
                class="pre-container"
                >
            <div class="custom-area">{$expressionString}</div>
            </pre>
        
            <textarea
                bind:this={expressionTextArea}
                bind:value={$expressionString}
                on:input={_ => {dispatch("updateExpression", true);}}
                on:scroll={_ => {expressionBackdrop.scrollTop = expressionTextArea.scrollTop;}}
                spellcheck="false" 
                autocomplete="off" 
                translate="no" 
                placeholder="Insert your expression here"
            ></textarea>
        </div>
        <Options/>
        <Flags/>
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
        color: var(--primary-text-color);
    }

    .result {
        border: 1px solid var(--border-color);
        border-radius: 3px;
        padding: 3px 3px;
        height: fit-content;
        width: fit-content;
        text-align: center;
        color: var(--secondary-text-color);
    }

    h2 {
        margin: 0px;
        text-transform: uppercase;
        font-weight: 500;
    }

    .input {
        background-color: var(--primary);
        border: 1px solid var(--border-color);
        border-radius: 3px;
        display: flex;
        flex-direction: row;
        box-shadow: 0 0 10px 3px rgb(0 0 0 / 20%);
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
        line-height: 1.25;
        width: 100%;
        height: 100%;
        font-size: larger;
        font-weight: 400;
        padding: 1px 1px 1px 1px;
        margin:0;
        padding-top: 5px;
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