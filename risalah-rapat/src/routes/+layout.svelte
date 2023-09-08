<script>
	import "../app.postcss"
	import HeaderNav from './(main)/HeaderNav.svelte';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	
	let isOpenRapat = false;
	let isOpenMaster = false;

	function toggleDropdown(dropdownName) {
        if (dropdownName === 'rapat') {
            isOpenRapat = !isOpenRapat;
            isOpenMaster = false;
        } else if (dropdownName === 'master') {
            isOpenMaster = !isOpenMaster;
            isOpenRapat = false;
        }
    }
</script>

<div class="flex h-screen">
	<div class="w-1/5 bg-gray-800 p-4 text-white">
		<div class="flex flex-shrink-0 items-center">
			<img class="h-16 w-auto object-cover" src="/Logogram.png" alt="Your Company" />
		</div>

		<ul class="mt-12">
			<!-- Text links (hidden on small screens) -->
			<li class="mb-3 hidden sm:block">
				<a href="/home" class="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium"
					>Home</a
				>
			</li>
			<!-- Add similar blocks for other links -->

			<!-- Icons (hidden on larger screens) -->
			<!-- <li class="mb-5 sm:hidden">
				<a href="/home">
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
				</a>
			</li> -->

			<!-- Text links (hidden on small screens) -->
			<li class="mb-3 hidden sm:block relative">
				<div class="group relative">
					<button
						class="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium focus:outline-none flex align-middle"
						on:click={() => toggleDropdown('rapat')}
					>
						<span class="me-3">Rapat</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</button>
					{#if isOpenRapat}
						<div class="absolute z-10 mt-2 bg-gray-800 text-white border rounded-lg shadow-lg top-0 right-5">
							<!-- Dropdown menu items -->
							<a href="/rapat/buat-rapat" class="block px-4 py-2 hover:bg-gray-700">Buat Rapat</a>
							<a href="/rapat/daftar-rapat" class="block px-4 py-2 hover:bg-gray-700">Daftar Rapat</a>
						</div>
					{/if}
				</div>
			</li>
			<!-- Add similar blocks for other links -->

			<!-- Icons (hidden on larger screens) -->
			<!-- <li class="mb-5 sm:hidden">
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
			</li> -->

			<!-- Text links (hidden on small screens) -->
			<li class="mb-3 hidden sm:block relative">
				<div class="group relative">
					<button
						class="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium focus:outline-none flex align-middle"
						on:click={() => toggleDropdown('master')}
					>
						<span class="me-3">Master</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</button>
					{#if isOpenMaster}
						<div class="absolute z-10 mt-2 bg-gray-800 text-white border rounded-lg shadow-lg top-0 right-5">
							<!-- Dropdown menu items -->
							<a href="/master/tempat" class="block px-4 py-2 hover:bg-gray-700">Master Tempat</a>
							<a href="/master/template" class="block px-4 py-2 hover:bg-gray-700">Master Template</a>
							<a href="/master/user" class="block px-4 py-2 hover:bg-gray-700">Master User</a>
						</div>
					{/if}
				</div>
			</li>
			<!-- Icons (hidden on larger screens) -->
			<!-- <li class="mb-5 sm:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-template"><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/></svg>
			</li> -->
			<ul>
				<!-- Icons for small screens -->
				<li class="mb-5 sm:hidden">
					<a href="#" on:click={() => toggleDropdown('rapat')}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home">
							<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
					</a>
				</li>
	
				<li class="mb-5 sm:hidden">
					<a href="#" on:click={() => toggleDropdown('master')}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-presentation">
							<path d="M2 3h20" />
							<path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
							<path d="m7 21 5-5 5 5" />
						</svg>
					</a>
				</li>
	
				<!-- ... (your existing code) ... -->
			</ul>
	
			<!-- Dropdown containers for small screens -->
			<div class={isOpenRapat ? "sm:hidden" : "hidden"}>
				<!-- Dropdown menu items -->
				<a href="/rapat/buat-rapat" class="block px-4 py-2 hover:bg-gray-700">Buat Rapat</a>
				<a href="/rapat/daftar-rapat" class="block px-4 py-2 hover:bg-gray-700">Daftar Rapat</a>
			</div>
	
			<div class={isOpenMaster ? "sm:hidden" : "hidden"}>
				<!-- Dropdown menu items -->
				<a href="/master/tempat" class="block px-4 py-2 hover:bg-gray-700">Master Tempat</a>
				<a href="/master/template" class="block px-4 py-2 hover:bg-gray-700">Master Template</a>
				<a href="/master/user" class="block px-4 py-2 hover:bg-gray-700">Master User</a>
			</div>
		</ul>
	</div>
	<div class="flex-1">
		<HeaderNav />
		<main class="m-4">
			<slot />
		</main>
	</div>
</div>