<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable, writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import DataTableActions from './data-table-actions.svelte';
	import SelectRole from './select-role.svelte';
	import SelectUser from './select-user.svelte';

	type Checker = {
		no: Number;
		user: string;
		jabatan: string;
		role: string;
	};

	const data: Checker[] = [
		{
			no: 1,
			user: 'User 1',
			jabatan: 'Manager',
			role: 'Admin'
		},
		{
			no: 2,
			user: 'User 2',
			jabatan: 'Manager',
			role: 'Admin'
		}
	];

	let nextNo = data.length + 1;

	// Create a writable store to manage the table data
	const tableData = writable<Checker[]>(data);

	// Function to add a new row to the table data
	function addNewRow() {
		const newRow: Checker = {
			no: nextNo, // Automatically increment the 'no' field
			user: 'New User', // You can set default values here
			jabatan: 'New Jabatan', // You can set default values here
			role: 'New Role' // You can set default values here
		};
		nextNo++;
		tableData.update((data) => [...data, newRow]);
		console.log(tableData);

		console.log(newRow);
	}

	const table = createTable(tableData, {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'no',
			header: 'No',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'user',
			header: 'User',
			cell: (item) => {
				return createRender(SelectUser, { id: item.no });
			}
		}),
		table.column({
			accessor: 'jabatan',
			header: 'Jabatan'
		}),
		table.column({
			accessor: ({ user }) => user,
			header: 'Role',
			cell: (item) => {
				return createRender(SelectRole, { id: item.no });
			}
		}),
		table.column({
			accessor: ({ user }) => user,
			header: 'Aksi',
			cell: (item) => {
				return createRender(DataTableActions, { id: item.no });
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<div>
	<div class="flex items-center py-4 justify-between">
		<Button variant="outline" on:click={addNewRow}>Tambah</Button>
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
										{#if cell.id === 'Aksi'}
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
