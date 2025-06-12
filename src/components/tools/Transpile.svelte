<script>
	import { transpileExpression } from "$lib/explainer.js";
	import { test } from "$lib/stores.js";
	import { toast } from "@zerodevx/svelte-toast";

	function getTranspiledExpression() {
		if ($test.expression.length == 0) {
			toast.push("Expression is empty");
			return;
		}
		let transpiledExpression = transpileExpression(
			`/${$test.expression}/${$test.flags.join("")}`
		);

		if (transpiledExpression.source == $test.expression) {
			toast.push("Expression can't be transpiled");
		} else {
			toast.push("Expression transpiled");
		}
		$test.expression = transpiledExpression.source;
		$test.flags = transpiledExpression.flags.split("");
	}
</script>

<button
	type="button"
	on:click={getTranspiledExpression}
	class="rounded text-secondary px-1 select-none border shadow font-semibold text-center text-xs self-center cursor-pointe"
>
	Transpile expression
</button>
