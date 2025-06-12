<script>
	import { optimizeRegex } from "$lib/explainer.js";
	import { test } from "$lib/stores.js";
	import { toast } from "@zerodevx/svelte-toast";
	function getOptimzedExpression() {
		if ($test.expression.length == 0) {
			toast.push("Expression is empty");
			return;
		}
		let optimizedExpression = optimizeRegex(`/${$test.expression}/${$test.getFlags()}`);
		if (optimizedExpression.source == $test.expression) {
			toast.push("Expression is already most optimized");
		} else {
			toast.push("Expression optimized");
		}
		$test.flags = optimizedExpression.flags.split("");
		$test.expression = optimizedExpression.source;
	}
</script>

<button
	type="button"
	on:click={getOptimzedExpression}
	class="rounded text-secondary px-1 select-none border shadow font-semibold text-center text-xs self-center cursor-pointer"
>
	Optimize expression
</button>
