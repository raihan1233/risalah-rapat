<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->

<script>
	import DataTable from './data-table.svelte';
	let isToggleActive = true;

	const toggleVisibility = () => {
		isToggleActive = !isToggleActive;
	};
</script>

<form class="border m-7 p-5">
	<div class="flex justify-between">
		<h1 class="text-lg">Daftar Rapat</h1>
		<button class="btn btn-link" on:click={toggleVisibility} style="cursor: pointer;">
			{#if isToggleActive}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="26"
					height="26"
					fill="#6366f1"
					class="bi bi-toggle-on"
					viewBox="0 0 16 16"
				>
					<path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="26"
					height="26"
					fill="#94a3b8"
					class="bi bi-toggle-off"
					viewBox="0 0 16 16"
				>
					<path
						d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"
					/>
				</svg>
			{/if}
		</button>
	</div>
	{#if isToggleActive}
		<div class="space-y-12">
			<div class="border-b border-gray-900/10 pb-12">
				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="col-span-full">
						<label for="waktu-mulai" class="block text-sm font-medium leading-6 text-gray-900"
							>Waktu Mulai</label
						>
						<div class="mt-2">
							<input
								id="waktu-mulai"
								type="datetime-local"
								name="waktu mulai"
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div class="col-span-full">
						<label for="waktu-selesai" class="block text-sm font-medium leading-6 text-gray-900"
							>Waktu Selesai</label
						>
						<div class="mt-2">
							<input
								id="waktu-selesai"
								type="datetime-local"
								name="waktu selesai"
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div class="col-span-full">
						<label for="status" class="block text-sm font-medium leading-6 text-gray-900"
							>Status</label
						>
						<div class="mt-2">
							<select
								id="status"
								name="status"
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							>
								<option selected disabled>pilih opsi</option>
								<option value="belum approve">belum approve</option>
								<option value="terkirim">terkirim</option>
								<option value="publish">publish</option>
							</select>
						</div>
					</div>

					<div class="col-span-full">
						<label for="tipe" class="block text-sm font-medium leading-6 text-gray-900">Tipe</label>
						<div class="mt-2">
							<select
								id="tipe"
								name="tipe"
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							>
								<option selected disabled>pilih opsi</option>
								<option value="checker">checker</option>
								<option value="approver">approver</option>
								<option value="tembusan">tembusan</option>
							</select>
						</div>
					</div>

					<div class="col-span-full">
						<label for="perihal" class="block text-sm font-medium leading-6 text-gray-900"
							>Perihal</label
						>
						<div class="mt-2">
							<input
								id="perihal"
								type="text"
								name="perihal"
								placeholder="masukkan perihal"
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div class="col-span-full">
						<label for="tempat" class="block text-sm font-medium leading-6 text-gray-900"
							>Tempat</label
						>
						<div class="mt-2">
							<input
								id="tempat"
								type="text"
								name="tempat"
								placeholder="masukkan tempat"
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center gap-x-6">
			<button
				type="button"
				class="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>Cari</button
			>
		</div>
	{/if}
</form>

<DataTable />
