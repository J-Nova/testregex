<script>
// @ts-nocheck
    import {editor, test, match_data} from "$lib/stores.js";
    import {updateRegex} from "$lib/matcher.js";
    import {testHighlighter} from "$lib/explainer.js";
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

    function updateExpression(explain){
        if ($test.expression.length == 0) {$match_data.clear(); $match_data = $match_data; $editor.test_lock = false; $editor.updateMatchStatus(3); return;}
        updateRegex($test, errorCallback, successCallback, timeoutCallback, explainCallback, explain);
        expression_timer && clearTimeout(expression_timer),
        expression_timer = setTimeout(function (){
            console.log("locking editor")
            $editor.editor_lock = true;
            $editor.test_lock = true;
        }, $editor.editorLockTimeout);
    }

    function successCallback(data){
        if (Object.keys(data.result).length > 0 ){
            $editor.updateMatchStatus(1);
            $match_data.test_highlight = testHighlighter(data.result, $test.test_string);
            $editor = $editor;
        } else { // No match
            $editor.updateMatchStatus(0);
        }

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

    function explainCallback(explanation_data){
        if (explanation_data.explanation.success){
            $editor.updateMatchStatus(0);
            $match_data.ast_tree = explanation_data.explanation.body;
            $match_data.expression_highlight = explanation_data.tooltip_data;
        } else {
            $editor.updateMatchStatus(2);
            errorCallback({error: explanation.error.message});
        }
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
