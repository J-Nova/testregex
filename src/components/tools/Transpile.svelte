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
	class="rounded text-white select-none border shadow col-span-2 text-center 2xl:text-sm text-xs self-center cursor-pointer"
>
	Transpile expression
</button>
