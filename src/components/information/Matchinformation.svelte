<style>
	.match {
		display: flex;
		flex-direction: row;
		padding: 5px;
		gap: 5px;
		background-color: var(--highlight-color);
		width: auto;
		height: fit-content;
		border-radius: 3px;
		margin-right: 6px;
	}

	.match div:nth-child(2) {
		border: 0px;
		border-right: 1px solid;
		padding-right: 5px;
	}
</style>

<script>
	import { match } from "$lib/stores.js";
</script>

<div class="card p-4">
	<h2 class="font-semibold mb-2">Match Information</h2>
	<div class="text-sm secondary-text">
		{#if $match.testHighlight.length == 0}
			<span>{$match.information}</span>
		{:else}
			<ul class="mt-2 space-y-1 list-disc list-inside overflow-y-auto max-h-[20svh]">
				{#each $match.testHighlight.filter(item => item.className !== "no-match") as match}
					<li class="match flex flex-row p-1 gap-1 border rounded">
						{#if match.groupNumber !== undefined && match.groupNumber !== 0}
							<div>{`Group (${match.groupName}) ${match.groupName}`}</div>
						{:else}
							<div>Match {match.matchNumber}</div>
						{/if}
						<div>{match.start}-{match.end}</div>
						<div>{match.content}</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
