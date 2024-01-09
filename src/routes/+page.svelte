<style>
	.settings-content {
		background-color: var(--secondary);
		color: var(--primary-text-color);
	}

	.main-content {
		grid-template-rows: 3rem 2.5rem 4rem auto;
		padding: 0rem 1rem 0rem 1rem;
		background-color: var(--secondary);
	}

	.informative-content {
		background-color: var(--secondary);
		color: var(--secondary-text-color);
	}

	@media screen and (max-width: 800px) {
		.informative-content {
			display: none;
			visibility: hidden;
		}
	}

	@media screen and (max-width: 900px) {
		.settings-content {
			display: none;
			visibility: hidden;
		}
	}
</style>

<script>
	// @ts-nocheck
	import Modal from "svelte-simple-modal";
	import Popup from "$components/WIPPopup.svelte";

	import { editor, test, match } from "$lib/stores.js";
	import { updateRegex } from "$lib/matcher.js";
	import { testHighlighter } from "$lib/explainer.js";

	import Quickref from "$components/information/Quickref.svelte";
	import Matchinformation from "$components/information/Matchinformation.svelte";
	import Matchexplanation from "$components/information/Matchexplanation.svelte";
	import Expression from "$components/expression/Expression.svelte";
	import Socials from "$components/Socials.svelte";
	import Flavour from "$components/Flavour.svelte";
	import Tools from "$components/tools/Tools.svelte";
	import Settings from "$components/settings/Settings.svelte";

	function updateExpression(explain) {
		if ($test.expression.length == 0) {
			$match.clear();
			$match = $match;
			$editor.updateMatchStatus(3);
			return;
		}
		updateRegex(
			$test,
			errorCallback,
			successCallback,
			timeoutCallback,
			explainCallback,
			explain
		);
	}

	function successCallback(data) {
		if (Object.keys(data.result).length > 0) {
			$editor.updateMatchStatus(1);
			$match.result = data;
			$match.testHighlight = testHighlighter(data.result, $test.testString);
		} else {
			// No match
			$match.result = {};
			$match.testHighlight = [];
			$match.information = "No matches found, please see explanation above.";
			$editor.updateMatchStatus(0);
		}
	}

	function errorCallback(data) {
		$match.astTree = data;
		$match.information =
			"Your expression contains one or more faults, please see explanation above.";
		$editor.updateMatchStatus(2);
	}

	function timeoutCallback() {
		$match.astTree = { error: "Timed out while waiting on expression results" };
		$match.information =
			"Detailed match information will be displayed here automatically.";
		$editor.updateMatchStatus(2);
	}

	function explainCallback(explanationData) {
		if (explanationData.explanation.success) {
			$editor.updateMatchStatus(0);
			$match.astTree = explanationData.explanation.body;
			$match.expressionHighlight = explanationData.tooltipData;
		} else {
			$editor.updateMatchStatus(2);
			errorCallback({ error: explanationData.explanation.error.message });
		}
	}
</script>

<Modal show={Popup} />
<div class="grid grid-cols-6 gap-2 h-full">
	<div class="settings-content flex flex-col justify-between gap-1 col-span-1">
		<div>
			<Socials />
			<Flavour />
			<Tools />
		</div>
		<Settings />
	</div>
	<div class="main-content grid col-span-3">
		<Expression on:update={updateExpression} />
	</div>

	<div class="informative-content col-span-2 p-4 grid-rows-3 max-h-screen">
		<Matchexplanation />
		<Matchinformation />
		<Quickref />
	</div>
</div>
