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
		font-size: medium;
	}
	.Group {
		background-color: #fcba03;
	}

	.CharacterClass {
		background-color: #4287f5;
	}

	.Repetition {
		background-color: #03fc84;
	}

	.Quantifier {
		background-color: #03fc84;
	}
</style>

<script>
	export let expression;
	let isHovered = false;
	let x;
	let y;

	function showTooltip(event) {
		if (!isHovered) {
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
	class={expression.type}
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
>
	{expression.content}
</span>

{#if isHovered}
	<div style="top: {y}px; left: {x}px;" class="tooltip">
		<span class="expression-data">
			{expression.explanation}
		</span>
	</div>
{/if}
