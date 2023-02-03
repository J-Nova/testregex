<script>
// @ts-nocheck
    import {updateRegex} from "$lib/matcher.js";
    import {highlighter} from "$lib/handler.js";
    import Quickref from "./Quickref.svelte";
	import Matchinformation from "./Matchinformation.svelte";
    import Matchexplanation from './Matchexplanation.svelte';
    import Expression from "./Expression.svelte";
    import TestData from './TestData.svelte';
    import Functions from "./Functions.svelte"

    import {delimiter, flags, editor_status, expressionString, testString, status, information_message, match_data_list, MatchAstTree, matchTextColor, editorLockTimeout, flavor} from "$lib/stores.js";

    function lockEditor(){
        $editor_status = "View mode";
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
            runExpression($expressionString, $flags.join(""), $testString, $delimiter, $flavor, explain);
            setTimeout(lockEditor, $editorLockTimeout);
        } else if ($expressionString.length > 0) {
            runExpression($expressionString, $flags.join(""), $testString, $delimiter, $flavor, explain);
        }
        
        if ($expressionString.length == 0) {
            $MatchAstTree = {};
        } 
        if ($testString.length == 0) {
            $information_message = "Detailed match information will be displayed here automatically.";
        }
    }

    function successCallback(match_data){
        $matchTextColor = "base";
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
            $information_message = ["a"];
            $status = 1;
        } else $status = 0;
        $match_data_list = highlighter(match_indexes, matches, $testString);
    }

    function errorCallback(errorMessage){
        $MatchAstTree = {error:errorMessage}
        $information_message = "Your expression contains one or more faults, please see explanation above.";
        $matchTextColor = "error";
        $status = 2;
    }

    function timeoutCallback(){
        $MatchAstTree = {error: "Timed out while waiting on expression results"}
        $information_message = "Detailed match information will be displayed here automatically.";
        $matchTextColor = "error";
        $status = 2;
    }

    function explainCallback(explanation){
        $MatchAstTree = explanation.body;
    }
    
</script>

<Functions/>

<main>
<div id="left-side">
    <!-- The expression area -->
    <Expression on:updateExpression={updateExpression}/>
    <!-- The test area -->
    <TestData on:updateExpression={updateExpression}/>
</div>

<div id="right-side">
    <Matchexplanation/>
    
    <Matchinformation/>

    <Quickref/>
</div>

</main>

<style>
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

    #right-side {
        width: 40%;
        display: flex;
        flex-direction: column;
        gap:10px;
        height: 100%;
    }

</style>
