<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';

	type Home = {
		no: number;
		waktu: string;
		notulen: string;
		perihal: string;
		tempat: string;
		tipe: string;
		status: 'Approve';
	};
	const data: Home[] = [
		{
			no: 1,
			waktu: '2023-09-08 09:00 AM',
			notulen: 'meeting minutes for project discussion',
			perihal: 'project update',
			tempat: 'conference Room A',
			tipe: 'internal',
			status: 'Approve'
		},
		{
			no: 2,
			waktu: '2023-09-10 02:30 PM',
			notulen: 'discussion on marketing strategy',
			perihal: 'marketing Meeting',
			tempat: 'zoom Meeting',
			tipe: 'external',
			status: 'Approve'
		},
		{
			no: 3,
			waktu: '2023-09-12 11:15 AM',
			notulen: 'agenda for team building event',
			perihal: 'team Building Planning',
			tempat: 'cafeteria',
			tipe: 'internal',
			status: 'Approve'
		},
		{
			no: 4,
			waktu: '2023-09-14 03:45 PM',
			notulen: 'review of financial reports',
			perihal: 'financial Review',
			tempat: 'boardroom',
			tipe: 'internal',
			status: 'Approve'
		},
		{
			no: 5,
			waktu: '2023-09-16 10:30 AM',
			notulen: 'agenda for product launch',
			perihal: 'product Launch Meeting',
			tempat: 'conference Room B',
			tipe: 'internal',
			status: 'Approve'
		},
		{
			no: 6,
			waktu: '2023-09-18 01:00 PM',
			notulen: 'discussion on quarterly goals',
			perihal: 'quarterly Goals Meeting',
			tempat: 'zoom Meeting',
			tipe: 'internal',
			status: 'Approve'
		},
		{
			no: 7,
			waktu: '2023-09-20 04:15 PM',
			notulen: 'review of project timelines',
			perihal: 'project Timeline Review',
			tempat: 'boardroom',
			tipe: 'internal',
			status: 'Approve'
		},
		{
			no: 8,
			waktu: '2023-09-22 10:00 AM',
			notulen: 'planning for annual conference',
			perihal: 'conference Planning',
			tempat: 'conference Room A',
			tipe: 'internal',
			status: 'Approve'
		}
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
			accessor: 'no',
			header: 'No',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'waktu',
			header: 'Waktu'
		}),
		table.column({
			accessor: 'notulen',
			header: 'Notulen',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'perihal',
			header: 'Perihal',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'tempat',
			header: 'Tempat'
		}),
		table.column({
			accessor: 'tipe',
			header: 'Tipe',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'status',
			header: 'Status',
			plugins: {
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<div class="container mx-auto">
	<div class="flex items-center py-4 justify-end">
		<Input class="w-full sm:max-w-xs" placeholder="Cari di sini..." type="text" bind:value={$filterValue} />
	</div>
	<div class="rounded-md border overflow-x-auto">
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