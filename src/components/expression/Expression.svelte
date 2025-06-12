<script>
	// @ts-nocheck
	import { createEventDispatcher } from "svelte";
	import { editor, test, match } from "$lib/stores.js";
	import Optimize from "$components/tools/Optimize.svelte";
	import Transpile from "$components/tools/Transpile.svelte";
	import Options from "./Options.svelte";
	import Flags from "./Flags.svelte";

	const dispatch = createEventDispatcher();
	let expressionTextArea;
	let testTextArea;

	function matchStatus() {
		return `${$editor.getMatchStatus()} - ${($match.result.time ?? 0).toFixed(2)} ms`;
	}

	$: status = matchStatus($match.testHighlight);

	// Function to handle updates to the expression
	function handleExpressionInput(event) {
		test.update(currentTest => {
			currentTest.expression = event.target.value;
			return currentTest;
		});
		dispatch("update", true);
	}

	// Function to handle updates to the test string
	function handleTestStringInput(event) {
		test.update(currentTest => {
			currentTest.testString = event.target.value;
			return currentTest;
		});
		dispatch("update", false);
	}
</script>

<main class="lg:col-span-5 flex flex-col space-y-4">
	<div class="card p-4 flex flex-col">
		<div class="flex items-center justify-between mb-2">
			<div class="flex flex-row gap-2">
				<h2 class="font-semibold">Regular Expression</h2>
				<span
					class="col-span-1 result rounded self-center text-xs font-bold"
					style="background-color:var({$editor.statusColor})"
				>
					{status}
				</span>
			</div>
			<div class="flex flex-row gap-1">
				<Optimize />
				<Transpile />
			</div>
			<div class="flex flex-row gap-1 items-center">
				<Options />
				<Flags />
			</div>
		</div>

		<div class="relative flex-grow">
			<textarea
				id="regex-input"
				class="w-full p-3 themed-bg border themed-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
				placeholder="/your-regex/flags"
				on:input={handleExpressionInput}
				bind:this={expressionTextArea}
				value={$test.expression}
			/>
		</div>
	</div>
	<div class="card p-4 max-h-[80svh] flex-grow flex flex-col">
		<h2 class="font-semibold mb-2">Test Data</h2>
		<div class="relative flex-grow">
			<textarea
				id="test-output"
				class="w-full h-full p-3 themed-bg border themed-border rounded-lg resize-none whitespace-pre-wrap"
				on:input={handleTestStringInput}
				bind:this={testTextArea}
				value={$test.testString}
				placeholder="This is some test data to demonstrate the matching. You can type here."
			/>
		</div>
	</div>
</main>
