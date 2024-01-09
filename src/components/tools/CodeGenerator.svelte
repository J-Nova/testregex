<style>
	.flavor-item {
		border: 1px solid var(--border-color);
	}

	.flavor-item:hover {
		background-color: var(--highlight-color);
	}

	.code {
		background-color: var(--secondary-text-color) !important;
		color: var(--primary-text-color) !important;
	}
</style>

<script>
	import Icon from "@iconify/svelte";
	import { FLAVORS } from "$lib/data.js";
	import { generation } from "$lib/codeTemplate.js";
	import { test } from "$lib/stores.js";

	function generate(flavor) {
		code = generation($test.expression, $test.testString, flavor);
	}
	$: flavors = Object.keys(FLAVORS);
	$: code = "Select one of the flavours to generate code.";
</script>

<div class="flex flex-col gap-2 w-full h-full">
	<div class="p-2">
		<h1>Code generator</h1>
	</div>

	<div class="grid grid-cols-6 w-full h-full">
		<div class="flex flex-col gap-2 p-2 h-full col-span-1 w-full">
			{#each flavors as availableFlavor}
				<button
					type="button"
					on:click={_ => generate(availableFlavor)}
					class="flavor-item p-1 cursor-pointer w-full select-none text-black rounded flex flex-row gap-1 items-center"
				>
					<Icon icon="carbon:code" />
					{availableFlavor}
				</button>
			{/each}
		</div>

		<textarea
			class="code w-full relative resize-none rounded cursor-text p-2 col-span-5 h-full"
			spellcheck="false"
			autocomplete="off"
			translate="no"
			placeholder="Select one of the flavours to generate code."
			bind:value={code}
		/>
	</div>
</div>
