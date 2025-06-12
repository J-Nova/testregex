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

<div class="card p-4 flex-grow flex flex-col max-h-[45svh]">
	{#if highlightItem !== undefined}
		<Item
			item={highlightItem}
			on:closeHighlight={_ => {
				highlightItem = undefined;
			}}
		/>
	{:else}
		<h2 class="font-semibold mb-2">Lookup</h2>
		<div class="grid grid-cols-2 gap-4 flex-grow overflow-hidden">
			<div class="col-span-1 w-full">
				<input
					type="text"
					placeholder="Search..."
					spellcheck="false"
					on:keyup={search}
					bind:value={searchString}
					class="w-full p-2 mb-3 themed-bg border themed-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>
				<div class="space-y-2 overflow-y-auto grow justify-start h-full">
					<button
						class="w-full text-left p-2 themed-bg border themed-border rounded-lg hover:bg-opacity-80 transition-colors secondary-text"
						on:click={_ => getCategoryData("all")}
					>
						<span class="secondary-text font-semibold">All tokens</span>
					</button>
					{#each Object.keys(quickref) as category}
						<button
							class="w-full text-left p-2 themed-bg border themed-border rounded-lg hover:bg-opacity-80 hover:bg-slate-500 transition-colors secondary-text capitalize"
							on:click={_ => getCategoryData(category)}
						>
							<span class="secondary-text font-semibold">{category}</span>
						</button>
					{/each}
				</div>
			</div>
			<div class="col-span-1 flex flex-col overflow-hidden h-full">
				<div class="space-y-2 overflow-y-auto flex-grow justify-start">
					{#each selectedItems as item}
						<button
							class="w-full flex justify-between p-2 themed-bg border themed-border rounded-lg hover:bg-opacity-80 transition-colors hover:text-blue-500"
							on:click={_ => {
								highlighter(item);
							}}
						>
							<span
								class="text-left flex-grow text-ellipsis overflow-hidden whitespace-nowrap mr-2"
								>{item.desc}</span
							>
							<span class="text-green-500 whitespace-nowrap flex-shrink-0"
								>{item.token}</span
							>
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
