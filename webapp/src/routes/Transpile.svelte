<script>
    import {transpileExpression} from "$lib/explainer.js";
    import {expressionString, flags} from "$lib/stores.js";
    function getTranspiledExpression(){
        if ($expressionString.length == 0) return;
        let transpiled_expression = transpileExpression(`/${$expressionString}/${$flags.join("")}`);
        $expressionString = transpiled_expression.source;
        $flags = transpiled_expression.flags.split("");
    }
</script>

<div class="transpile">
    <span on:keydown on:click={getTranspiledExpression}>Transpile expression</span>
</div>