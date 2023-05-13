<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 6px;
		user-select: none;
	}
	.container {
		background-color: var(--primary);
		padding: 6px;
	}

	span {
		padding: 3px;
		color: var(--secondary-text-color);
		cursor: pointer;
	}
	.icon {
		color: var(--secondary-text-color);
		margin-right: 3px;
		vertical-align: text-top;
	}
	.code {
		border: 1px solid var(--checked-border-color);
		border-radius: 3px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 5%;
	}
	.code-hide {
		border: 1px solid var(--unchecked-border-color);
		border-radius: 3px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 5%;
	}
</style>

<script>
	import { test } from "$lib/stores.js";
	import { FLAVORS } from "$lib/data.js";
	import Icon from "@iconify/svelte";

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

<div>
	<h2>Flavour</h2>
	<div class="container">
		{#each flavors as availableFlavor}
			<span
				class={className(availableFlavor)}
				on:keydown
				on:click={_ => selectFlavour(availableFlavor)}
			>
				<Icon class="icon" icon="carbon:{className(availableFlavor)}" />
				{availableFlavor}
			</span>
		{/each}
	</div>
</div>
