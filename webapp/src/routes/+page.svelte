<script>
// @ts-nocheck
    import {updateRegex} from "$lib/matcher.js";
    import {highlighter} from "$lib/handler.js";
    import Quickref from "./Quickref.svelte";
	import Matchinformation from "./Matchinformation.svelte";
    import Matchexplanation from './Matchexplanation.svelte';
    import Expression from "./Expression.svelte";
    import TestData from './TestData.svelte';
    import Ad from './Ad.svelte';
    import Flavour from './Flavour.svelte';
    import Tools from './Tools.svelte';
    import Settings from './Settings.svelte';

    import {delimiter, flags, editor_status, expressionString, testString, match_status, information_message, match_data_list, MatchAstTree, editorLockTimeout, flavor, status_color, explain_timeout, match_timeout} from "$lib/stores.js";
    

    let expression_timer;

    function lockEditor(){
        if ($testString.length > 0) $editor_status = 0;
    }

    function updateExpression(explain){
        function runExpression(regex_expression, flags, test_string, delimiter, flavor, explain){
            updateRegex(
            regex_expression, 
            flags, 
            test_string,
            delimiter, 
            flavor,
            errorCallback,
            successCallback,
            timeoutCallback, 
            explain,
            explainCallback,
            $explain_timeout,
            $match_timeout
            );
        }

        $match_data_list = [];
        if ($expressionString.length > 0 && $testString.length > 0){
            runExpression($expressionString, $flags.sort().join(""), $testString, $delimiter, $flavor, explain);
            clearTimeout(expression_timer);
            expression_timer = setTimeout(lockEditor, $editorLockTimeout);
        } else if ($expressionString.length > 0) {
            runExpression($expressionString, $flags.sort().join(""), $testString, $delimiter, $flavor, explain);
            clearTimeout(expression_timer);
            expression_timer = setTimeout(lockEditor, $editorLockTimeout);
        }
        
        if ($expressionString.length == 0) {
            $MatchAstTree = {};
            $match_status = 3;
            $status_color = "--base-status-color";
        }

        if ($testString.length == 0) {
            $information_message = "Detailed match information will be displayed here automatically.";
        }
    }

    function successCallback(match_data){
        console.log(match_data);
        if (Object.keys(match_data.highlighter).length > 0 ){
            $match_status = 1;
            $status_color = "--match-status-color";
        } else {
            $match_status = 0;
            $status_color = "--no-match-status-color";
        }
        $match_data_list = highlighter(match_data.highlighter, $testString);
    }

    function errorCallback(errorMessage){
        $MatchAstTree = {error:errorMessage}
        $information_message = "Your expression contains one or more faults, please see explanation above.";
        $match_status = 2;
        $status_color = "--error-status-color";
    }
    
    function timeoutCallback(){
        $MatchAstTree = {error: "Timed out while waiting on expression results"}
        $information_message = "Detailed match information will be displayed here automatically.";
        $status_color = "--error-status-color";
        $match_status = 2;
    }

    function explainCallback(explanation){
        $MatchAstTree = explanation.body;
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
        <Expression on:updateExpression={updateExpression}/>
        <TestData on:updateExpression={updateExpression}/>
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
        max-width: 15%;
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
