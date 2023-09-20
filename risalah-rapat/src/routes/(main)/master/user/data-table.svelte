<script lang="ts">
	import { onMount } from 'svelte';
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

	let data = [];

	// const fetchData = async () => {
	// 	try {
	// 		const response = await fetch('http://localhost:3000/users'); // Replace with your API endpoint
	// 		if (response.ok) {
	// 			data = await response.json();
	// 			console.log(data);
				
	// 		} else {
	// 			console.error('Failed to fetch data from the API');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 	}
	// };

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/users'); // Replace with your API endpoint
			if (response.ok) {
				data = await response.json();
				console.log(data);
				
			} else {
				console.error('Failed to fetch data from the API');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});

	// onMount(fetchData);

	const handleDataSaved = (event) => {
		// Append the new data to the existing data array
		data = [...data, event.detail];
	};

	let searchTerm = '';
	$: filteredItems = data.filter((item) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});

	 // Function to update the user data when edited in EditUser component
	 const updateUserData = (updatedUser) => {
    data = data.map((user) => {
      if (user.no === updatedUser.no) {
        return updatedUser;
      }
      return user;
    });
  };
</script>

<div class="space-y-4 overflow-x-auto">
	<AddUser on:dataSaved={handleDataSaved} {data} />

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
		<TableBody class="divide-y">
			{#each filteredItems as row, index (index)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.fullname}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.username}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.position}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.role}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.status}</TableBodyCell>
					<TableBodyCell class="!p-4">
						<!-- {#each row.Aksi as aksiOption} -->
						<EditUser user={row} />
						<!-- {/each} -->
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
