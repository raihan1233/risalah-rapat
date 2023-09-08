<script>
	import '../app.postcss';
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
				<a href="/home" class="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium"
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
			<button
				type="button"
				class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
				aria-controls="dropdown-example"
				data-collapse-toggle="dropdown-example"
			>
				<svg
					class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 18 21"
				>
					<path
						d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"
					/>
				</svg>
				<span class="flex-1 ml-3 text-left whitespace-nowrap">E-commerce</span>
				<svg
					class="w-3 h-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
			</button>
			<ul id="dropdown-example" class="hidden py-2 space-y-2">
				<li>
					<a
						href="#"
						class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>Products</a
					>
				</li>
				<li>
					<a
						href="#"
						class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>Billing</a
					>
				</li>
				<li>
					<a
						href="#"
						class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>Invoice</a
					>
				</li>
			</ul>
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
				<a href="/master" class="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium"
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
				<a
					href="/profile"
					class="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium">Profile</a
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
