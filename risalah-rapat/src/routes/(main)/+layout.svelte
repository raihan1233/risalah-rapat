<script>
	import '../../app.postcss';
	import HeaderNav from './HeaderNav.svelte';

	let isOpenSidebar = false;
	let isOpenRapat = false;
	let isOpenMaster = false;

	const toggleSidebar = () => {
		isOpenSidebar = !isOpenSidebar;
	};

	const toggleDropdown = (dropdownName) => {
		if (dropdownName === 'rapat') {
			isOpenRapat = !isOpenRapat;
		} else if (dropdownName === 'master') {
			isOpenMaster = !isOpenMaster;
		}
	};
</script>

<div class="flex h-screen">
	<div class="w-1/5 flex-shrink-0">
		<!-- <button
			type="button"
			class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			on:click={toggleSidebar}
		>
			<svg
				class="w-6 h-6"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					clip-rule="evenodd"
					fill-rule="evenodd"
					d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
				/>
			</svg>
		</button> -->

		<aside
			id="sidebar-multi-level-sidebar"
			class="z-40 overflow-y-auto h-screen transition-transform translate-x-0 sm:translate-x-full bg-gray-800 dark:bg-gray-800"
			class:open={isOpenSidebar}
			aria-label="Sidebar"
		>
			<div class="h-full px-3 py-4 overflow-y-auto bg-gray-800 dark:bg-gray-800">
				<ul class="space-y-2 font-small mt-12">
					<li>
						<a
							href="/home"
							class="flex items-center p-2 text-gray-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#6B7280"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-home"
								><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
									points="9 22 9 12 15 12 15 22"
								/></svg
							>
							<span class="ml-3">Home</span>
						</a>
					</li>
					<li>
						<button
							type="button"
							class="flex items-center w-full p-2 text-base text-gray-200 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-slate-600"
							aria-controls="dropdown-example"
							data-collapse-toggle="dropdown-example"
							on:click={() => toggleDropdown('rapat')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#6B7280"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-presentation"
								><path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path
									d="m7 21 5-5 5 5"
								/></svg
							>
							<span class="flex-1 ml-3 text-left whitespace-nowrap text-gray-400">Rapat</span>
							<svg
								class="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="#D1D5DB"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 1 4 4 4-4"
								/>
							</svg>
						</button>
						<ul id="dropdown-example" class="{isOpenRapat ? '' : 'hidden'} py-2 space-y-2">
							<li>
								<a
									href="/rapat/buat-rapat"
									class="flex items-center w-full p-2 text-gray-300 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>Buat Risalah</a
								>
							</li>
							<li>
								<a
									href="/rapat/daftar-rapat"
									class="flex items-center w-full p-2 text-gray-300 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>Daftar Risalah</a
								>
							</li>
						</ul>
					</li>
					<li>
						<button
							type="button"
							class="flex items-center w-full p-2 text-base text-gray-200 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-slate-600"
							aria-controls="dropdown-example"
							data-collapse-toggle="dropdown-example"
							on:click={() => toggleDropdown('master')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#6B7280"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-layout-template"
								><rect width="18" height="7" x="3" y="3" rx="1" /><rect
									width="9"
									height="7"
									x="3"
									y="14"
									rx="1"
								/><rect width="5" height="7" x="16" y="14" rx="1" /></svg
							>
							<span class="flex-1 ml-3 text-left whitespace-nowrap text-gray-400">Master</span>
							<svg
								class="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="#D1D5DB"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 1 4 4 4-4"
								/>
							</svg>
						</button>
						<ul id="dropdown-example" class="{isOpenMaster ? '' : 'hidden'} py-2 space-y-2">
							<li>
								<a
									href="/master/tempat"
									class="flex items-center w-full p-2 text-gray-300 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>Master Tempat</a
								>
							</li>
							<li>
								<a
									href="/master/template"
									class="flex items-center w-full p-2 text-gray-300 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>Master Template</a
								>
							</li>
							<li>
								<a
									href="/master/user"
									class="flex items-center w-full p-2 text-gray-300 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>Master User</a
								>
							</li>
							<li>
								<a
									href="/master/agenda"
									class="flex items-center w-full p-2 text-gray-300 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>Master Agenda</a
								>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</aside>
	</div>

	<div class="flex-1">
		<HeaderNav />
		<main class="m-4">
			<slot />
		</main>
	</div>
</div>

<style>
	@media (min-width: 640px) {
		/* Media query for screens larger than 640px (adjust as needed) */
		#sidebar-multi-level-sidebar {
			/* Ensure the sidebar is always visible on larger screens */
			transform: translateX(0);
		}
	}
</style>