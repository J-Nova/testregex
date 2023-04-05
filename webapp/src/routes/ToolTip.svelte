<script>
	export let match;
	let isHovered = false;
	let x;
	let y;

	function matchContent(){
		let value;
		if (match.group_num !== undefined && match.group_num !== 0) {
			value = `Group (${match.group_num}) ${match.group_name}: ${match.content}`;
		} else {
			value = `Matched: ${match.content}`;
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
	class="{match.class_name}"
	on:focusout={mouseLeave}
	on:pointerleave={mouseLeave}
    on:mouseleave={mouseLeave}
	on:touchend={mouseLeave}
	on:touchcancel={mouseLeave}

	
	on:focus={showTooltip}
	on:focusin={showTooltip}

	on:pointerover={showTooltip}
	on:pointerdown={showTooltip}
	on:pointerenter={showTooltip}
	on:pointermove={showTooltip}

	on:mousemove={showTooltip}
	on:mouseenter={showTooltip}
	on:mouseover={showTooltip}

	on:touchmove={showTooltip}
	on:touchstart={showTooltip}
	style="{match.color}"
	>
	{match.content}
</span>

{#if isHovered && match.class_name === "match"}
	<div style="top: {y}px; left: {x}px;" class="tooltip">
		<span class="header">Match - {match.match_num}</span>
		<span class="match-data">
			{matchContent()}
		</span>
		<span class="match-position">
			Position: {match.start}-{match.end}
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
	
	.match1 {
		background-color: var(--senary);
	}
	
	.match2 {
		background-color: var(--tertiary);
	}
	
</style>