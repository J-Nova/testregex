<script>
	import Icon from "@iconify/svelte";
	import { FLAVORS } from "$lib/data.js";
	import { generation } from "$lib/codeTemplate.js";
	import { test } from "$lib/stores.js";
	import { Code } from "lucide-svelte";

	let selectedFlavor = null;

	function generate(flavor) {
		selectedFlavor = flavor;
		code = generation($test.expression, $test.testString, flavor);
	}

	$: flavors = Object.keys(FLAVORS);
	$: code = "Select one of the flavours to generate code.";
</script>

<div class="flex flex-col gap-4 w-full h-full p-4">
	<div class="flex items-center space-x-2">
		<Code size={12} />
		<h1 class="text-xl font-bold">Code Generator</h1>
	</div>

	<div class="grid grid-cols-6 gap-4 w-full h-full">
		<div class="col-span-1 flex flex-col space-y-2">
			<h2 class="font-semibold mb-2">Languages</h2>
			<div class="flex flex-col gap-2">
				{#each flavors as availableFlavor}
					<button
						type="button"
						on:click={() => generate(availableFlavor)}
						class="p-3 cursor-pointer w-full select-none rounded-lg
							   flex flex-row gap-2 items-center justify-start
							   themed-bg border themed-border
							   hover:shadow-sm hover:bg-opacity-80 hover:-translate-y-px
							   focus:outline-none focus:ring-2 focus:ring-indigo-500
							   transition-all duration-200 ease-in-out font-medium
							   {selectedFlavor === availableFlavor ? 'ring-2 ring-indigo-400 bg-opacity-90' : ''}"
					>
						<span class="text-[0.65rem]">{availableFlavor}</span>
					</button>
				{/each}
			</div>
		</div>

		<div class="col-span-5 flex flex-col">
			<div class="card p-4 flex flex-col h-full">
				<h2 class="font-semibold mb-3">Generated Code</h2>
				<div class="relative flex-grow">
					<textarea
						class="w-full h-full p-3 themed-bg border themed-border rounded-lg
							   resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500
							   whitespace-pre-wrap font-mono text-sm leading-relaxed"
						spellcheck="false"
						autocomplete="off"
						translate="no"
						placeholder="Select one of the languages to generate code."
						bind:value={code}
						readonly
					/>
				</div>
				{#if selectedFlavor}
					<div class="mt-2 text-sm opacity-75">
						Generated {selectedFlavor} code for your regular expression
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
