<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import { addPagination, addSortBy, addTableFilter } from "svelte-headless-table/plugins";
  import { Button } from "$lib/components/ui/button";
  import { ArrowUpDown } from "lucide-svelte";
  import { Input } from "$lib/components/ui/input";
  import EditUser from './edit-user.svelte';

  type User = {
    no: number;
    nama_lengkap: string;
    username: string;
    jabatan: string;
    role: string;
    status: "Aktif" | "Tidak Aktif";
  };
  const data: User[] = [
    {
			no: 1,
			nama_lengkap: 'John Doe',
			username: 'johndoe123',
			jabatan: 'Manager',
			role: 'Admin',
			status: 'Aktif',
		},
		{
			no: 2,
			nama_lengkap: 'Jane Smith',
			username: 'janesmith456',
			jabatan: 'Supervisor',
			role: 'User',
			status: 'Aktif',
		},
		{
			no: 3,
			nama_lengkap: 'Alice Johnson',
			username: 'alicej',
			jabatan: 'Developer',
			role: 'User',
			status: 'Tidak Aktif',
		},
		{
			no: 4,
			nama_lengkap: 'Bob Williams',
			username: 'bobw',
			jabatan: 'Designer',
			role: 'Admin',
			status: 'Aktif',
		},
		{
			no: 5,
			nama_lengkap: 'Eve Davis',
			username: 'eved',
			jabatan: 'Analyst',
			role: 'User',
			status: 'Aktif',
		},
		{
			no: 6,
			nama_lengkap: 'Charlie Brown',
			username: 'charlieb',
			jabatan: 'Manager',
			role: 'Admin',
			status: 'Tidak Aktif',
		},
		{
			no: 7,
			nama_lengkap: 'Grace Lee',
			username: 'gracelee',
			jabatan: 'Developer',
			role: 'User',
			status: 'Aktif',
		},
		{
			no: 8,
			nama_lengkap: 'David Wilson',
			username: 'davidw',
			jabatan: 'Designer',
			role: 'Admin',
			status: 'Aktif',
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
      accessor: "nama_lengkap",
      header: "Nama Lengkap",
    }),
    table.column({
      accessor: "username",
      header: "Username",
    }),
    table.column({
      accessor: "jabatan",
      header: "Jabatan",
    }),
    table.column({
      accessor: "role",
      header: "Role",
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
      accessor: ({ nama_lengkap }) => nama_lengkap,
      header: "Aksi",
      cell: (item) => {
        return createRender(EditUser, { id: item.no });
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