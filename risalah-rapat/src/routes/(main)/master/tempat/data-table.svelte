<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
  import { readable } from "svelte/store";
  // import * as Table from "$lib/components/ui/table";
  import { addPagination, addSortBy, addTableFilter } from "svelte-headless-table/plugins";
  import { Button } from "$lib/components/ui/button";
  import { ArrowUpDown } from "lucide-svelte";
  import { Input } from "$lib/components/ui/input";
  import EditPlace from "./edit-place.svelte";
  import AddPlace from './add-place.svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';

  const data = [
    {
			no: 1,
			tempat: 'Ruang Lambelu',
			status: 'Aktif'
		},
		{
			no: 2,
			tempat: 'Ruang Lambelu',
			status: 'Aktif'
		},
		{
			no: 3,
			tempat: 'Ruang Laud',
			status: 'Aktif'
		},
		{
			no: 4,
			tempat: 'Ruang Lambelu',
			status: 'Aktif'
		},
		{
			no: 5,
			tempat: 'Ruang Laud',
			status: 'Aktif'
		},
		{
			no: 6,
			tempat: 'Ruang Laud',
			status: 'Aktif'
		},
		{
			no: 7,
			tempat: 'Ruang Lambelu',
			status: 'Aktif'
		},
		{
			no: 8,
			tempat: 'Ruang Laud',
			status: 'Aktif'
		}
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

<div class="space-y-4 overflow-x-auto">
	<AddPlace />

	<div class="sm:flex sm:justify-end">
		<TableSearch placeholder="Cari di sini" hoverable={true} bind:inputValue={searchTerm} classInput="mb-4 px-8 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs" classSvgDiv="p-2" divClass="shadow-none relative"></TableSearch>
	</div>

	<Table shadow>
		<TableHead class="text-sm">
			<!-- <tr> -->
				<TableHeadCell class="!p-4">No</TableHeadCell>
				<TableHeadCell class="!p-4">Tempat</TableHeadCell>
				<TableHeadCell class="!p-4">Status</TableHeadCell>
				<TableHeadCell class="!p-4">Aksi</TableHeadCell>
			<!-- </tr> -->
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredItems as row, index (row.no)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{row.no}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.tempat}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.status}</TableBodyCell>
					<TableBodyCell class="!p-4 space-x-2">
						<!-- {#each row.Aksi as aksiOption} -->
            <EditPlace />
						<!-- {/each} -->
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
