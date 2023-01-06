<script>
	export let maxRows;
	export let minRows;
	export let callback;
	export let highlight_area;
	export let value = '';
	let backdrop;
	let textArea;

	function srollFn(){
        backdrop.scrollTop = textArea.scrollTop;
    }

	function matchColors() {

        customArea.innerHTML = `<spam style="background-color:"red">${string}</spam>`
    }
</script>

<div class="container">
	<pre
		bind:this={backdrop}
		aria-hidden="true"
		style="max-height: {maxRows}em; min-height: {minRows}em"
	>
	<div class="custom-area {highlight_area}">{value}</div>
	</pre>

	<textarea 
		bind:this={textArea}
		bind:value
		on:input={callback()}
		on:scroll={srollFn}
		spellcheck="false" 
		autocomplete="off" 
		translate="no" 
		placeholder="Insert your test string here" 
	></textarea>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
	}
	
	pre {
		/* pointer-events: none; */
		background-color: var(--body-tertiary);
		color: transparent;
	}
	
	pre, textarea{
		word-wrap: break-word;
		white-space:pre-line;
		overflow: auto;
		word-break: break-all;
		
		letter-spacing: 1px;
		line-height: 1;
		
		width: 100%;
		height: 100%;

		font-family: 'Courier New', Courier, monospace;
		font-size: small;
		font-weight: 400;

		padding: 10px;
		box-sizing: border-box;
		margin:0;
	}

	textarea {
		position: absolute;
		top: 0;
		background-color: transparent !important;
		resize: none;
		border: none;
		outline: none;
		/* color: transparent !important; */
	}

	::placeholder {
		color : var(--body-primary);
	}
</style>