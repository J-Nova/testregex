<script>
// @ts-nocheck
    import {editor, test} from "$lib/stores.js";
    import Options from "./Options.svelte";
    import Flags from "./Flags.svelte";
    import Optimize from "./Optimize.svelte";
    import Transpile from "./Transpile.svelte";
    import ExpressionTooltip from "./ExpressionTooltip.svelte";
    import {explainRegex} from "$lib/explainer.js";
    import {generateTooltips} from "$lib/expression.js";
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    let expressionBackdrop;
    let expressionTextArea;

    function updateEditor(locking){
        if (locking){
            expressionBackdrop.focus();
            expressionTextArea.style.display = "none";
            expressionTextArea.disabled = true;
        } else if (expressionTextArea && !locking) {
            expressionTextArea.disabled = false;
            expressionTextArea.style.display = "block";
            expressionTextArea.focus();
            expressionTextArea.setSelectionRange(-1, -1);
        }
        return locking;
    }

    $: disabled_input = ($editor.editor_status == 0 ? updateEditor(true) : updateEditor(false));

    function expressionHighlighting(){
        if ($test.expression.length > 0){
            let test_data = {
                "regex": $test.expression,
                "options": $test.flags.join("")
            }
            let explain_tree = explainRegex(test_data, true);
            if (explain_tree.success){
                tooltip = generateTooltips(explain_tree.body.expressions || [explain_tree.body], $test.expression);
                dispatch("update", true);
            }
        } else {
            tooltip = [];
        }
    }

    $: tooltip = [];
</script>

<div class="heading">
    <h2>regular expression</h2>
    <Optimize/>
    <Transpile/>
    <span class="result" style="background-color:var({$editor.status_color})">
        {$editor.getMatchStatus()}
    </span>
</div>
<div class="input">
    <Options/>
        <div class="container">
            <pre
                bind:this={expressionBackdrop}
                on:keyup
                on:keydown
                on:click={_ => ($editor.editor_status = 1)}
                >
                <div class="custom-area">
                    {#if tooltip.length >= 1}
                        {#each tooltip as expression}
                            <ExpressionTooltip expression={expression}/>
                        {/each}
                    {/if}
                </div>
            </pre>
        
            <textarea
                bind:this={expressionTextArea}
                bind:value={$test.expression}
                on:input={expressionHighlighting}
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


</style>