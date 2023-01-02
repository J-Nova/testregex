<script>
    import TextArea from "./TextAreaResize.svelte";
    import {match_status} from '$lib/data.js'
    let delimiter = "/";
    let flags = ["g", "m"];
    let status = 0;
    let regex_expression;
    let test_string;
    let flavour_begin = ":";
    let flavour_end = "/";

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
        showHide("explanation");
    }

    function showInformation(){
        showHide("information");
    }

    function lookUp(){
        showHide("lookup");
    }

    

</script>

<div class="functions">
    <button>Save</button>
    <div class="flavour">
        <button>Flavour</button>
        <ul class="flavour-list">
            <li>Javascript (ECMAScript)</li>
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
            <span class="delimiter">{flavour_begin}{delimiter}</span>
            <TextArea bind:value={regex_expression}  maxRows={10} minRows={1.5}/>
            <span class="flags">{flavour_end}{flagString()}</span>
        </div>
    </div>

    <div class="string">
        <h2>
            <span>Test string</span>
        </h2>
        <div class="input"> 
            <TextArea bind:value={test_string}  maxRows={35} minRows={35}/>
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

</style>
