<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 20%;
		padding: 6px;
	}

	.token {
		color: var(--senary);
	}

	.test {
		color: var(--primary-text-color);
	}

	.information {
		font-size: 80%;
		padding: 6px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px;
		border-bottom: 1px solid var(--border-color);
	}

	.example {
		border: 1px solid var(--border-color);
		border-radius: 3px;
		width: 100%;
		height: auto;
		background-color: var(--secondary);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.load {
		background-color: var(--tertiary);
		border-radius: 100%;
		height: 25px;
		width: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10px;
		cursor: pointer;
	}
</style>

<script>
	import { createEventDispatcher } from "svelte";
	import Icon from "@iconify/svelte";
	const dispatch = createEventDispatcher();
	export let item;
	$: info = item.info;
	$: desc = item.desc;
	$: token = item.token;
</script>

<card class="container">
	<div class="header">
		<span class="description">{desc}</span>
	</div>
	<div>
		<div class="example">
			<div class="container">
				<span class="token">/{token}/g</span>
				<div class="information">
					<span class="token">{token}</span>
					<span class="test">{info}</span>
				</div>
			</div>
			<button
				class="load"
				type="button"
				on:click={_ => {
					dispatch("closeHighlight");
				}}
			>
				<Icon icon="carbon:arrow-right" />
			</button>
		</div>
	</div>
</card>
