<script>
	import { JsonView } from "@zerodevx/svelte-json-view";
	import { editor, match } from "$lib/stores.js";

	let textColors = {
		"--match-status-color": "--jsonValStringColor: var(--senary);",
		"--base-status-color": "--jsonValStringColor: var(--senary);",
		"--no-match-status-color": "--jsonValStringColor: var(--senary);",
		"--error-status-color": "--jsonValStringColor: var(--error-status-color);",
	};
</script>

<div class="card p-4">
	<h2 class="font-semibold mb-2">Explanation</h2>
	<div
		class="overflow-y-auto text-sm secondary-text space-y-2 max-h-[20svh]"
		style={textColors[$editor.statusColor]}
	>
		{#if $match.astTree == void 0 || Object.keys($match.astTree).length == 0}
			<span class="base"
				>An explanation will automatically be generated about your regex expression.</span
			>
		{:else}
			<JsonView json={$match.astTree} />
		{/if}
	</div>
</div>
