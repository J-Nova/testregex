<script>
    import {optimizeRegex} from "$lib/explainer.js";
    import {expressionString, flags} from "$lib/stores.js";
    function getOptimzedExpression() {
        if ($expressionString.length == 0) return;
        let optimized_expression = optimizeRegex(`/${$expressionString}/${$flags.join("")}`);
        $expressionString = optimized_expression.source;
        $flags = optimized_expression.flags.split("");
    }
</script>

<div class="optimize">
    <span on:keydown on:click={getOptimzedExpression}>Optimze expression</span>
</div>
