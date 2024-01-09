<style>
	.checked {
		border: 1px solid var(--checked-border-color);
		color: var(--checked-text-color);
	}

	.unchecked {
		border: 1px solid var(--unchecked-border-color);
		color: var(--unchecked-text-color);
	}

	.checked:hover,
	.unchecked:hover {
		background-color: var(--highlight-color);
	}

	.dropdown-content {
		border: 1px solid var(--border-color);
		display: none;
		position: absolute;
		background-color: var(--secondary);
		z-index: 1;
		word-wrap: break-word;
		box-shadow: 0 0 10px 3px rgb(0 0 0 / 50%);
		border-radius: 3px;
		max-height: 30rem;
		overflow: auto;
		max-width: 15rem;
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
			return "checked";
		} else {
			return "unchecked";
		}
	}

	$: availableDelimiters = FLAVORS[$test.flavor].delimiters;
</script>

<div class="container w-min">
	<div class="text-lg flex flex-row gap-0">
		<span>{flavorObj.start}</span>
		<span>{$test.delimiter}</span>
	</div>
	<div class="dropdown-content gap-1 p-2 rounded">
		{#each availableDelimiters as delimiter}
			<button
				type="button"
				on:click={_ => {
					setDelimiter(delimiter);
				}}
				class={`rounded p-2 text-xl ${checkedDelimiter(delimiter)}`}
			>
				{delimiter}
			</button>
		{/each}
	</div>
</div>
