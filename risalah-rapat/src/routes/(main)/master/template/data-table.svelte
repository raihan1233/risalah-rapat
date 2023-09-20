<script lang="ts">
	import { onMount, setContext } from 'svelte';
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

	let data = [];
	let templateData = {};
	let templateId = '';

	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:3000/template'); // Replace with your API endpoint
			if (response.ok) {
				data = await response.json();

				console.log(data);
			} else {
				console.error('Failed to fetch data from the API');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	onMount(fetchData);

	const handleDataUpdate = (event) => {
		// Update the data array with the updated data
		( data = event.detail);
	};

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
			{#each filteredItems as row, index (row.id)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.title}</TableBodyCell>
					<TableBodyCell class="!p-4"
						><a href={row.file} class="underline" download>{row.file}</a></TableBodyCell
					>
					<TableBodyCell class="!p-4">{row.status}</TableBodyCell>
					<TableBodyCell class="!p-4">
						<EditTemplate
							{templateData}
							{data}
							{templateId}
							{index}
							on:updateData={handleDataUpdate}
						/></TableBodyCell
					>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
