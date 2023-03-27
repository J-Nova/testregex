<script>
	export let objAttributes;
	let isHovered = false;
	let x;
	let y;


	function classString(){
		return objAttributes.classNames.join(" ");
	}

	function dataString(){
		let value;
		if (objAttributes.classNames.length > 1) {
			objAttributes.groupNames = objAttributes.groupNames.filter(function(e){return e}); 
			let groupname = objAttributes.groupNames.length == 0 ? "" : "(" + objAttributes.groupNames+ ")";
			value = "Group " + (parseInt(objAttributes.groupNumber)+1) + groupname + ": " + objAttributes.content;
		} else {
			value = "Matched: " + objAttributes.content;
		}
		return value;
	}

	function showTooltip(event) {
		if (!isHovered){
			isHovered = true;
			x = event.layerX;
			y = event.layerY - 50;
		}
	}
	
	function mouseLeave() {
		isHovered = false;
	}
</script>


<span
	class="{classString()}"
	on:focus={showTooltip}
	on:focusin={showTooltip}
	on:focusout={mouseLeave}
	on:pointerover={showTooltip}
	on:pointerdown={showTooltip}
	on:pointerenter={showTooltip}
	on:pointermove={showTooltip}
	on:mousemove={showTooltip}
	on:mouseenter={showTooltip}
	on:mouseover={showTooltip}
	on:pointerleave={mouseLeave}
    on:mouseleave={mouseLeave}>
	{objAttributes.content}
</span>

{#if isHovered && objAttributes.isMatch}
	<div style="top: {y}px; left: {x}px;" class="tooltip">
		<span class="header">Match - {(parseInt(objAttributes.matchNumber)+1)}</span>
		<span class="match-data">
			{dataString()}
		</span>
		<span class="match-position">
			Position: {objAttributes.start}-{objAttributes.end}
		</span>
	</div>
{/if}

<style>
	.tooltip {
		border: 1px solid var(--border-color);
		box-shadow: 0 0 10px 3px rgb(0 0 0 / 20%);
		background: var(--secondary);
		color: var(--primary-text-color);
		border-radius: 3px;
		padding: 10px;
		position: absolute;
		z-index: 0;
		display: flex;
		flex-direction: column;
		font-size:medium;
	}

	.match0 {
		background-color: var(--senary);
	}
	.match0_2 {
		background-color: var(--tertiary);
	}
	
</style>