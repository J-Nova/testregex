<style>
	.container {
		display: flex;
		flex-direction: row;
		gap: 1%;
		height: 100%;
		width: 100%;
	}

	.settings-content {
		display: flex;
		flex-direction: column;
		gap: 1%;
		max-width: 15%;
		width: 100%;
		height: 100%;
		background-color: var(--secondary);
		color: var(--primary-text-color);
		overflow-y: overlay;
	}

	.main-content {
		display: grid;
		grid-template-rows: 3rem 2.5rem 4rem auto;
		max-width: 59%;
		width: 100%;
		padding: 0rem 1rem 0rem 1rem;
		background-color: var(--secondary);
	}

	.informative-content {
		display: flex;
		flex-direction: column;
		max-width: 30%;
		width: 100%;
		height: 100%;
		background-color: var(--secondary);
		padding: 1rem;
		gap: 1rem;
		color: var(--secondary-text-color);
	}

	@media screen and (max-width: 800px) {
		.informative-content {
			display: none;
			visibility: hidden;
		}
		.main-content {
			max-width: 100%;
		}
	}

	@media screen and (max-width: 900px) {
		.settings-content {
			display: none;
			visibility: hidden;
		}
		.main-content {
			max-width: 100%;
		}
	}
</style>

<script>
	// @ts-nocheck
	import Modal from "svelte-simple-modal";
	import Popup from "./WIPPopup.svelte";

	import { editor, test, match } from "$lib/stores.js";
	import { updateRegex } from "$lib/matcher.js";
	import { testHighlighter } from "$lib/explainer.js";

	import Quickref from "./Quickref.svelte";
	import Matchinformation from "./Matchinformation.svelte";
	import Matchexplanation from "./Matchexplanation.svelte";
	import Expression from "$components/expression/Expression.svelte";
	import TestData from "$components/testData/TestData.svelte";
	import Ad from "./Socials.svelte";
	import Flavour from "./Flavour.svelte";
	import Tools from "$components/tools/Tools.svelte";
	import Settings from "$components/settings/Settings.svelte";
	let expressionTimer;

	function updateExpression(explain) {
		if ($test.expression.length == 0) {
			$match.clear();
			$match = $match;
			$editor.testLock = false;
			$editor.updateMatchStatus(3);
			return;
		}
		if (expressionTimer && clearTimeout(expressionTimer)) {
			expressionTimer = setTimeout(function () {
				console.log("locking editor");
				$editor.editorLock = true;
				$editor.testLock = true;
			}, $editor.editorLockTimeout);
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
			$editor = $editor;
		} else {
			// No match
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
			errorCallback({ error: explanationData.error.message });
		}
	}
</script>

<Modal show={Popup} />
<div class="container">
	<div class="settings-content">
		<Ad />
		<Flavour />
		<Tools />
		<Settings />
	</div>
	<div class="main-content">
		<Expression on:update={updateExpression} />
		<TestData on:update={updateExpression} />
	</div>

	<div class="informative-content">
		<Matchexplanation />
		<Matchinformation />
		<Quickref />
	</div>
</div>
