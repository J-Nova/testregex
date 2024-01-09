<style>
	.container {
		background-color: var(--primary);
	}
	.icon {
		color: var(--secondary-text-color);
	}
	.code {
		border: 1px solid var(--checked-border-color);
	}
	.code-hide {
		border: 1px solid var(--unchecked-border-color);
	}
</style>

<script>
	import { test } from "$lib/stores.js";
	import { FLAVORS } from "$lib/data.js";
	import Icon from "@iconify/svelte";

	/**
	 * @param {string} flavor
	 */
	function className(flavor) {
		if (flavor === $test.flavor) {
			return "code";
		}
		return "code-hide";
	}

	function selectFlavour(flavor) {
		$test.flavor = flavor;
		$test.delimiter = FLAVORS[flavor].delimiters[0];
		flavors = flavors;
	}

	$: flavors = Object.keys(FLAVORS);
</script>

<div class="flex flex-col gap-1 select-none">
	<h2 class="p-2 text-white">Flavour</h2>
	<div class="container p-2">
		{#each flavors as availableFlavor}
			<button
				type="button"
				class={`rounded flex flex-row items-center gap-1 p-0.5 cursor-pointer mb-1 mt-1 w-full text-black ${className(
					availableFlavor
				)}`}
				on:click={_ => selectFlavour(availableFlavor)}
			>
				<Icon class="icon mr-1" icon="carbon:{className(availableFlavor)}" />
				{availableFlavor}
			</button>
		{/each}
	</div>
</div>
