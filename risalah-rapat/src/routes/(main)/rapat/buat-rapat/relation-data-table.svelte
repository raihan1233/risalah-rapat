<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
  import { readable } from "svelte/store";
  // import * as Table from "$lib/components/ui/table";
  import { addPagination, addSortBy, addTableFilter } from "svelte-headless-table/plugins";
  import { Button } from "$lib/components/ui/button";
  import { ArrowUpDown } from "lucide-svelte";
  import { Input } from "$lib/components/ui/input";
  import RelationDataTableActions from "./relation-data-table-actions.svelte";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  	import { PlusCircle, Download, Trash2 } from 'lucide-svelte';

  const data = [
    {
			dokumen_relasi: 'Lampiran.pdf',
		},
		{
			dokumen_relasi: 'Dokumen.doc',
		},
  ];

  
</script>

<div class="space-y-4">
	<!-- <Button class="bg-sky-500 hover:bg-sky-700 text-white" variant="default">
		<PlusCircle class="w-5 h-5 mr-2" />
		Tambah
	</Button> -->

	<Table shadow>
		<TableHead class="text-sm">
			<!-- <tr> -->
				<TableHeadCell class="!p-4">Dokumen Relasi</TableHeadCell>
				<TableHeadCell class="!p-4">Aksi</TableHeadCell>
			<!-- </tr> -->
		</TableHead>
		<TableBody class="divide-y">
			{#each data as row, index}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{row.dokumen_relasi}</TableBodyCell>
					<TableBodyCell class="!p-4 space-x-2">
						<Button
									class="bg-red-500 hover:bg-red-700 text-white"
									variant="default"
								>
									<Trash2 class="w-4 h-4 mr-2" />
									Delete
						</Button>

						<Button class="bg-sky-500 hover:bg-sky-700">
            <Download class="h-4 w-4 mr-2" />Download
          </Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
