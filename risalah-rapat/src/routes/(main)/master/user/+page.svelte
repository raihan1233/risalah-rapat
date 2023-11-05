<script lang="ts">
  import AddUser from './add-user.svelte';
	import EditUser from './edit-user.svelte';
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
  let usersData = data.users;

  	const handleDataSaved = (event) => {
		// Append the new data to the existing data array
		// usersData = [...usersData, event.detail];
    const newUser = JSON.parse(event.detail);
    usersData = [...usersData, newUser];
	};

	let searchTerm = '';
	$: filteredItems = usersData.filter((item) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});

	 // Function to update the user data when edited in EditUser component
	 const updateUserData = (updatedUser) => {
    usersData = usersData.map((user) => {
      if (user.no === updatedUser.no) {
        return updatedUser;
      }
      return user;
    });
  };
</script>

<div class="py-10 space-y-4">
  <div class="space-y-4">
			<h2 class="text-3xl font-bold tracking-tight">Master User</h2>
  </div>
  <div>
      <div class="space-y-4 overflow-x-auto">
        <AddUser on:dataSaved={handleDataSaved} />

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
            <TableHeadCell class="!p-4">Nama Lengkap</TableHeadCell>
            <TableHeadCell class="!p-4">Username</TableHeadCell>
            <TableHeadCell class="!p-4">Jabatan</TableHeadCell>
            <TableHeadCell class="!p-4">Role</TableHeadCell>
            <TableHeadCell class="!p-4">Status</TableHeadCell>
            <TableHeadCell class="!p-4">Aksi</TableHeadCell>
            <!-- </tr> -->
          </TableHead>
          <TableBody>
            {#each filteredItems as row, index (index)}
              <TableBodyRow>
                <TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
                <TableBodyCell class="!p-4">{row.name}</TableBodyCell>
                <TableBodyCell class="!p-4">{row.username}</TableBodyCell>
                <TableBodyCell class="!p-4">{row.jabatan}</TableBodyCell>
                <TableBodyCell class="!p-4">{row.role}</TableBodyCell>
                <TableBodyCell class="!p-4">{row.status}</TableBodyCell>
                <TableBodyCell class="!p-4">
                  <!-- {#each row.Aksi as aksiOption} -->
                  <EditUser id={row.id} />
                  <!-- {/each} -->
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </div>

  </div>
</div>