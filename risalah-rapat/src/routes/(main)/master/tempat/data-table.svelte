<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import { addPagination, addSortBy, addTableFilter } from "svelte-headless-table/plugins";
  import { Button } from "$lib/components/ui/button";
  import { ArrowUpDown } from "lucide-svelte";
  import { Input } from "$lib/components/ui/input";
  import EditPlace from "./edit-place.svelte";

  type Tempat = {
    no: number;
    tempat: string;
    status: "Aktif" | "Tidak Aktif";
  };
  const data: Tempat[] = [
    {
			no: 1,
			tempat: 'Ruang Lambelu',
			status: 'Aktif'
		},
		{
			no: 2,
			tempat: 'Ruang Lambelu',
			status: 'Aktif'
		},
		{
			no: 3,
			tempat: 'Ruang Laud',
			status: 'Aktif'
		},
		{
			no: 4,
			tempat: 'Ruang Lambelu',
			status: 'Aktif'
		},
		{
			no: 5,
			tempat: 'Ruang Laud',
			status: 'Aktif'
		},
		{
			no: 6,
			tempat: 'Ruang Laud',
			status: 'Aktif'
		},
		{
			no: 7,
			tempat: 'Ruang Lambelu',
			status: 'Aktif'
		},
		{
			no: 8,
			tempat: 'Ruang Laud',
			status: 'Aktif'
		}
  ];

  const table = createTable(readable(data), {
    page: addPagination(),
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase())
    })
  });

  const columns = table.createColumns([
    table.column({
      accessor: "no",
      header: "No",
      plugins: {
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: "tempat",
      header: "Tempat",
    }),
    table.column({
      accessor: "status",
      header: "Status",
      plugins: {
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      accessor: ({ tempat }) => tempat,
      header: "Aksi",
      cell: (item) => {
        return createRender(EditPlace, { id: item.no });
      },
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
    <Input
      class="max-w-sm"
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
                  {#if cell.id === "Aksi"}
                  <Render of={cell.render()} />
                  {:else}
                  <Button variant="ghost" on:click={props.sort.toggle}>
                    <Render of={cell.render()} />
                    <ArrowUpDown class={"ml-2 h-4 w-4"} />
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