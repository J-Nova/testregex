<script>
// @ts-nocheck
    import {editor, test, match_data} from "$lib/stores.js";
    import {updateRegex} from "$lib/matcher.js";
    import {highlighter} from "$lib/explainer.js";
    import Quickref from "./Quickref.svelte";
	import Matchinformation from "./Matchinformation.svelte";
    import Matchexplanation from './Matchexplanation.svelte';
    import Expression from "./Expression.svelte";
    import TestData from './TestData.svelte';
    import Ad from './Ad.svelte';
    import Flavour from './Flavour.svelte';
    import Tools from './Tools.svelte';
    import Settings from './Settings.svelte';
    let expression_timer;

    function lockEditor(){
        if ($test.test_string.length > 0) $editor.editor_status = 0, $editor.test_status = 0;
    }

    function updateExpression(explain){
        function runExpression(test, explain){
            updateRegex(
            test.expression, 
            test.flags.join(""), 
            test.test_string,
            test.delimiter, 
            test.flavor,
            errorCallback,
            successCallback,
            timeoutCallback, 
            explain,
            explainCallback,
            $editor.explain_timeout,
            $editor.match_timeout
            );
        }

        $match_data.test_highlight = {};
        if ($test.expression.length > 0){
            runExpression($test, explain);
            clearTimeout(expression_timer); 
            expression_timer = setTimeout(lockEditor, $editor.editorLockTimeout);
        }
        
        if ($test.expression.length == 0) {
            $match_data.ast_tree = {};
            $editor.updateMatchStatus(0);
        }

        if ($test.test_string.length == 0) {
            $match_data.information = "Detailed match information will be displayed here automatically.";
        }
    }

    function successCallback(data){
        if (Object.keys(data.result).length > 0 ){
            $editor.updateMatchStatus(1);
        } else {
            $editor.updateMatchStatus(0);
        }
        $match_data.content = data.result;
        $match_data.test_highlight = highlighter($match_data.content, $test.test_string);
    }

    function errorCallback(data){
        $match_data.ast_tree = data
        $match_data.information = "Your expression contains one or more faults, please see explanation above.";
        $editor.updateMatchStatus(2);
    }
    
    function timeoutCallback(){
        $match_data.ast_tree = {error: "Timed out while waiting on expression results"}
        $match_data.information = "Detailed match information will be displayed here automatically.";
        $editor.updateMatchStatus(2);
    }

    function explainCallback(explanation){
        $match_data.ast_tree = explanation.body;
    }
    
</script>

<div class="container">
    <div class="settings-content">
        <Ad/>
        <Flavour/>
        <Tools/>
        <Settings/>
    </div>
    <div class="main-content">
        <Expression on:update={updateExpression}/>
        <TestData on:update={updateExpression}/>
    </div>
    
    <div class="informative-content">
        <Matchexplanation/>
        <Matchinformation/>
        <Quickref/>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        gap: 1%;
        height: 100%;
        width: 100%;
    }

    .settings-content {
        display: flex;
        flex-direction: column;
        gap: 5%;
        max-width: 12%;
        width: 100%;
        height: 100%;
        background-color: var(--secondary);
        color: var(--primary-text-color);
    }

    .main-content {    
        display: grid;
        grid-template-rows: 3rem 2.5rem 4rem auto;
        max-width: 59%;
        width: 100%;
        padding: 0rem 1rem 0rem 1rem;
        background-color: var(--secondary);
    }
    
    .informative-content {
        display: flex;
        flex-direction: column;
        max-width: 30%;
        width: 100%;
        height: 100%;
        background-color: var(--secondary);
        padding: 1rem;
        gap: 1rem;
        color: var(--secondary-text-color);
    }

    @media screen and (max-width: 800px) {
        .informative-content {
            display: none;
            visibility: hidden;
        }
        .main-content {
            max-width: 100%;
        }
    }

    @media screen and (max-width: 900px) {
        .settings-content {
            display: none;
            visibility: hidden;
        }
        .main-content {
            max-width: 100%;
        }
    }

</style>
