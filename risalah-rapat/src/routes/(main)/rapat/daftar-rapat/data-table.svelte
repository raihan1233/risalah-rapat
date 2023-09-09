<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';

	type DaftarRapat = {
		no: number;
		waktuMulai: string;
		waktuSelesai: string;
		notulen: string;
		perihal: string;
		tempat: string;
		tipe: string;
		status: 'Belum Approve';
	};

	const data: DaftarRapat[] = [
		{
			no: 1,
			waktuMulai: '2023-09-08 09:00 AM',
			waktuSelesai: '2023-09-08 10:30 AM',
			notulen: 'John Doe',
			perihal: 'Project Review',
			tempat: 'Conference Room A',
			tipe: 'Meeting',
			status: 'Belum Approve'
		},
		{
			no: 2,
			waktuMulai: '2023-09-09 02:00 PM',
			waktuSelesai: '2023-09-09 03:30 PM',
			notulen: 'Jane Smith',
			perihal: 'Budget Presentation',
			tempat: 'Boardroom',
			tipe: 'Presentation',
			status: 'Belum Approve'
		},
		{
			no: 3,
			waktuMulai: '2023-09-10 10:30 AM',
			waktuSelesai: '2023-09-10 12:00 PM',
			notulen: 'Mike Johnson',
			perihal: 'Team Building',
			tempat: 'Outdoor Park',
			tipe: 'Event',
			status: 'Belum Approve'
		},
		{
			no: 4,
			waktuMulai: '2023-09-11 03:00 PM',
			waktuSelesai: '2023-09-11 04:30 PM',
			notulen: 'Emily Davis',
			perihal: 'Training Session',
			tempat: 'Training Room B',
			tipe: 'Training',
			status: 'Belum Approve'
		},
		{
			no: 5,
			waktuMulai: '2023-09-12 11:00 AM',
			waktuSelesai: '2023-09-12 12:30 PM',
			notulen: 'David Wilson',
			perihal: 'Project Kickoff',
			tempat: 'Conference Room C',
			tipe: 'Meeting',
			status: 'Belum Approve'
		},
		{
			no: 6,
			waktuMulai: '2023-09-13 09:30 AM',
			waktuSelesai: '2023-09-13 11:00 AM',
			notulen: 'Sarah Brown',
			perihal: 'Product Demo',
			tempat: 'Demo Area',
			tipe: 'Presentation',
			status: 'Belum Approve'
		},
		{
			no: 7,
			waktuMulai: '2023-09-14 10:00 AM',
			waktuSelesai: '2023-09-14 11:30 AM',
			notulen: 'Michael Lee',
			perihal: 'Quarterly Review',
			tempat: 'Boardroom',
			tipe: 'Meeting',
			status: 'Belum Approve'
		},
		{
			no: 8,
			waktuMulai: '2023-09-15 02:30 PM',
			waktuSelesai: '2023-09-15 04:00 PM',
			notulen: 'Laura Miller',
			perihal: 'Training Workshop',
			tempat: 'Training Room A',
			tipe: 'Training',
			status: 'Belum Approve'
		},
		{
			no: 9,
			waktuMulai: '2023-09-16 01:00 PM',
			waktuSelesai: '2023-09-16 02:30 PM',
			notulen: 'Chris Anderson',
			perihal: 'Marketing Strategy',
			tempat: 'Conference Room D',
			tipe: 'Meeting',
			status: 'Belum Approve'
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
			accessor: 'waktuMulai',
			header: 'Waktu Mulai'
		}),
		table.column({
			accessor: 'waktuSelesai',
			header: 'Waktu Selesai'
		}),
		table.column({
			accessor: 'notulen',
			header: 'Notulen'
		}),
		table.column({
			accessor: 'perihal',
			header: 'Perihal'
		}),
		table.column({
			accessor: 'tempat',
			header: 'Tempat'
		}),
		table.column({
			accessor: 'tipe',
			header: 'Tipe'
		}),
		table.column({
			accessor: 'status',
			header: 'Status'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<div>
	<div class="flex items-center py-4 justify-end">
		<Input
			class="w-full sm:max-w-xs"
			placeholder="Cari di sini..."
			type="text"
			bind:value={$filterValue}
		/>
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
