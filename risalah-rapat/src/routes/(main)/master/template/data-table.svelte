<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	// import * as Table from "$lib/components/ui/table";
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import EditTemplate from './edit-template.svelte';
	import AddTemplate from './add-template.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';

	let data = [
		{
			no: 1,
			nama_template: 'Invoice',
			file: 'invoice_template.docx',
			status: 'Aktif'
		},
		{
			no: 2,
			nama_template: 'Report',
			file: 'report_template.docx',
			status: 'Aktif'
		},
		{
			no: 3,
			nama_template: 'Letter',
			file: 'letter_template.docx',
			status: 'Tidak Aktif'
		},
		{
			no: 4,
			nama_template: 'Resume',
			file: 'resume_template.docx',
			status: 'Aktif'
		},
		{
			no: 5,
			nama_template: 'Proposal',
			file: 'proposal_template.docx',
			status: 'Aktif'
		},
		{
			no: 6,
			nama_template: 'Agreement',
			file: 'agreement_template.docx',
			status: 'Tidak Aktif'
		},
		{
			no: 7,
			nama_template: 'Presentation',
			file: 'presentation_template.pptx',
			status: 'Aktif'
		},
		{
			no: 8,
			nama_template: 'Form',
			file: 'form_template.pdf',
			status: 'Aktif'
		}
	];

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
</script>

<div class="space-y-4 overflow-x-auto">
	<AddTemplate on:dataSaved={handleDataSaved} {data} />

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
			<TableHeadCell class="!p-4">No</TableHeadCell>
			<TableHeadCell class="!p-4">Nama Template</TableHeadCell>
			<TableHeadCell class="!p-4">File</TableHeadCell>
			<TableHeadCell class="!p-4">Status</TableHeadCell>
			<TableHeadCell class="!p-4">Aksi</TableHeadCell>
			<!-- </tr> -->
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredItems as row, index (row.no)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{row.no}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.nama_template}</TableBodyCell>
					<TableBodyCell class="!p-4"><a href={data[0].file} class="underline" download>{row.file}</a></TableBodyCell>
					<TableBodyCell class="!p-4">{row.status}</TableBodyCell>
					<TableBodyCell class="!p-4">
						<!-- {#each row.Aksi as aksiOption} -->
						<EditTemplate />
						<!-- {/each} -->
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
