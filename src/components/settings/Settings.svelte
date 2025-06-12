<style>
	button {
		border: 1px solid var(--tertiary);
		border-radius: 3px;
	}
</style>

<script>
	// @ts-nocheck

	import Modal from "svelte-simple-modal";
	import EditPopup from "./EditPopup.svelte";
	import { Moon } from "lucide-svelte";
	import { theme } from "$lib/stores.js";
	$: popup = undefined;
</script>

<Modal
	classWindowWrap="fixed inset-0 z-50 flex items-center justify-center p-4"
	classWindow="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl"
	classContent="w-full h-full overflow-hidden"
	show={popup}
/>

<div class="card p-4 flex items-center justify-between">
	<button
		on:click={() => {
			popup = EditPopup;
		}}
		class="flex items-center space-x-2 p-3 rounded-lg transition-colors
			   cursor-pointer themed-bg border themed-border
			   hover:shadow-sm hover:bg-opacity-80
			   focus:outline-none focus:ring-2 focus:ring-indigo-500"
	>
		<span class="font-medium">Settings</span>
	</button>
	<!-- <Moon
		class="w-5 h-5 cursor-pointer select-none"
		on:click={() => {
			theme.update(t => {
				t.toggleDarkMode();
				return t;
			});
		}}
	/> -->
</div>
