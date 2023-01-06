<script>
    // import TextArea from "./TextAreaResize.svelte";
    import {match_status, FLAVORS, storeFE} from '$lib/data.js'
    import {updateRegex} from "$lib/matcher.js";
    import ToolTip from "./ToolTip.svelte";
    let testTextArea;
    let testBackdrop;
    let testCustomArea = "";
    
    let expressionTextArea;
    let expressionBackdrop;
    let expressionCustomArea = "";

    let expressionString = "";
    let testString = "";
    $storeFE = [];
    
    let match_color_1 = "#57787D";
	let match_color_2 = "#1E2632";
    
    // let expressionArea;
    // let testArea;

    let delimiter = "/";
    let flags = ["g", "m"];
    let status = 0;
    // TODO: get and set flavour through localstorage
    let flavor = FLAVORS[0];

    function flagString(){
        return flags.join("");
    }
    function showHide(id) {
        if (document.getElementById(id).style.display == "none") {
            document.getElementById(id).style.display = "block";
        } else {
            document.getElementById(id).style.display = "none";
        }
    }

    function showExplanation(){
        //TODO get explanation from localstorage
        showHide("explanation");
    }

    function showInformation(){
        // TODO get information from localstorage
        showHide("information");
    }

    function lookUp(){
        //TODO Implement all proper information
        showHide("lookup");
    }

    function highlightExpression(){}

    function highlightTest(){
        if (expressionString.length > 0 && testString.length > 0)
        runExpression(expressionString, flagString(), testString, delimiter, flavor, false);
    }

    function successCallback(match_data){
        console.log("success callback");
        let matches = match_data.highlighter;
        if (matches.length !== {} ){
            console.log(match_data);
            let match_indexes = new Set();
            for (const [_, value] of Object.entries(matches)){
                let current_match = value;
                for (let index=current_match.startIndex; index<current_match.endIndex; index++){
                    match_indexes.add(index);
                }
            }
            console.log(testCustomArea)
            $storeFE = [];
            for (let i=0; i<testString.length; i++){
                let tooltip;
                if (match_indexes.has(i)){
                    let matchNumber = matches[i].matchNumber;
                    let groupNumber = matches[i].groupNumber;
                    let groupNames = matches[i].groupNames;
                    let content = matches[i].content;
                    let start = matches[i].startIndex;
                    let end = matches[i].endIndex;
                    let isMatch = true;
                    tooltip = {matchNumber:matchNumber, groupNumber:groupNumber, groupNames:groupNames, content:content, start:start, end:end, isMatch:isMatch};
                } else{
                    let isMatch = false;
                    let char = testString[i];
                    console.log(char);
                    tooltip = {isMatch:isMatch, content:char};
                }
                $storeFE.push(tooltip);
            }
            console.log($storeFE)
            // Now compare the expression string to get non-matched characters compared to the match_data results.

            // Then create new tooltip components and add it to CustomArea.
        }
    }

    function errorCallback(){
        console.log("error callback");
    }

    function catastrophicCallback(){
        console.log("catastrophic callback");
    }

    function timeoutCallback(){
        console.log("timeout callback");
    }

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
        catastrophicCallback,
        successCallback,
        timeoutCallback, 
        explain);
    }

    function srollFn(e){
        if (e.target == testTextArea) {
            testBackdrop.scrollTop = testTextArea.scrollTop;
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
                        on:input={highlightExpression}
                        on:scroll={e => srollFn(e)}
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

    <div class="string">
        <h2>
            <span>Test string</span>
        </h2>
        <div class="input" > 
            <!-- Create input container -->
            <div class="container">
                <pre
                    bind:this={testBackdrop}
                    
                    style="max-height: 35em; min-height: 35em"
                >
                <div class="custom-area" bind:this={testCustomArea}>
                    {#each $storeFE as tooltip}
                        <ToolTip objAttributes={tooltip}/>
                    {/each}
                </div>
                </pre>
            
                <textarea
                    bind:this={testTextArea}
                    bind:value={testString}
                    on:input={highlightTest}
                    on:scroll={e => srollFn(e)}
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
    <div class="explanation">
        <button on:click={showExplanation}>
            <h2>
                <span>Explanation</span>
            </h2>
        </button>
        <div id="explanation">
            <span>An explanation will automatically be generated about your regex expression.</span>
        </div>
    </div>

    <div class="information"> 
        <button on:click={showInformation}>
            <h2>
                <span>Information</span>
            </h2>
        </button>
        <div id="information">
            <span>Detailed match information will be displayed here automatically.</span>
        </div>
    </div>

    <div class="lookup">
        <button on:click={lookUp}>
            <h2>
                <span>Lookup</span>
            </h2>
        </button>
        <div id="lookup">
            <div class="categories">
                <input type="text" placeholder="Search..." spellcheck="false">
                <ul>
                    <li>category1</li>
                </ul>
            </div>
    
            <div class="data">
                <ul>
                    <li>data1</li>
                </ul>
            </div>
        </div>
    </div>
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

    .input div { /* this is for all the divs in the input */
        background-color: var(--body-tertiary);
        border: 1px solid;
        border-radius: 3px;
    }
    

    .input .input {
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
    }

    #right-side button {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        margin: 0;
        padding: 0;
        text-align: inherit;
    }

    #right-side div {
        background-color: var(--body-secondary);
        height: auto;
        padding: 5px;
    }



    /* Text Area styling ----------------------*/
    .container {
		position: relative;
		width: 100%;
	}
	
	pre {
        background-color: var(--body-tertiary);
		color: red;
        top: 0;
	}
    pre div {
        display: flex;
    }
	
	pre, textarea{
        word-wrap: break-word;
		white-space:pre-line;
		overflow: auto;
		word-break: break-all;
		
		letter-spacing: 1px;
		line-height: 1;
		
		width: 100%;
		height: 100%;
        
		font-family: 'Courier New', Courier, monospace;
		font-size: small;
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
		/* color: transparent !important; */
	}

	::placeholder {
		color : var(--body-primary);
	}

</style>
