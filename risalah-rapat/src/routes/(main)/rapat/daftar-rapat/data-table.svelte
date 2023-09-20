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
	import { Badge } from "$lib/components/ui/badge";

	import { goto } from '$app/navigation';

	const directToDetailRapat = () => {
		goto(`/rapat/detail-rapat/`);
	}

	const data = [
	{
		no: 1,
		periode_waktu: '2023-09-08 09:00 AM to 2023-09-08 10:30 AM',
		notulen: 'John Doe',
		perihal: 'Project Review',
		tempat: 'Conference Room A',
		tipe: 'Meeting',
		status: 'Approve',
		waktu: '2023-09-10 09:00 AM'
	},
	{
		no: 2,
		periode_waktu: '2023-09-09 02:00 PM to 2023-09-09 03:30 PM',
		notulen: 'Jane Smith',
		perihal: 'Budget Presentation',
		tempat: 'Boardroom',
		tipe: 'Presentation',
		status: 'Approve',
		waktu: '2023-09-12 09:00 AM'
	},
	{
		no: 3,
		periode_waktu: '2023-09-10 10:30 AM to 2023-09-10 12:00 PM',
		notulen: 'Mike Johnson',
		perihal: 'Team Building',
		tempat: 'Outdoor Park',
		tipe: 'Event',
		status: 'Terkirim',
		waktu: '2023-09-10 17:00 PM'
	},
	{
		no: 4,
		periode_waktu: '2023-09-11 03:00 PM to 2023-09-11 04:30 PM',
		notulen: 'Emily Davis',
		perihal: 'Training Session',
		tempat: 'Training Room B',
		tipe: 'Training',
		status: 'Belum Approve',
		waktu: '2023-09-10 09:00 AM'
	},
	{
		no: 5,
		periode_waktu: '2023-09-12 11:00 AM to 2023-09-12 12:30 PM',
		notulen: 'David Wilson',
		perihal: 'Project Kickoff',
		tempat: 'Conference Room C',
		tipe: 'Meeting',
		status: 'Belum Approve',
		waktu: '2023-09-10 09:00 AM'
	},
	{
		no: 6,
		periode_waktu: '2023-09-12 09:30 AM to 2023-09-12 11:00 AM',
		notulen: 'Sarah Brown',
		perihal: 'Product Demo',
		tempat: 'Demo Area',
		tipe: 'Presentation',
		status: 'Approve',
		waktu: '2023-09-15 09:00 AM'
	},
	{
		no: 7,
		periode_waktu: '2023-09-14 11:00 AM to 2023-09-14 11:30 PM',
		notulen: 'Michael Lee',
		perihal: 'Quarterly Review',
		tempat: 'Boardroom',
		tipe: 'Meeting',
		status: 'Terkirim',
		waktu: '2023-09-10 09:00 AM'
	},
	{
		no: 8,
		periode_waktu: '2023-09-15 02:30 AM to 2023-09-12 04:00 PM',
		notulen: 'Laura Miller',
		perihal: 'Training Workshop',
		tempat: 'Training Room A',
		tipe: 'Training',
		status: 'Belum Approve',
		waktu: '2023-09-10 09:00 AM'
	},
	{
		no: 9,
		periode_waktu: '2023-09-16 01:00 AM to 2023-09-16 02:30 PM',
		notulen: 'Chris Anderson',
		perihal: 'Marketing Strategy',
		tempat: 'Conference Room D',
		tipe: 'Meeting',
		status: 'Belum Approve',
		waktu: '2023-09-10 09:00 AM'
	}
];

	  function getBadgeColor(status) {
    switch (status) {
      case 'Approve':
        return 'bg-emerald-500 hover:bg-emerald-700';
      case 'Terkirim':
        return 'bg-sky-500 hover:bg-sky-700';
      default:
        return 'bg-gray-500 hover:bg-gray-700';
    }
  }

	  const formattedData = data.map(row => ({
    ...row,
    badgeColor: getBadgeColor(row.status) 
  }));

	  let searchTerm = '';
  	$: filteredItems = data.filter((item) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return Object.values(item).some((value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(lowerSearchTerm)
        );
    });
	</script>

<div>
	<div class="sm:flex sm:justify-between">
		<div class="px-4 gap-2 flex flex-wrap items-center">
			<Badge class="bg-emerald-500 hover:bg-emerald-700">Approve</Badge>
			<Badge class="bg-sky-500 hover:bg-sky-700">Terkirim</Badge>
			<Badge class="bg-gray-500 hover:bg-gray-700">Belum Approve</Badge>
		</div>

		<TableSearch placeholder="Cari di sini" hoverable={true} bind:inputValue={searchTerm} classInput="px-8 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs" classSvgDiv="p-2" divClass="shadow-none relative"></TableSearch>
	</div>
	<Table class="overflow-x-auto">
	
		<TableHead class="text-sm">
			<!-- <tr> -->
				<TableHeadCell class="!p-4">No</TableHeadCell>
				<TableHeadCell class="!p-4">Periode Waktu</TableHeadCell>
				<TableHeadCell class="!p-4">Notulen</TableHeadCell>
				<TableHeadCell class="!p-4">Perihal</TableHeadCell>
				<TableHeadCell class="!p-4">Tempat</TableHeadCell>
				<TableHeadCell class="!p-4">Tipe</TableHeadCell>
				<TableHeadCell class="!p-4">Status</TableHeadCell>
				<TableHeadCell class="!p-4">Aksi</TableHeadCell>
			<!-- </tr> -->
		</TableHead>
		<TableBody>
			{#each filteredItems as row, index (index)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
					<TableBodyCell class="!p-4">
						{row.periode_waktu}
					</TableBodyCell>
					<TableBodyCell class="!p-4">{row.notulen}</TableBodyCell>
					<TableBodyCell class="!p-4">
						{row.perihal}
					</TableBodyCell>
					<TableBodyCell class="!p-4">{row.tempat}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.tipe}</TableBodyCell>
					<TableBodyCell class="!p-4">
						 <Badge class={`w-full flex justify-center ${getBadgeColor(row.status)}`}>
								{#if row.status === 'Terkirim' || row.status === 'Approve'}
									{row.waktu}
								{:else}
									{row.status}
								{/if}
        			</Badge>
					</TableBodyCell>
					<TableBodyCell class="!p-4">
							<Button
									class="bg-emerald-500 hover:bg-emerald-700"
									on:click={goto(`/rapat/detail-rapat/${index}`)}>Detail</Button
								>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>

	</Table>
</div>