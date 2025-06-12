<style>
	.dropdown-content {
		display: none;
		position: absolute;
		z-index: 1;
		word-wrap: break-word;
		overflow: auto;
		max-height: 30rem;
		max-width: fit-content;
	}

	.container:hover .dropdown-content {
		display: flex;
		flex-direction: column;
		width: fit-content;
	}
</style>

<script>
	import { test } from "$lib/stores.js";
	import { FLAVORS } from "$lib/data.js";
	$: flavorObj = FLAVORS[$test.flavor];

	function setDelimiter(delimiter) {
		$test.delimiter = delimiter;
		availableDelimiters = availableDelimiters;
	}

	function checkedDelimiter(delim) {
		if ($test.delimiter === delim) {
			return true;
		} else {
			return false;
		}
	}

	$: availableDelimiters = FLAVORS[$test.flavor].delimiters;
</script>

<div class="container w-min">
	<div class="text-lg flex flex-row gap-0">
		<span>{flavorObj.start}</span>
		<span>{$test.delimiter}</span>
	</div>
	<div
		class="dropdown-content gap-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700 shadow-lg"
	>
		{#each availableDelimiters as delimiter}
			<button
				type="button"
				on:click={_ => {
					setDelimiter(delimiter);
				}}
				class="border border-gray-400 rounded p-2 text-xl {checkedDelimiter(delimiter)
					? 'bg-gray-300 hover:bg-gray-500 dark:hover:bg-gray-400'
					: 'hover:bg-gray-200 hover:dark:bg-gray-600'}"
			>
				<span>{delimiter}</span></button
			>
		{/each}
	</div>
</div>
