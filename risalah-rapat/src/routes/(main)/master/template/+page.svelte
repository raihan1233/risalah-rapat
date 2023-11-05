<script lang="ts">
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
	import { fetchWithToken, BASE_URL_PRESTD, BASE_URL_EXPRESS } from '../../../../utils/network-data';

	export let data;
  let templatesData = data.templates;

	const handleDataUpdate = (event) => {
		// Update the data array with the updated data
		templatesData = event.detail;
	};

	const handleDataSaved = (event) => {
		// Append the new data to the existing data array
		const newTemplate = event.detail;
    templatesData = [...templatesData, newTemplate];
	};

	let searchTerm = '';
	$: filteredItems = templatesData.filter((item) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});
</script>

<div class="py-10 space-y-4">
  <div class="space-y-4">
			<h2 class="text-3xl font-bold tracking-tight">Master Template</h2>
  </div>
  <div>
    <div class="space-y-4 overflow-x-auto">
      <AddTemplate on:dataSaved={handleDataSaved} />

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
          <TableHeadCell class="!p-4">No</TableHeadCell>
          <TableHeadCell class="!p-4">Nama Template</TableHeadCell>
          <TableHeadCell class="!p-4">File</TableHeadCell>
          <TableHeadCell class="!p-4">Status</TableHeadCell>
          <TableHeadCell class="!p-4">Aksi</TableHeadCell>
        </TableHead>
        <TableBody>
          {#each filteredItems as row, index (row.id_template)}
            <TableBodyRow>
              <TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
              <TableBodyCell class="!p-4">{row.nama_template}</TableBodyCell>
              <TableBodyCell class="!p-4"
                ><a class="underline" download
                  >{row.file}</a>
                  <!-- <a href={fetchWithToken(`${BASE_URL_EXPRESS}/_QUERIES/templates/get_template?id_template=${row.id_template}`)} class="underline" download>{row.file}</a --></TableBodyCell
              >
              <TableBodyCell class="!p-4">{row.status}</TableBodyCell>
              <TableBodyCell class="!p-4">
                <EditTemplate id={row.id_template} />
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>

  </div>
</div>