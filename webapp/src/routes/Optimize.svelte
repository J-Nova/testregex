<script>
    import {optimizeRegex} from "$lib/explainer.js";
    import {test} from "$lib/stores.js";
    function getOptimzedExpression() {
        if ($test.expression.length == 0) return;
        let optimized_expression = optimizeRegex(`/${$test.expression}/${$test.flags.join("")}`);
        $test.expression = optimized_expression.source;
        $test.flags = optimized_expression.flags.split("");
    }
</script>

<div class="optimize">
    <span on:keydown on:click={getOptimzedExpression}>Optimze expression</span>
</div>
