<script>
    import {transpileExpression} from "$lib/explainer.js";
    import {test} from "$lib/stores.js";
    function getTranspiledExpression(){
        if ($test.expression.length == 0) return;
        let transpiledExpression = transpileExpression(`/${$test.expression}/${$test.flags.join("")}`);
        $test.expression = transpiledExpression.source;
        $test.flags = transpiledExpression.flags.split("");
    }
</script>

<div class="transpile">
    <span on:keydown on:click={getTranspiledExpression}>Transpile expression</span>
</div>