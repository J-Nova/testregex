<style>
	.result {
		border: 1px solid var(--border-color);
		text-align: center;
		color: var(--secondary-text-color);
		user-select: none;
	}

	.input {
		background-color: var(--primary);
		border: 1px solid var(--border-color);
	}

	.container {
		border: 1px solid var(--border-color);
		background-color: var(--primary);
	}
</style>

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
		return `${$editor.getMatchStatus()} - ${$match.result.time ?? 0} ms`;
	}

	$: status = matchStatus($match.testHighlight);
</script>

<div class="grid grid-cols-8 gap-2 w-full">
	<h2 class="col-span-3 w-full text-white">regular expression</h2>
	<Optimize />
	<Transpile />
	<span
		class="col-span-1 result rounded self-center text-xs font-bold"
		style="background-color:var({$editor.statusColor})"
	>
		{status}
	</span>
</div>

<div class="input rounded shadow w-full flex flex-row">
	<Options />
	<div
		class="w-full flex flex-row flex-wrap h-auto overflow-y-auto"
		contenteditable="true"
		role="textbox"
		tabindex="0"
		on:click={_ => {
			expressionTextArea.innerHTML = "";
			expressionTextArea.textContent = $test.expression;
			// Set cursor to end of expression
			if (expressionTextArea.childNodes[0] != undefined) {
				var range = document.createRange();
				var sel = window.getSelection();
				range.setStart(expressionTextArea.childNodes[0], $test.expression.length);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
			expressionTextArea.focus();
		}}
		on:keyup={_ => dispatch("update", true)}
		bind:this={expressionTextArea}
		bind:textContent={$test.expression}
	/>
	<Options />
	<Flags />
</div>

<h2 class="mt-4 text-white">test data</h2>
<div
	class="container w-full flex flex-row flex-wrap h-auto overflow-y-auto rounded mb-2 shadow"
	contenteditable="true"
	role="textbox"
	tabindex="0"
	on:click={_ => {
		testTextArea.innerHTML = "";
		testTextArea.textContent = $test.testString;
		// Set cursor to end of expression
		if (testTextArea.childNodes[0] != undefined) {
			var range = document.createRange();
			var sel = window.getSelection();
			range.setStart(testTextArea.childNodes[0], $test.testString.length);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
		testTextArea.focus();
	}}
	on:keyup={_ => dispatch("update", false)}
	bind:this={testTextArea}
	bind:textContent={$test.testString}
/>
