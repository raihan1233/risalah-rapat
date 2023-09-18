<script lang="ts">
  import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { sineIn } from 'svelte/easing';
	import { Button } from "$lib/components/ui/button";
	import { Menu } from "lucide-svelte";
  import { Drawer, CloseButton , Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper, SidebarDropdownWrapper } from 'flowbite-svelte';

  let drawerHidden: boolean = false;
  const toggleDrawer = () => {
    drawerHidden = !drawerHidden;
  };

  let spanClass = 'pl-2 self-center text-md text-gray-300 transition duration-75 rounded-lg';
  // class="flex items-center w-full p-2 text-gray-300 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
let backdrop: boolean = false;
  let activateClickOutside = true;
  let breakPoint: number = 1024;
  let width: number;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
  };
  $: if (width >= breakPoint) {
    drawerHidden = false;
    activateClickOutside = false;
  } else {
    drawerHidden = true;
    activateClickOutside = true;
  }
  onMount(() => {
    if (width >= breakPoint) {
      drawerHidden = false;
      activateClickOutside = false;
    } else {
      drawerHidden = true;
      activateClickOutside = true;
    }
  });

const toggleSide = () => {
  if (width < breakPoint) {
    drawerHidden = !drawerHidden;
  }
};


	let isOpen = false;

	const toogleDropdown = () => {
		isOpen = !isOpen;
	};

$: activeUrl = $page.url.pathname;

  import '../../app.postcss';

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

<svelte:window bind:innerWidth={width} />

<!-- <div class="container-fluid">
	<div class="row"> -->

	<!-- </div>
</div> -->

<div class="flex">
<Drawer
  transitionType="fly"
  {backdrop}
  {transitionParams}
  bind:hidden={drawerHidden}
  bind:activateClickOutside
  width="w-64 bg-gray-800"
  id="sidebar"
>
<div class=" flex items-center">
  <CloseButton on:click={() => (drawerHidden = true)} class="mb-4 text-white lg:hidden" />
</div>

<!-- <div class="flex h-screen">
	<div class="w-1/5 flex-shrink-0"> -->
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

		<Sidebar
			id="sidebar-multi-level-sidebar"
			class="w-54"
			aria-label="Sidebar"
		>
			<SidebarWrapper class="rounded px-3 py-4 overflow-y-auto bg-gray-800">
				<SidebarGroup class="space-y-2 font-small">
					<img src="/logo.png" alt="Logo Pelni" class="w-44 mb-6" />
					<SidebarItem {spanClass} label="Home" href="/home" on:click={toggleSide} active={activeUrl === `/home`} class="hover:bg-sky-900">
						<svelte:fragment slot="icon">
              	<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#d1d5db"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-home text-gray-300"
								><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
									points="9 22 9 12 15 12 15 22"
								/></svg
							>
            </svelte:fragment>
					</SidebarItem>
					<!-- <SidebarItem {spanClass} label="Home" href="/home" on:click={toggleSide} active={activeUrl === `/home`}>
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
						</button> -->
						<SidebarDropdownWrapper id="dropdown-example" class="text-gray-300 hover:bg-sky-900" label="Risalah">
								<svelte:fragment slot="icon">
									<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#d1d5db"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-presentation"
								><path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path
									d="m7 21 5-5 5 5"
								/></svg>
								</svelte:fragment>
							<SidebarItem {spanClass} label="Buat Risalah" href="/rapat/buat-rapat" on:click={toggleSide} active={activeUrl === `/rapat/buat-rapat`} class="hover:bg-sky-900">
							</SidebarItem>
							<SidebarItem {spanClass} label="Daftar Risalah" href="/rapat/daftar-rapat" on:click={toggleSide} active={activeUrl === `/rapat/daftar-rapat`} class="hover:bg-sky-900">
							</SidebarItem>
						</SidebarDropdownWrapper>
					<!-- </SidebarItem> -->
					<!-- <SidebarItem>
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
						</button> -->
						<SidebarDropdownWrapper id="dropdown-example" class="text-gray-300 hover:bg-sky-900" label="Master">
							<svelte:fragment slot="icon">
								<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#d1d5db"
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
							</svelte:fragment>
							<SidebarItem {spanClass} label="Master Tempat" href="/master/tempat" on:click={toggleSide} active={activeUrl === `/master/tempat`} class="hover:bg-sky-900">
							</SidebarItem>
							<SidebarItem {spanClass} label="Master Template" href="/master/template" on:click={toggleSide} active={activeUrl === `/master/template`} class="hover:bg-sky-900">
							</SidebarItem>
							<SidebarItem {spanClass} label="Master User" href="/master/user" on:click={toggleSide} active={activeUrl === `/master/user`} class="hover:bg-sky-900">
							</SidebarItem>
						</SidebarDropdownWrapper>
					<!-- </SidebarItem> -->
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	<!-- </div>
</div> -->
</Drawer>

	<div class="w-full">
				<nav class="sticky top-0 z-30 bg-gray-800 h-16 flex items-center justify-between lg:justify-end w-full px-8">
			<!-- <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div class="relative flex h-16 items-center justify-between">
					<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"> -->
						<Button on:click={toggleDrawer} class="bg-transparent hover:bg-transparent p-0 flex items-center lg:hidden">
							<Menu />
						</Button>
					<!-- </div> -->
					<div
						class="flex items-center pr-2 sm:ml-6 sm:pr-0"
					>
						<button
							type="button"
							class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
						>
							<span class="absolute -inset-1.5" />
							<span class="sr-only">View notifications</span>
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
								/>
							</svg>
						</button>

						<!-- Profile dropdown -->
						<div class="relative ml-3">
							<div>
								<button
									type="button"
									class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									id="user-menu-button"
									aria-expanded={isOpen}
									aria-haspopup="true"
									on:click={toogleDropdown}
								>
									<span class="absolute -inset-1.5" />
									<span class="sr-only">Open user menu</span>
									<img
										class="h-8 w-8 rounded-full"
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
								</button>
							</div>
							{#if isOpen}
								<div
									class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="user-menu-button"
									tabindex="-1"
								>
									<!-- Active: "bg-gray-100", Not Active: "" -->
									<a
										href="/profile"
										class="block px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabindex="-1"
										id="user-menu-item-0">Your Profile</a
									>
									<a
										href="/"
										class="block px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabindex="-1"
										id="user-menu-item-2">Sign out</a
									>
								</div>
							{/if}
						</div>
					</div>
				<!-- </div> -->
			<!-- </div> -->
		</nav>
		<main class="lg:ml-64 px-8">
			<slot />
		</main>
	</div>
	</div>