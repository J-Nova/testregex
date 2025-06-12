<style>
	.container {
		background-color: var(--primary);
	}

	.tool {
		border: 1px solid var(--border-color);
		color: var(--secondary-text-color);
	}
</style>

<script>
	// @ts-nocheck

	import Icon from "@iconify/svelte";
	import Modal from "svelte-simple-modal";
	import CodeGenerator from "./CodeGenerator.svelte";

	function generateCode() {
		popup = CodeGenerator;
	}

	$: popup = undefined;
</script>

<Modal
	classWindowWrap="codewrap"
	classWindow="codewindow"
	classContent="codecontent"
	show={popup}
/>

<!-- <div class="flex flex-col gap-2 select-none">
	<h2 class="p-2 text-white">Tools</h2>
	<div class="container flex flex-col gap-2 select-none p-2">
		<button
			type="button"
			disabled
			class="tool rounded flex flex-row items-center gap-1 p-0.5 mb-1 mt-1 text-black cursor-not-allowed"
		>
			<Icon class="icon" icon="carbon:save" />
			Save
		</button>
		<button
			type="button"
			class="tool rounded flex flex-row items-center gap-1 p-0.5 cursor-pointer mb-1 mt-1 text-black"
			on:click={generateCode}
		>
			<Icon class="icon" icon="carbon:edge-node" />
			Code generator
		</button>
	</div>
</div> -->

<div class="card p-4">
	<h2 class="font-semibold mb-3">Tools</h2>
	<div class="space-y-2">
		<button
			disabled
			class="w-full flex items-center space-x-2 p-2 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			<i data-lucide="file-check-2" class="w-4 h-4 secondary-text" />
			<span>Save</span>
		</button>
		<button
			on:click={generateCode}
			class="w-full flex items-center space-x-2 p-2 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			<i data-lucide="code" class="w-4 h-4 secondary-text" />
			<span>Code Generator</span>
		</button>
	</div>
</div>
