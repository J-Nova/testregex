<script>
	import { editor, test, match, theme } from "$lib/stores.js";
	import { updateRegex } from "$lib/matcher.js";
	import { testHighlighter } from "$lib/explainer.js";

	import Quickref from "$components/information/Quickref.svelte";
	import Matchinformation from "$components/information/Matchinformation.svelte";
	import Matchexplanation from "$components/information/Matchexplanation.svelte";
	import Expression from "$components/expression/Expression.svelte";
	import Flavour from "$components/Flavour.svelte";
	import Tools from "$components/tools/Tools.svelte";
	import Settings from "$components/settings/Settings.svelte";
	import { Github, Linkedin, ScanLine } from "lucide-svelte";
	import Socials from "$components/settings/Socials.svelte";

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

<div
	id="app"
	class={`h-screen p-4 grid grid-cols-1 lg:grid-cols-10 gap-4 ${
		$theme.darkMode ? "theme-dark" : "theme-light"
	}`}
>
	<div class="settings-content flex flex-col justify-between gap-1 col-span-1">
		<!-- Left Sidebar -->
		<aside class="lg:col-span-2 flex flex-col justify-between space-y-4">
			<div class="space-y-4">
				<div class="flex items-center space-x-2">
					<ScanLine class="primary-text" />
					<h1 class="text-xl font-bold">TestRegex</h1>
				</div>

				<!-- Flavour Section -->
				<Flavour />

				<!-- Tools Section -->
				<Tools />
			</div>

			<!-- Settings & Socials -->
			<div class="space-y-2">
				<Socials />
				<Settings />
			</div>
		</aside>
	</div>

	<Expression on:update={updateExpression} />

	<aside class="lg:col-span-3 flex flex-col space-y-4">
		<Matchexplanation />

		<Matchinformation />

		<Quickref />
	</aside>
</div>
