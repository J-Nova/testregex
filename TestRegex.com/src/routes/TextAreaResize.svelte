<script>
	export let value = '';
	export let maxRows;
	export let minRows;
</script>

<div class="container">
	<pre
		aria-hidden="true"
		style="max-height: {maxRows}em; min-height: {minRows}em"
	>{value}</pre>

	<textarea bind:value autocomplete="off" translate="no" placeholder="Insert your test string here"></textarea>	
</div>

<style>
	.container {
		position: relative;
		width: 100%;
	}
	
	pre {
		color: transparent !important;
	}
	
	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
		background-color: inherit;
		border: none;
		outline: none;
		color: var(--body-primary);
		overflow-y: auto;
		box-sizing: border-box;
		padding: 10px;
	}

	::placeholder {
			color : var(--body-primary);
	}
</style>