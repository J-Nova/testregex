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

	.tool {
		border: 1px solid var(--border-color);
		border-radius: 3px;
		color: var(--secondary-text-color);
		padding: 3px;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 5%;
	}
</style>

<script>
	import Icon from "@iconify/svelte";
	import Modal from "svelte-simple-modal";
	import CodeGenerator from "./CodeGenerator.svelte";

	function generateCode() {
		popup = CodeGenerator;
	}

	$: popup = undefined;
</script>

<Modal
	classWindowWrap="codewrap"
	classWindow="codewindow"
	classContent="codecontent"
	show={popup}
/>

<div>
	<h2>Tools</h2>
	<div class="container">
		<span class="tool">
			<Icon class="icon" icon="carbon:save" />
			Save
		</span>
		<span class="tool" on:keydown on:click={generateCode}>
			<Icon class="icon" icon="carbon:edge-node" />
			Code generator
		</span>
	</div>
</div>
