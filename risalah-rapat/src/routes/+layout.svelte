<script>
	import "../app.postcss"
	import HeaderNav from './(main)/HeaderNav.svelte';
	let isOpen = false;
</script>

<div class="flex h-screen">
	<div class="w-1/5 bg-gray-800 p-4 text-white">
		<div class="flex flex-shrink-0 items-center">
			<img class="h-16 w-auto object-cover" src="/Logogram.png" alt="Your Company" />
		</div>

		<ul class="mt-12">
			<!-- Text links (hidden on small screens) -->
			<li class="mb-2 hidden sm:block">
				<a href="#" class="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium"
					>Home</a
				>
			</li>
			<!-- Add similar blocks for other links -->

			<!-- Icons (hidden on larger screens) -->
			<li class="mb-2 sm:hidden">
				<!-- Insert icon code here -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-home"
					><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
						points="9 22 9 12 15 12 15 22"
					/></svg
				>
			</li>

			<!-- Text links (hidden on small screens) -->
			<li class="mb-2 hidden sm:block">
				<a href="#" class="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium"
					>Rapat</a
				>
			</li>
			<!-- Add similar blocks for other links -->

			<!-- Icons (hidden on larger screens) -->
			<li class="mb-2 sm:hidden">
				<!-- Insert icon code here -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-presentation"
					><path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path
						d="m7 21 5-5 5 5"
					/></svg
				>
			</li>

			<!-- Text links (hidden on small screens) -->
			<li class="mb-2 hidden sm:block">
				<a href="#" class="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium"
					>Master</a
				>
			</li>
			<!-- Icons (hidden on larger screens) -->
			<li class="mb-2 sm:hidden">
				<!-- Insert icon code here -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-presentation"
					><path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path
						d="m7 21 5-5 5 5"
					/></svg
				>
			</li>

			<!-- Text links (hidden on small screens) -->
			<li class="mb-2 hidden sm:block">
				<a href="#" class="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium"
					>Profile</a
				>
			</li>
			<!-- Icons (hidden on larger screens) -->
			<li class="mb-2 sm:hidden">
				<!-- Insert icon code here -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-presentation"
					><path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path
						d="m7 21 5-5 5 5"
					/></svg
				>
			</li>
		</ul>
	</div>
	<div class="flex-1">
		<HeaderNav />
		<main class="m-4">
			<slot />
		</main>
	</div>
</div>
