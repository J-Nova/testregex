<style>
	input::placeholder {
		color: var(--primary-text-color);
	}

	input {
		background-color: var(--background-color);
		color: var(--primary-text-color);
	}
	.border-color {
		border: 1px solid var(--border-color);
	}

	.result-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: inherit;
		border: none;
		width: 100%;
		cursor: pointer;
	}

	.desc {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		flex-grow: 1;
		text-align: left;
		margin-right: 10px;
	}

	.token {
		color: #3cb371;
		white-space: nowrap;
		flex-shrink: 1;
	}
</style>

<script>
	// @ts-nocheck
	import { quickref } from "$lib/quickref.js";
	import { test } from "$lib/stores.js";
	import Item from "./Quickref-item.svelte";

	function getCategoryData(categoryKey) {
		let items = [];
		if (categoryKey === "all") {
			Object.entries(quickref).forEach(([key, _]) => {
				Object.entries(quickref[key]).forEach(([_, value]) => {
					if (value.flavors.includes($test.flavor)) {
						items.push(value);
					}
				});
			});
		} else {
			Object.entries(quickref[categoryKey]).forEach(([_, value]) => {
				if (value.flavors.includes($test.flavor)) {
					items.push(value);
				}
			});
		}
		selectedItems = items;
		return items;
	}

	function getSearchData(searchString) {
		let items = [];
		Object.entries(quickref).forEach(([_, crItems]) => {
			crItems.forEach(item => {
				if (
					item.flavors.includes($test.flavor) &&
					(item.desc.includes(searchString) || item.info.includes(searchString))
				) {
					items.push(item);
				}
			});
		});
		selectedItems = items;
		return items;
	}

	function search() {
		if (searchString.length > 0) {
			getSearchData(searchString);
		} else {
			getCategoryData("all");
		}
	}

	function highlighter(item) {
		highlightItem = item;
	}

	$: selectedItems = getCategoryData("all");
	$: highlightItem = undefined;
	let searchString = undefined;
</script>

<div class="right-container row-span-1 rounded shadow">
	{#if highlightItem !== undefined}
		<Item
			item={highlightItem}
			on:closeHighlight={_ => {
				highlightItem = undefined;
			}}
		/>
	{:else}
		<h2>Lookup</h2>
		<div class="grid grid-cols-2 gap-2">
			<div class="col-span-1 w-full p-1">
				<input
					type="text"
					placeholder="Search..."
					spellcheck="false"
					on:keyup={search}
					bind:value={searchString}
					class="w-full rounded p-1 cursor-text"
				/>
				<button
					class="w-full text-left uppercase p-1 mt-1 mb-1 border-color rounded border"
					on:click={_ => getCategoryData("all")}>All tokens</button
				>
				{#each Object.keys(quickref) as category}
					<button
						class="w-full text-left uppercase p-0.5 mt-1 mb-1 rounded border-color"
						on:click={_ => getCategoryData(category)}
					>
						{category}
					</button>
				{/each}
			</div>
			<div class="col-span-1">
				{#each selectedItems as item}
					<button
						class="result-item"
						on:click={_ => {
							highlighter(item);
						}}
					>
						<div class="desc">{item.desc}</div>
						<div class="token">{item.token}</div>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
