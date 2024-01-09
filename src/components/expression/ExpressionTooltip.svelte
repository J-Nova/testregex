<style>
	.tooltip {
		border: 1px solid var(--border-color);
		background: var(--secondary);
		color: var(--primary-text-color);
		z-index: 10000;
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
	import { editor } from "$lib/stores.js";
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
	function getClass(expression) {
		if ($editor.visualizeSpecialCharacters === true) {
			return expression.type;
		} else {
			return "";
		}
	}
</script>

<span
	class={`h-fit ${getClass(expression)}`}
	role="tooltip"
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

{#if isHovered && $editor.showToolTips === true}
	<div
		style="top: {y}px; left: {x}px;"
		class="tooltip p-2 rounded flex flex-col shadow absolute text-base h-fit"
	>
		<span class="expression-data">
			{expression.explanation}
		</span>
	</div>
{/if}
