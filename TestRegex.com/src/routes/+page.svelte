<script>
// @ts-nocheck
    import {updateRegex} from "$lib/matcher.js";
    import {highlighter} from "$lib/handler.js";
    import Quickref from "./Quickref.svelte";
	import Matchinformation from "./Matchinformation.svelte";
    import Matchexplanation from './Matchexplanation.svelte';
    import Expression from "./Expression.svelte";
    import TestData from './TestData.svelte';
    import Nav from "./Nav.svelte";

    import {delimiter, flags, editor_status, expressionString, testString, match_status, information_message, match_data_list, MatchAstTree, editorLockTimeout, flavor, status_color} from "$lib/stores.js";

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
        let match_indexes = new Set();
        if (Object.keys(match_data.highlighter).length > 0 ){
            for (let [_, current_match] of Object.entries(match_data.highlighter)){
                for (let index=current_match.startIndex; index<current_match.endIndex; index++){
                    match_indexes.add(index);
                }
            }
            $match_status = 1;
            $status_color = "--match-status-color";
        } else {
            $match_status = 0;
            $status_color = "--no-match-status-color";
        }
        $match_data_list = highlighter(match_indexes, match_data.highlighter, $testString);
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
        $status_color = "--timeout-status-color";
        $match_status = 2;
    }

    function explainCallback(explanation){
        $MatchAstTree = explanation.body;
    }
    
</script>

<Nav/>
<main>
    <div class="left">
        <Expression on:updateExpression={updateExpression}/>
        <TestData on:updateExpression={updateExpression}/>
    </div>

    <div class="right">
        <Matchexplanation/>
        <Matchinformation/>
        <Quickref/>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        height: 100rem;
        width: 100%;
    }

    .left {    
        display: grid;
        grid-template-rows: 3rem 3rem 5rem auto;
        max-width: 70rem;
        width: 100%;
        padding:1rem;
        background-color: var(--body-secondary);
    }
    
    .right {
        display: flex;
        flex-direction: column;
        max-width: 30rem;
        width: 100%;
        background-color: var(--body-secondary);
        height: 100%;
        padding: 1rem;
        gap: 1rem;
    }

</style>
