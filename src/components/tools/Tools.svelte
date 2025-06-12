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

<Modal show={popup} />

<div class="card p-4">
	<h2 class="font-semibold mb-3">Tools</h2>
	<div class="space-y-2">
		<button
			disabled
			class="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
				   cursor-not-allowed opacity-50 themed-bg border themed-border"
		>
			<Icon icon="carbon:save" class="w-5 h-5" />
			<span class="font-medium">Save</span>
		</button>
		<button
			on:click={generateCode}
			class="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
				   cursor-pointer themed-bg border themed-border
				   hover:shadow-sm hover:bg-opacity-80
				   focus:outline-none focus:ring-2 focus:ring-indigo-500"
		>
			<Icon icon="carbon:code" class="w-5 h-5" />
			<span class="font-medium">Code Generator</span>
		</button>
	</div>
</div>
