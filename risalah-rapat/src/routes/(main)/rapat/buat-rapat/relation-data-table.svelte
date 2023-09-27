<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	// import * as Table from "$lib/components/ui/table";
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import RelationDataTableActions from './relation-data-table-actions.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import { PlusCircle, Download, Trash2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import AddRelationDocument from './add-relation-document.svelte';

	let data = [];

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/relation-documents'); // Replace with your API endpoint
			if (response.ok) {
				data = await response.json();
				console.log(data);
			} else {
				console.error('Failed to fetch data from the API');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});

	const handleDataSaved = (event) => {
		// Append the new data to the existing data array
		data = [...data, event.detail];
	};

	let searchTerm = '';
	$: filteredItems = data.filter((item) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});

	async function deleteDocument(documentId) {
		try {
			const response = await fetch(`http://localhost:3000/relation-documents/${documentId}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				// Hapus data dari tampilan setelah berhasil dihapus dari server
				data = data.filter((item) => item.id !== documentId);
			} else {
				console.error('Gagal menghapus dokumen relasi');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<div class="space-y-4">
	<AddRelationDocument on:dataSaved={handleDataSaved} {data} />
	<div class="sm:flex sm:justify-end">
		<TableSearch
			placeholder="Cari di sini"
			hoverable={true}
			bind:inputValue={searchTerm}
			classInput="mb-4 px-8 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs"
			classSvgDiv="p-2"
			divClass="shadow-none relative"
		/>
	</div>

	<Table shadow>
		<TableHead class="text-sm">
			<!-- <tr> -->
			<TableHeadCell class="!p-4">Dokumen Relasi</TableHeadCell>
			<TableHeadCell class="!p-4">Aksi</TableHeadCell>
			<!-- </tr> -->
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredItems as row, index (index)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{row.name}</TableBodyCell>
					<TableBodyCell class="!p-4 space-x-2">
						<Button
							class="bg-red-500 hover:bg-red-700 text-white"
							variant="default"
							on:click={() => deleteDocument(row.id)}
						>
							<Trash2 class="w-4 h-4 mr-2" />
							Delete
						</Button>

						<a href={`http://localhost:3000/relation-documents/${row.id}`} download>
							<Button class="bg-sky-500 hover:bg-sky-700">
								<Download class="h-4 w-4 mr-2" />Download
							</Button>
						</a>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
