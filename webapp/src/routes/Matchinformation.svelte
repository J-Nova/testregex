<style>
	.info-container {
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
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

<div class="right-container">
	<h2>Information</h2>
	<div class="info-container">
		{#if $match.testHighlight.length == 0}
			<span>{$match.information}</span>
		{:else}
			{#each $match.testHighlight.filter(item => item.className !== "no-match") as match}
				<div class="match">
					{#if match.groupNumber !== undefined && match.groupNumber !== 0}
						<div>{`Group (${match.groupName}) ${match.groupName}`}</div>
					{:else}
						<div>Match {match.matchNumber}</div>
					{/if}
					<div>{match.start}-{match.end}</div>
					<div>{match.content}</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
