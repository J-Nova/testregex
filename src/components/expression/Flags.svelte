<style>
	::-webkit-scrollbar-thumb {
		background: var(--primary);
		border-radius: 8px;
	}
	.checked {
		border: 1px solid var(--checked-border-color);
		border-radius: 3px;
		color: var(--primary-text-color);
		cursor: pointer;
	}

	.unchecked {
		border: 1px solid var(--unchecked-border-color);
		border-radius: 3px;
		color: var(--primary-text-color);
		cursor: pointer;
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
		user-select: none;
	}

	.dropdown-content #flag {
		display: block;
		padding: 2px;
		border-radius: 3px;
	}

	.container:hover .dropdown-content {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
	}

	.dropbtn {
		padding: 0px 12px;
		font-size: x-large;
		border: none;
		cursor: pointer;
		color: var(--flag-color);
	}

	.full {
		font-weight: bold;
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
			return "checked";
		} else {
			return "unchecked";
		}
	}

	$: availableFlags = FLAVORS[$test.flavor].flags;
</script>

<div class="container w-min">
	<span class="dropbtn">
		{$test.flags.length > 0 ? $test.getFlags() : "-"}
	</span>
	<div class="dropdown-content">
		{#each availableFlags as availableFlag}
			<button
				type="button"
				on:click={_ => {
					setFlags(availableFlag);
				}}
				class={checkedFlag(availableFlag)}
				id="flag"
			>
				<span id="flag" class="full"
					>{availableFlag[Object.keys(availableFlag)[0]].full}</span
				>
				<span>{availableFlag[Object.keys(availableFlag)[0]].desc}</span>
			</button>
		{/each}
	</div>
</div>
