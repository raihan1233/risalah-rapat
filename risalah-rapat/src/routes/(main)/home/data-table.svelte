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
			waktu: '2023-09-08 09:00 AM',
			notulen: 'meeting minutes for project discussion',
			perihal: 'project update',
			tempat: 'conference Room A',
			tipe: 'internal',
			status: 'Approve'
		},
		{
			no: 2,
			waktu: '2023-09-10 02:30 PM',
			notulen: 'discussion on marketing strategy',
			perihal: 'marketing Meeting',
			tempat: 'zoom Meeting',
			tipe: 'external',
			status: 'Terkirim'
		},
		{
			no: 3,
			waktu: '2023-09-12 11:15 AM',
			notulen: 'agenda for team building event',
			perihal: 'team Building Planning',
			tempat: 'cafeteria',
			tipe: 'internal',
			status: 'Belum Approve'
		},
		{
			no: 4,
			waktu: '2023-09-14 03:45 PM',
			notulen: 'review of financial reports',
			perihal: 'financial Review',
			tempat: 'boardroom',
			tipe: 'internal',
			status: 'Terkirim'
		},
		{
			no: 5,
			waktu: '2023-09-16 10:30 AM',
			notulen: 'agenda for product launch',
			perihal: 'product Launch Meeting',
			tempat: 'conference Room B',
			tipe: 'internal',
			status: 'Belum Approve'
		},
		{
			no: 6,
			waktu: '2023-09-18 01:00 PM',
			notulen: 'discussion on quarterly goals',
			perihal: 'quarterly Goals Meeting',
			tempat: 'zoom Meeting',
			tipe: 'internal',
			status: 'Belum Approve'
		},
		{
			no: 7,
			waktu: '2023-09-20 04:15 PM',
			notulen: 'review of project timelines',
			perihal: 'project Timeline Review',
			tempat: 'boardroom',
			tipe: 'internal',
			status: 'Belum Approve'
		},
		{
			no: 8,
			waktu: '2023-09-22 10:00 AM',
			notulen: 'planning for annual conference',
			perihal: 'conference Planning',
			tempat: 'conference Room A',
			tipe: 'internal',
			status: 'Approve'
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
	</script>


	<Table shadow>
		<TableHead class="text-sm">
			<!-- <tr> -->
				<TableHeadCell class="!p-4">No</TableHeadCell>
				<TableHeadCell class="!p-4">Waktu</TableHeadCell>
				<TableHeadCell class="!p-4">Notulen</TableHeadCell>
				<TableHeadCell class="!p-4">Perihal</TableHeadCell>
				<TableHeadCell class="!p-4">Tempat</TableHeadCell>
				<TableHeadCell class="!p-4">Tipe</TableHeadCell>
				<TableHeadCell class="!p-4">Status</TableHeadCell>
				<TableHeadCell class="!p-4">Aksi</TableHeadCell>
			<!-- </tr> -->
		</TableHead>
		<TableBody>
			{#each data as row, index (row.no)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{row.no}</TableBodyCell>
					<TableBodyCell class="!p-4">
						{row.waktu}
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
									on:click={directToDetailRapat}>Detail</Button
								>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
