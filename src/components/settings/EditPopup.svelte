<style>
	input {
		border: 1px solid var(--tertiary);
		width: 30%;
	}
</style>

<script>
	import { editor } from "$lib/stores.js";
	import Icon from "@iconify/svelte";
</script>

<div class="p-6 w-full h-full">
	<div class="flex items-center space-x-2 mb-6">
		<Icon icon="carbon:settings" class="text-xl" />
		<h1 class="text-xl font-bold">Settings</h1>
	</div>

	<div class="space-y-6">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
			<div class="flex-1">
				<p class="font-medium text-sm">Execution timeout:</p>
				<p class="text-xs opacity-75 mt-1">
					Maximum time (ms) to wait for regex execution
				</p>
			</div>
			<input
				class="w-full sm:w-32 p-2 rounded-lg themed-bg border themed-border
					   focus:outline-none focus:ring-2 focus:ring-indigo-500
					   text-right font-mono"
				type="number"
				bind:value={$editor.matchTimeout}
			/>
		</div>

		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
			<div class="flex-1">
				<p class="font-medium text-sm">Explain timeout:</p>
				<p class="text-xs opacity-75 mt-1">
					Maximum time (ms) to wait for regex explanation
				</p>
			</div>
			<input
				class="w-full sm:w-32 p-2 rounded-lg themed-bg border themed-border
					   focus:outline-none focus:ring-2 focus:ring-indigo-500
					   text-right font-mono"
				type="number"
				bind:value={$editor.explainTimeout}
			/>
		</div>

		<!-- Currently not supported -->
		<!-- <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
			<div class="flex-1">
				<p class="font-medium text-sm">Show tooltips:</p>
				<p class="text-xs opacity-75 mt-1">Display helpful tooltips in the editor</p>
			</div>
			<button
				class="w-full sm:w-auto px-4 py-2 rounded-lg themed-bg border themed-border
					   hover:shadow-sm hover:bg-opacity-80 transition-colors
					   focus:outline-none focus:ring-2 focus:ring-indigo-500
					   font-medium {$editor.showToolTips ? 'ring-2 ring-green-400' : ''}"
				on:click={() => {
					$editor.showToolTips = !$editor.showToolTips;
				}}
			>
				{$editor.showToolTips ? 'Enabled' : 'Disabled'}
			</button>
		</div>

		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
			<div class="flex-1">
				<p class="font-medium text-sm">Visualize special characters:</p>
				<p class="text-xs opacity-75 mt-1">Show visual indicators for whitespace and special characters</p>
			</div>
			<button
				class="w-full sm:w-auto px-4 py-2 rounded-lg themed-bg border themed-border
					   hover:shadow-sm hover:bg-opacity-80 transition-colors
					   focus:outline-none focus:ring-2 focus:ring-indigo-500
					   font-medium {$editor.visualizeSpecialCharacters ? 'ring-2 ring-green-400' : ''}"
				on:click={() => {
					$editor.visualizeSpecialCharacters = !$editor.visualizeSpecialCharacters;
				}}
			>
				{$editor.visualizeSpecialCharacters ? 'Enabled' : 'Disabled'}
			</button>
		</div> -->
	</div>
</div>
