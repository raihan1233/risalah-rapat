<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	// import * as Table from '$lib/components/ui/table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import DataTableActions from './data-table-actions.svelte';
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';

	const data = [
	{
      nama_lengkap: "John Doe",
      jabatan: "Manager",
      konten: "Revisi agenda untuk team building",
      waktu: "2023-09-10 09:00 AM",
  },
  {
    nama_lengkap: "Alice Smith",
    jabatan: "Manager",
    konten: "Revisi diskusi strategi marketing",
    waktu: "2023-09-07 14:30 PM",
  },
  {
    nama_lengkap: "Bob Johnson",
    jabatan: "Manager",
    konten: "Revisi laporan finansial",
    waktu: "2023-09-03 10:30 AM",
  },
  {
    nama_lengkap: "Sarah Brown",
    jabatan: "Manager",
    konten: "Revisi agenda untuk peluncuran produk",
    waktu: "2023-09-01 11:45 AM",
  },
	];

  let searchTerm = '';
  	$: filteredItems = data.filter((item) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return Object.values(item).some((value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(lowerSearchTerm)
        );
    });
</script>

<div class="space-y-4">
	<!-- <Button class="bg-sky-500 hover:bg-sky-700 text-white" variant="default">
		<PlusCircle class="w-5 h-5 mr-2" />
		Tambah
	</Button> -->
	<div class="sm:flex sm:justify-end">
		<TableSearch placeholder="Cari di sini" hoverable={true} bind:inputValue={searchTerm} classInput="mb-4 px-8 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs" classSvgDiv="p-2" divClass="shadow-none relative"></TableSearch>
	</div>

	<Table shadow>
		<TableHead class="text-sm">
			<!-- <tr> -->
				<TableHeadCell class="!p-4">Nama Lengkap</TableHeadCell>
				<TableHeadCell class="!p-4">Jabatan</TableHeadCell>
				<TableHeadCell class="!p-4">Konten</TableHeadCell>
				<TableHeadCell class="!p-4">Waktu</TableHeadCell>
			<!-- </tr> -->
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredItems as row, index}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{row.nama_lengkap}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.jabatan}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.konten}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.waktu}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
