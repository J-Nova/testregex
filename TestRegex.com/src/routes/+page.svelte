<script>
    import {match_status, FLAVORS} from '$lib/data.js';
    import {updateRegex} from "$lib/matcher.js";
    import {highlighter} from "$lib/handler.js";
    import Quickref from "./Quickref.svelte";
	import Matchinformation from "./Matchinformation.svelte";
    import ToolTip from "./ToolTip.svelte";
    import Matchexplanation from './Matchexplanation.svelte';

    let testTextArea;
    let testBackdrop;
    let testCustomArea;
    
    let expressionTextArea;
    let expressionBackdrop;
    let expressionCustomArea;
    
    let expressionString = "";
    let testString = "";
    let editorStatus = "Edit mode";
    $: informationMessage = "Detailed match information will be displayed here automatically.";
    
    
    
    $: match_data_list = [];
    $: MatchAstTree = {};
    $: matchTextColor = "base";

    let delimiter = "/";
    let flags = ["g", "m"];
    $:  status = 0;
    let editorLockTimeout = 3000;
    $: flavor = FLAVORS[0];

    function flagString(){
        return flags.join("");
    }

    function updateExpression(event){
        function runExpression(regex_expression, flags, test_string, delimiter, flavor, explain){
            updateRegex(
            regex_expression, 
            flags, 
            test_string, 
            false, 
            "", 
            delimiter, 
            flavor,
            errorCallback,
            successCallback,
            timeoutCallback, 
            explain,
            explainCallback);
        }

        match_data_list = [];
        let explain_expr = (event.target !== testTextArea)
        if (expressionString.length > 0 && testString.length > 0){
            runExpression(expressionString, flagString(), testString, delimiter, flavor, explain_expr);
            setTimeout(lockEditor, editorLockTimeout);
        } else if (expressionString.length > 0) {
            runExpression(expressionString, flagString(), testString, delimiter, flavor, true);
        } 
        
        if (expressionString.length == 0) {
            MatchAstTree = {};
        } 
        if (testString.length == 0) {
            informationMessage = "Detailed match information will be displayed here automatically.";
        }
    }

    function lockEditor(){
        if (testString.length > 0){
            testTextArea.style.display = "none";
            editorStatus = "View mode";
        }
    }

    function unlockEditor(){
        testTextArea.style.display = "";
        testTextArea.focus();
        testTextArea.setSelectionRange(-1, -1)
        editorStatus = "Edit mode"
    }

    function successCallback(match_data){
        matchTextColor = "base";
        let matches = match_data.highlighter;
        let match_indexes = new Set();
        if (Object.keys(matches).length > 0 ){
            for (const [_, value] of Object.entries(matches)){
                let current_match = value;
                for (let index=current_match.startIndex; index<current_match.endIndex; index++){
                    match_indexes.add(index);
                }
            }
            // @ts-ignore
            informationMessage = ["a"];
            status = 1;
        } else status = 0;
        match_data_list = highlighter(match_indexes, matches, testString);
    }

    function errorCallback(errorMessage){
        MatchAstTree = {error:errorMessage}
        informationMessage = "Your expression contains one or more faults, please see explanation above.";
        matchTextColor = "error";
        status = 2;
    }

    function timeoutCallback(){
        MatchAstTree = {error: "Timed out while waiting on expression results"}
        informationMessage = "Detailed match information will be displayed here automatically.";
        matchTextColor = "error";
        status = 2;
    }

    function explainCallback(explanation){
        MatchAstTree = explanation.body;
    }

    function scrollFn(e){ // Sets the scroll position to match each other.
        if (e.target == testTextArea) {
            testBackdrop.scrollTop = testTextArea.scrollTop;
        } else {
            expressionBackdrop.scrollTop = expressionTextArea.scrollTop;
        }
    }
    
</script>

<div class="functions">
    <button>Save</button>
    <div class="flavour">
        <button>Flavour</button>
        <ul class="flavour-list">
            <li>PCRE (PHP)</li>
            <li>ECMAScript (JavaScript)</li>
        </ul>
    </div>

    <button>Function</button>
    <button>Code generator</button>
</div>
<main>

<div id="left-side">
    <!-- The expression area -->
    <div class="input">
        <h2>
            <span>Regular Expression Input</span>
            <span class="result">{match_status[status]}</span>
        </h2>
        <div class="input">
            <span class="delimiter">{delimiter}</span>
                <!-- Create input container -->
                <div class="container">
                    <pre
                        bind:this={expressionBackdrop}
                        aria-hidden="true"
                        style="max-height: 10em; min-height: 1.5em"
                    >
                    <div class="custom-area" bind:this={expressionCustomArea}>{expressionString}</div>
                    </pre>
                
                    <textarea
                        bind:this={expressionTextArea}
                        bind:value={expressionString}
                        on:input={e=>updateExpression(e)}
                        on:scroll={e => scrollFn(e)}
                        spellcheck="false" 
                        autocomplete="off" 
                        translate="no" 
                        placeholder="Insert your expression here" 
                    ></textarea>
                </div>
                <!-- End of creating input container -->
            <span class="flags">{delimiter}{flagString()}</span>
        </div>
    </div>
    <!-- The test area -->
    <div class="string">
        <h2>
            <span>Test string</span>
        </h2>
        <div class="input" > 
            <!-- Create input container -->
            <div class="container">
                <div class="editorStatus">{editorStatus}</div>
                <pre
                    bind:this={testBackdrop}
                    on:keydown
                    on:click={unlockEditor}
                    style="max-height: 25em; min-height: 25em"
                >
                <div class="custom-area" bind:this={testCustomArea}>
                    {#if match_data_list.length === 0}
                        {testString}
                    {:else}
                        {#each match_data_list as tooltip}
                            {#if tooltip !== undefined}
                                <ToolTip objAttributes={tooltip}/>
                            {/if}
                        {/each}
                    {/if}
                </div>
                </pre>
            
                <textarea
                    bind:this={testTextArea}
                    bind:value={testString}
                    on:input={e => updateExpression(e)}
                    on:blur={lockEditor}
                    on:mouseleave={lockEditor}
                    on:scroll={e => scrollFn(e)}
                    spellcheck="false" 
                    autocomplete="off" 
                    translate="no" 
                    placeholder="Insert your test string here" 
                ></textarea>
            </div>
            <!-- End of creating input container -->
        </div>
    </div>

</div>

<div id="right-side">
    <Matchexplanation json={MatchAstTree} matchColor={matchTextColor}/>
    
    <Matchinformation match_html={match_data_list} informationMessage={informationMessage}/>

    <Quickref flavor={flavor}/>
</div>

</main>

<style>
    .functions {
        display: flex;
        flex-direction: row;
        max-width: 60%;
        justify-content: space-between;
    }

    .functions ul {
        display: none;
    }

    main {
        display: flex;
        flex-direction: row;
        gap: 10px;
        height: 90vh;
    }

    #left-side {    
        background-color: var(--body-secondary);
        width: 60%;
        display: flex;
        flex-direction: column;
        padding:10px;
        gap:10px;
    }

    .input h2 .result { /* this is the no match text box */
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

    .input h2, .string h2 { /* this is the header for the inputs */
        padding: 5px 0px;
        border-bottom: 1px solid var(--body-primary);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .delimiter, .flags {
        align-self: baseline;
        padding: 15px;
        color: var(--body-quaternary);
    }

    .string .input {
        border-radius: 3px;
        border: 1px solid;
    }

    #right-side {
        width: 40%;
        display: flex;
        flex-direction: column;
        gap:10px;
        height: 100%;
    }



    /* Text Area styling ----------------------*/
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

	::placeholder {
		color : var(--body-primary);
	}

</style>
