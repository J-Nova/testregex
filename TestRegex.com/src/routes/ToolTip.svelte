<script>
	export let objAttributes;
	let isHovered = false;
	let x;
	let y;

	
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
	on:focus
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
</style>