<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import FormRapat from './form-rapat.svelte';
	import { Filter } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import moment from 'moment/moment';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ allMeetings } = data);

	let isFilterActive = true;

	const toggleFilter = () => {
		isFilterActive = !isFilterActive;
	};

	let searchData = {};

	function handleSearch(event) {
		searchData = event.detail; // Update searchData with the search criteria
		// Perform data filtering or any other necessary actions with searchData
	}

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

	//   const formattedData = data.map(row => ({
	//   ...row,
	//   badgeColor: getBadgeColor(row.status)
	// }));

	let searchTerm = '';
	$: filteredItems = allMeetings.filter((item) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});

	const directToDetailRapat = (id_risalah_header) => {
		goto(`/rapat/detail-rapat/${id_risalah_header}`);
	};
</script>

<div class="overflow-x-hidden">
	<div class="py-10 space-y-8">
		<Card.Root>
			<Card.Header>
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-bold tracking-tight">Daftar Risalah</h2>
					<div class="flex items-center">
						<button class="hover:bg-transparent focus:outline-none" on:click={toggleFilter}>
							<span>
								<Filter
									class={isFilterActive ? 'text-sky-500 fill-sky-500' : 'text-gray-400'}
									size={32}
								/>
							</span>
						</button>
					</div>
				</div>
			</Card.Header>
			<Card.Content>
				<div>
					{#if isFilterActive}
						<FormRapat on:search={handleSearch} />
					{/if}
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<div class="space-y-4">
				<Card.Content class="p-6">
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
								<TableHeadCell class="!p-4">No</TableHeadCell>
								<TableHeadCell class="!p-4">Periode Waktu</TableHeadCell>
								<TableHeadCell class="!p-4">Notulen</TableHeadCell>
								<TableHeadCell class="!p-4">Perihal</TableHeadCell>
								<TableHeadCell class="!p-4">Agenda</TableHeadCell>
								<TableHeadCell class="!p-4">Tempat</TableHeadCell>
								<TableHeadCell class="!p-4">Tipe</TableHeadCell>
								<TableHeadCell class="!p-4">Status</TableHeadCell>
								<TableHeadCell class="!p-4">Aksi</TableHeadCell>
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
											>{JSON.parse(row.agenda.replace(/{{(.+)}}/, '[$1]')).join(
												', '
											)}</TableBodyCell
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
				</Card.Content>
			</div>
		</Card.Root>
	</div>
</div>
