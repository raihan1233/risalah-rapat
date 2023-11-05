<script>
	import EditPlace from './edit-place.svelte';
	import AddPlace from './add-place.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';

	export let data;
	let placesData = data.places;

	const handleDataSaved = (event) => {
    // Update the data array with the updated values based on id
    // const { id_place, nama, status } = event.detail;
    // placesData = [...placesData, event.detail]; 
		const newPlace = JSON.parse(event.detail);
    placesData = [...placesData, newPlace];
  };

	let searchTerm = '';
	$: filteredItems = Array.isArray(placesData)
  ? placesData.filter((item) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return typeof item.nama === 'string' && item.nama.toLowerCase().includes(lowerSearchTerm);
    })
  : [];

</script>

<div class="py-10 space-y-4">
	<div class="space-y-4">
		<h2 class="text-3xl font-bold tracking-tight px-4">Master Tempat</h2>
	</div>
	<div>
		<div class="space-y-4 overflow-x-auto">
			<AddPlace on:dataSaved={handleDataSaved} />

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
					<TableHeadCell class="!p-4">Tempat</TableHeadCell>
					<TableHeadCell class="!p-4">Status</TableHeadCell>
					<TableHeadCell class="!p-4">Aksi</TableHeadCell>
					<!-- </tr> -->
				</TableHead>
				<TableBody>
					{#each filteredItems as row, index (row.id_place)}
						<TableBodyRow>
							<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.nama}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.status}</TableBodyCell>
							<TableBodyCell class="!p-4 space-x-2">
								<!-- {#each row.Aksi as aksiOption} -->
								<EditPlace id_place={row.id_place} />
								<!-- {/each} -->
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>

	</div>
</div>
