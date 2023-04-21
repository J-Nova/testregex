<script>
    import {transpileExpression} from "$lib/explainer.js";
    import {test} from "$lib/stores.js";
    function getTranspiledExpression(){
        if ($test.expression.length == 0) return;
        let transpiled_expression = transpileExpression(`/${$test.expression}/${$test.flags.join("")}`);
        $test.expression = transpiled_expression.source;
        $test.flags = transpiled_expression.flags.split("");
    }
</script>

<div class="transpile">
    <span on:keydown on:click={getTranspiledExpression}>Transpile expression</span>
</div>