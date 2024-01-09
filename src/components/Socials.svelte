<style>
	.container {
		background-color: var(--primary);
		cursor: default;
	}
	img {
		height: 25%;
		width: 25%;
	}

	.social {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
</style>

<script>
	import logo from "$lib/assets/site_icon.png";
	import Icon from "@iconify/svelte";
</script>

<div>
	<a href="/">
		<h1 class="flex items-center">
			<img src={logo} alt="Site Icon" class="pr-1" />
			<span class="text-white">Test</span><span class="text-white">Regex</span>
		</h1>
	</a>
	<div class="container p-2">
		<span class="social gap-1">
			<Icon icon="carbon:logo-github" color="white" />
			<a href="https://github.com/J-Nova/testregex" class="text-black">Github</a>
		</span>
		<span class="social gap-1">
			<Icon icon="carbon:logo-linkedin" color="black" />
			<a href="https://www.linkedin.com/in/juup-pikkemaat/" class="text-black">LinkedIn</a
			>
		</span>
	</div>
</div>
