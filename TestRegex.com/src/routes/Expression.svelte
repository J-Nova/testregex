<script>
    import { createEventDispatcher } from 'svelte';
    import Options from "./Options.svelte"
    import {match_status} from "$lib/data.js";
    import {flags, expressionString, status} from "$lib/stores.js";
    const dispatch = createEventDispatcher();
    let expressionBackdrop;
    let expressionCustomArea;
    let expressionTextArea;


</script>

<div class="input">
    <h2>
        <span>Regular Expression Input</span>
        <span class="result">{match_status[$status]}</span>
    </h2>
    <div class="input">
        <Options/>
            <!-- Create input container -->
            <div class="container">
                <pre
                    bind:this={expressionBackdrop}
                    aria-hidden="true"
                    style="max-height: 10em; min-height: 1.5em"
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
</div>

<style>
    .result {
        border-radius: 3px;
        background: var(--no-match);
        font-size: .725rem;
        font-weight: 500;
        padding: 3px 5px;
        text-transform: lowercase;
        color: var(--body-quaternary);
    }
    .input .input {
        background-color: var(--body-tertiary);
        border: 1px solid;
        border-radius: 3px;
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .input h2 { /* this is the header for the inputs */
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