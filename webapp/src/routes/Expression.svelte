<script>
// @ts-nocheck
    import {editor, test, match} from "$lib/stores.js";
    import { createEventDispatcher } from 'svelte';
    import Options from "./Options.svelte";
    import Flags from "./Flags.svelte";
    import Optimize from "./Optimize.svelte";
    import Transpile from "./Transpile.svelte";
    import ExpressionTooltip from "./ExpressionTooltip.svelte";
    
    const dispatch = createEventDispatcher();
    let expressionBackdrop;
    let expressionTextArea;

    function unlockEditor(){
        expressionTextArea.disabled = false;
        expressionTextArea.style.display = "block";
        expressionTextArea.focus()
        expressionTextArea.setSelectionRange(-1, -1);
    }

    function lockEditor(){
        if (!expressionTextArea || $test.expression.length == 0) return;
        expressionTextArea.style.display = "none";
        expressionTextArea.disabled = true;
    }

    function matchStatus(){
        if ($match.testHighlight.filter(item => item.className !== "no-match").length == 0){
            return $editor.getMatchStatus()
        }
        else{
            return `${$match.testHighlight.filter(item => item.className !== "no-match").length} ${$editor.getMatchStatus()} - ${$match.result.time} ms`
        }
    }
    
    $: lockEditor($editor.editorLock);
    $: status = matchStatus($match.testHighlight);
</script>

<div class="heading">
    <h2>regular expression</h2>
    <Optimize/>
    <Transpile/>
    <span class="result" style="background-color:var({$editor.statusColor})">
        {status}
    </span>
</div>

<div class="input">
    <Options/>
        <div class="container">
            <pre
                bind:this={expressionBackdrop}
                on:dblclick={unlockEditor}
            >
                <div class="custom-area">
                    {#if $match.expressionHighlight.length >= 1 && $test.expression.length >= 1}
                        {#each $match.expressionHighlight as expression}
                            <ExpressionTooltip expression={expression}/>
                        {/each}
                    {/if}
                </div>
            </pre>
        
            <textarea
                bind:this={expressionTextArea}
                bind:value={$test.expression}
                on:input={_ => (dispatch("update", true))}
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
    .result {
        border: 1px solid var(--border-color);
        border-radius: 3px;
        padding: 3px 3px;
        height: fit-content;
        width: fit-content;
        text-align: center;
        color: var(--secondary-text-color);
        user-select: none;
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

    .heading{
        font-size: small;
    }
</style>