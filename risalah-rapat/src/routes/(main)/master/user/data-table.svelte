<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
  import { readable } from "svelte/store";
  // import * as Table from "$lib/components/ui/table";
  import { addPagination, addSortBy, addTableFilter } from "svelte-headless-table/plugins";
  import { Button } from "$lib/components/ui/button";
  import { ArrowUpDown } from "lucide-svelte";
  import { Input } from "$lib/components/ui/input";
  import DataTableActions from "./data-table-actions.svelte";
  import AddUser from "./add-user.svelte";
	import EditUser from "./edit-user.svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
  
  let data = [
    {
			no: 1,
			nama_lengkap: 'John Doe',
			username: 'johndoe123',
			jabatan: 'Manager',
			role: 'Admin',
			status: 'Aktif',
		},
		{
			no: 2,
			nama_lengkap: 'Jane Smith',
			username: 'janesmith456',
			jabatan: 'Supervisor',
			role: 'User',
			status: 'Aktif',
		},
		{
			no: 3,
			nama_lengkap: 'Alice Johnson',
			username: 'alicej',
			jabatan: 'Developer',
			role: 'User',
			status: 'Tidak Aktif',
		},
		{
			no: 4,
			nama_lengkap: 'Bob Williams',
			username: 'bobw',
			jabatan: 'Designer',
			role: 'Admin',
			status: 'Aktif',
		},
		{
			no: 5,
			nama_lengkap: 'Eve Davis',
			username: 'eved',
			jabatan: 'Analyst',
			role: 'User',
			status: 'Aktif',
		},
		{
			no: 6,
			nama_lengkap: 'Charlie Brown',
			username: 'charlieb',
			jabatan: 'Manager',
			role: 'Admin',
			status: 'Tidak Aktif',
		},
		{
			no: 7,
			nama_lengkap: 'Grace Lee',
			username: 'gracelee',
			jabatan: 'Developer',
			role: 'User',
			status: 'Aktif',
		},
		{
			no: 8,
			nama_lengkap: 'David Wilson',
			username: 'davidw',
			jabatan: 'Designer',
			role: 'Admin',
			status: 'Aktif',
		}
  ];

  const handleDataSaved = (event) => {
    // Append the new data to the existing data array
    data = [...data, event.detail];
  };

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
	<AddUser on:dataSaved={handleDataSaved} {data} />

	<div class="sm:flex sm:justify-end">
		<TableSearch placeholder="Cari di sini" hoverable={true} bind:inputValue={searchTerm} classInput="mb-4 px-8 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs" classSvgDiv="p-2" divClass="shadow-none relative"></TableSearch>
	</div>

	<Table shadow>
		<TableHead class="text-sm">
			<!-- <tr> -->
				<TableHeadCell class="!p-4">No</TableHeadCell>
				<TableHeadCell class="!p-4">Nama Lengkap</TableHeadCell>
        <TableHeadCell class="!p-4">Username</TableHeadCell>
        <TableHeadCell class="!p-4">Jabatan</TableHeadCell>
        <TableHeadCell class="!p-4">Role</TableHeadCell>
				<TableHeadCell class="!p-4">Status</TableHeadCell>
				<TableHeadCell class="!p-4">Aksi</TableHeadCell>
			<!-- </tr> -->
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredItems as row, index (row.no)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{row.no}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.nama_lengkap}</TableBodyCell>
          <TableBodyCell class="!p-4">{row.username}</TableBodyCell>
          <TableBodyCell class="!p-4">{row.jabatan}</TableBodyCell>
          <TableBodyCell class="!p-4">{row.role}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.status}</TableBodyCell>
					<TableBodyCell class="!p-4">
						<!-- {#each row.Aksi as aksiOption} -->
            <EditUser />
						<!-- {/each} -->
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

