<script>
	import { createEventDispatcher } from "svelte";
	import Icon from "@iconify/svelte";
	const dispatch = createEventDispatcher();
	export let item;
	$: info = item.info;
	$: desc = item.desc;
	$: token = item.token;
</script>

<div class="flex flex-col gap-4 p-2 border border-gray-200 rounded-lg bg-white shadow-sm">
	<div class="flex justify-between items-center p-2 border-b border-gray-200">
		<span class="text-sm font-medium text-gray-900">{desc}</span>
	</div>
	<div>
		<div
			class="border border-gray-200 rounded-md w-full bg-gray-50 flex flex-row justify-between items-center"
		>
			<div class="flex flex-col gap-2 p-2 flex-grow">
				<span class="text-green-600 font-mono text-sm">/{token}/g</span>
				<div class="text-xs p-2">
					<span class="text-green-600 font-mono mr-2">{token}</span>
					<span class="text-gray-700">{info}</span>
				</div>
			</div>
			<button
				class="bg-gray-300 hover:bg-gray-400 rounded-full h-6 w-6 flex items-center justify-center m-2 cursor-pointer transition-colors"
				type="button"
				on:click={_ => {
					dispatch("closeHighlight");
				}}
			>
				<Icon icon="carbon:arrow-right" class="text-gray-700" />
			</button>
		</div>
	</div>
</div>
