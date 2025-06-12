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

<Modal show={popup} />

<div class="card p-2 flex items-center justify-between">
	<button
		on:click={_ => {
			popup = EditPopup;
		}}
		id="theme-toggle"
		class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
	>
		<span class="text-sm font-medium">Settings</span>
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
