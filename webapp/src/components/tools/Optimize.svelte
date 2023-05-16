<script>
	import { optimizeRegex } from "$lib/explainer.js";
	import { test } from "$lib/stores.js";
	function getOptimzedExpression() {
		if ($test.expression.length == 0) return;
		let optimizedExpression = optimizeRegex(
			`/${$test.expression}/${$test.getFlags()}`
		);
		$test.expression = optimizedExpression.source;
		$test.flags = optimizedExpression.flags.split("");
	}
</script>

<div class="optimize">
	<span on:keydown on:click={getOptimzedExpression}>Optimize expression</span>
</div>
