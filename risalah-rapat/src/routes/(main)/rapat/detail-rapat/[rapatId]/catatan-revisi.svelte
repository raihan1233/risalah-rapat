<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import DataTableActions from './data-table-actions.svelte';

	type CatatanRevisi = {
		nama_lengkap: string;
		jabatan: string;
		konten: string;
    waktu: string;
	};
	const data: CatatanRevisi[] = [
	{
      nama_lengkap: "John Doe",
      jabatan: "Manager",
      konten: "Revisi agenda untuk team building",
      waktu: "2023-09-10 09:00 AM",
  },
  {
    nama_lengkap: "Alice Smith",
    jabatan: "Manager",
    konten: "Revisi diskusi strategi marketing",
    waktu: "2023-09-07 14:30 PM",
  },
  {
    nama_lengkap: "Bob Johnson",
    jabatan: "Manager",
    konten: "Revisi laporan finansial",
    waktu: "2023-09-03 10:30 AM",
  },
  {
    nama_lengkap: "Sarah Brown",
    jabatan: "Manager",
    konten: "Revisi agenda untuk peluncuran produk",
    waktu: "2023-09-01 11:45 AM",
  },
	];

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'nama_lengkap',
			header: 'Nama Lengkap'
		}),
		table.column({
			accessor: 'jabatan',
			header: 'Jabatan'
		}),
		table.column({
			accessor: 'konten',
			header: 'Konten'
		}),
    table.column({
			accessor: 'waktu',
			header: 'Waktu',
      plugins: {
				sort: {
					disable: true
				}
			}
		}),
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<div>
	<div class="flex items-center py-4 justify-end">
		<Input class="max-w-sm" placeholder="Cari di sini..." type="text" bind:value={$filterValue} />
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if cell.id === 'waktu'}
											<Render of={cell.render()} />
										{:else}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											</Button>
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
