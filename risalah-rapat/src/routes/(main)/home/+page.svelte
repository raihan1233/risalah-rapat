<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import { Badge } from '$lib/components/ui/badge';

	import { goto } from '$app/navigation';
	import { BASE_URL_PRESTD, fetchWithToken, getUserId } from '../../../utils/network-data';
	import moment from 'moment/moment';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	const directToDetailRapat = (id_risalah_header) => {
		goto(`/rapat/detail-rapat/${id_risalah_header}`);
	};

	export let data: PageData;
	$: ({ notApprovedMeetings } = data);

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

	// const formattedData = data.map((row) => ({
	// 	...row,
	// 	badgeColor: getBadgeColor(row.status)
	// }));

	let searchTerm = '';
	$: filteredItems = notApprovedMeetings.filter((item) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});
</script>

<div class="py-10 space-y-4 overflow-x-hidden">
	<div class="space-y-4">
		<h2 class="px-4 text-3xl font-bold tracking-tight">Home</h2>
		{#if $page.data.user}
			<p>Welcome {$page.data.user.name}!</p>
		{/if}
	</div>
	<div>
		<div class="sm:flex sm:justify-between">
			<div class="px-4 gap-2 flex flex-wrap items-center">
				<Badge class="bg-emerald-500 hover:bg-emerald-700">Approve</Badge>
				<Badge class="bg-sky-500 hover:bg-sky-700">Terkirim</Badge>
				<Badge class="bg-gray-500 hover:bg-gray-700">Belum Approve</Badge>
			</div>
			<TableSearch
				placeholder="Cari di sini"
				hoverable={true}
				bind:inputValue={searchTerm}
				classInput="px-8 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs"
				classSvgDiv="p-2"
				divClass="shadow-none relative"
			/>
		</div>
		<Table class="overflow-x-auto">
			<TableHead class="text-sm">
				<!-- <tr> -->
				<TableHeadCell class="!p-4">No</TableHeadCell>
				<TableHeadCell class="!p-4">Periode Waktu</TableHeadCell>
				<TableHeadCell class="!p-4">Notulen</TableHeadCell>
				<TableHeadCell class="!p-4">Perihal</TableHeadCell>
				<TableHeadCell class="!p-4">Agenda</TableHeadCell>
				<TableHeadCell class="!p-4">Tempat</TableHeadCell>
				<TableHeadCell class="!p-4">Tipe</TableHeadCell>
				<TableHeadCell class="!p-4">Status</TableHeadCell>
				<TableHeadCell class="!p-4">Aksi</TableHeadCell>
				<!-- </tr> -->
			</TableHead>
			<TableBody>
				{#each filteredItems as row, index (row.id_risalah_header)}
					<TableBodyRow>
						<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
						<TableBodyCell class="!p-4">
							{#each JSON.parse(row.periode) as periode, index}
								{moment(periode, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY HH:mm a')}
								{#if index === 0} &mdash;&nbsp; {/if}
							{/each}
						</TableBodyCell>
						<TableBodyCell class="!p-4">{row.notulen}</TableBodyCell>
						<TableBodyCell class="!p-4">
							{row.perihal}
						</TableBodyCell>
						<TableBodyCell class="!p-4"
							>{JSON.parse(row.agenda.replace(/{{(.+)}}/, '[$1]')).join(', ')}</TableBodyCell
						>
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
								on:click={() => directToDetailRapat(row.id_risalah_header)}>Detail</Button
							>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
