<script>
	export let objAttributes;
	let isHovered = false;
	let x;
	let y;

	function classString(){
		return objAttributes.classNames.join(" ");
	}
	function mouseOver(event) {
		console.log(event);
		isHovered = true;
		x = event.layerX;
		y = event.layerY - 50;
	}
	function mouseMove(event) {
		x = event.layerX;
		y = event.layerY - 50;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>


<span
	class="{classString()}"
	on:focus
	on:focusin
	on:focusout
	on:mouseover={mouseOver}
    on:mouseleave={mouseLeave}
	on:mousemove={mouseMove}>	
	{objAttributes.content}
</span>

{#if isHovered && objAttributes.isMatch}
	<div style="top: {y}px; left: {x}px;" class="tooltip">
		Match: {objAttributes.matchNumber}
		Group: {objAttributes.groupNumber}
		Names: {objAttributes.groupNames}
		content: {objAttributes.content}
		Position: {objAttributes.start}-{objAttributes.end}
	</div>
{:else if isHovered && !objAttributes.isMatch}
	<div style="top: {y}px; left: {x}px;" class="tooltip">
		No match
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
	}

	.match0 {
		background-color: var(--match_color_1);
	}
	.match0_2 {
		background-color: var(--match_color_2);
	}
	
</style>