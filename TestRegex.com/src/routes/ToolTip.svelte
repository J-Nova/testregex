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
		if (objAttributes.classNames.length > 0) {
			value = "Group " + (parseInt(objAttributes.groupNumber)+1) + "(" + objAttributes.groupNames+ ")" + ": " + objAttributes.content;
		} else {
			value = "Group " + (parseInt(objAttributes.groupNumber)+1) + ": " + objAttributes.content;
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
		<header>Match - {(parseInt(objAttributes.matchNumber)+1)}</header>
		{dataString()}
		Position: {objAttributes.start}-{objAttributes.end}
	</div>
{/if}

<style>
	.tooltip {
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		background: white;
		border-radius: 4px;
		padding: 4px;
		position: absolute;
		z-index: 0;
	}

	.match0 {
		background-color: var(--match_color_1);
	}
	.match0_2 {
		background-color: var(--match_color_2);
	}
	
</style>