<style>
	::-webkit-scrollbar-thumb {
		background: var(--primary);
		border-radius: 8px;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		z-index: 1;
		word-wrap: break-word;
		border-radius: 3px;
		max-height: 30rem;
		overflow: auto;
		max-width: fit-content;
		user-select: none;
		border: 1px solid var(--border-color);
	}

	.container:hover .dropdown-content {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		width: fit-content;
	}
</style>

<script>
	import { test } from "$lib/stores.js";
	import { FLAVORS } from "$lib/data.js";

	function setFlags(updateFlag) {
		updateFlag = Object.keys(updateFlag)[0];
		if ($test.flags.includes(updateFlag)) {
			$test.flags = $test.flags.filter(e => e !== updateFlag);
		} else {
			$test.flags.push(updateFlag);
			$test.flags = $test.flags;
		}
		availableFlags = FLAVORS[$test.flavor].flags;
	}

	function checkedFlag(flag) {
		if ($test.flags.includes(Object.keys(flag)[0])) {
			return true;
		} else {
			return false;
		}
	}

	$: availableFlags = FLAVORS[$test.flavor].flags;
</script>

<div class="container w-min">
	<div class="text-lg flex flex-row gap-0">
		<span>{$test.flags.length > 0 ? $test.getFlags() : "-"}</span>
	</div>
	<div
		class="dropdown-content gap-1 p-2 rounded-md bg-gray-100 dark:bg-gray-700 shadow-lg"
	>
		{#each availableFlags as availableFlag}
			<button
				type="button"
				on:click={_ => {
					setFlags(availableFlag);
				}}
				class="border border-gray-400 rounded p-2 text-xl {checkedFlag(availableFlag)
					? 'bg-gray-300 hover:bg-gray-500 dark:hover:bg-gray-400'
					: 'hover:bg-gray-200 hover:dark:bg-gray-600'}"
			>
				<div class="text-left">
					<div class="font-bold">
						{availableFlag[Object.keys(availableFlag)[0]].full}
					</div>
					<div class="text-sm">
						{availableFlag[Object.keys(availableFlag)[0]].desc}
					</div>
				</div>
			</button>
		{/each}
	</div>
</div>
