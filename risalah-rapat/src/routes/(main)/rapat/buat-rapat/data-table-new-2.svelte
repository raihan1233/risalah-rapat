<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { PlusCircle, ArrowUpCircle, ArrowDownCircle, Trash2 } from 'lucide-svelte';
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { Button } from '$lib/components/ui/button'

	const dispatch = createEventDispatcher();

	const selectRoleOptions = ['Checker', 'Approver', 'Tembusan'];
	let tableData = [];

	const removeRow = (index) => {
		tableData.splice(index, 1);
		updateButtonVisibility();
	};

	const addRow = () => {
		const nextNo = tableData.length + 1;
		const newRow = {
			No_Urut: nextNo,
			Pilih_User: '',
			Nama_Jabatan: 'New Jabatan',
			Role: 'New Role'
		};
		tableData = [...tableData, newRow];
		updateButtonVisibility();
	};

	const data = [
		{
			No_Urut: 1,
			Pilih_User: 'Mbak Rere',
			Nama_Jabatan: 'Sekretaris',
			Role: 'Checker'
		},
		{
			No_Urut: 2,
			Pilih_User: 'Mas Bagus',
			Nama_Jabatan: 'Manajer TI'
		},
		{
			No_Urut: 3,
			Pilih_User: 'Mas Angga',
			Nama_Jabatan: 'Vice President TI'
		}
	];

	// Add the default values from the 'data' array to the first row
	const defaultValues = data[0];
	const firstRow = { No_Urut: 1, ...defaultValues };
	tableData.push(firstRow);

	const selectUserOptions = data.map((user) => user.Pilih_User);

	let userData = selectUserOptions[0]; // Default value

	const moveRowUp = (index) => {
		if (index === 1) {
			const currentRow = tableData[index];
			const nextRow = tableData[index + 1];
			tableData[index] = nextRow;
			tableData[index + 1] = currentRow;
			updateButtonVisibility();
		} else if (index >= 2) {
			const currentRow = tableData[index];
			const previousRow = tableData[index - 1];
			tableData[index] = previousRow;
			tableData[index - 1] = currentRow;
			updateButtonVisibility();
		}
	};

	const moveRowDown = (index) => {
		if (index < tableData.length - 1) {
			const currentRow = tableData[index];
			const nextRow = tableData[index + 1];
			tableData[index] = nextRow;
			tableData[index + 1] = currentRow;
			updateButtonVisibility();
		}
	};

	const handleUserSelectionChange = (event, rowIndex) => {
		const selectedValue = event.target.value;
		const namaJabatan = data.find((user) => user.Pilih_User === selectedValue)?.Nama_Jabatan || '';
		tableData[rowIndex].Nama_Jabatan = namaJabatan;
	};

	const getAksiOptions = (index) => {
		if (index === 0) {
			return [''];
		} else if (index === tableData.length - 1) {
			return ['Delete', 'Up'];
		} else if (index === 1) {
			return ['Delete', 'Down'];
		} else {
			return ['Delete', 'Up', 'Down'];
		}
	};

	const updateButtonVisibility = () => {
		tableData = tableData.map((row, index) => ({
			...row,
			Aksi: getAksiOptions(index)
		}));
	};
	updateButtonVisibility();

	onMount(async () => {
		// Initialize datatables and add event listener for select input changes
	});
</script>

<div class="space-y-4">
	<Button class="bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded" on:click={addRow}>
		<PlusCircle class="w-5 h-5 mr-2" />
		Tambah
	</Button>

	<Table shadow>
		<TableHead class="text-sm">
			<!-- <tr> -->
				<TableHeadCell class="!p-4">No Urut</TableHeadCell>
				<TableHeadCell class="!p-4">Pilih User</TableHeadCell>
				<TableHeadCell class="!p-4">Nama Jabatan</TableHeadCell>
				<TableHeadCell class="!p-4">Role</TableHeadCell>
				<TableHeadCell class="!p-4">Aksi</TableHeadCell>
			<!-- </tr> -->
		</TableHead>
		<TableBody class="divide-y">
			{#each tableData as row, index (row.No_Urut)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{row.No_Urut}</TableBodyCell>
					<TableBodyCell class="!p-4">
						<select
							class="p-1.5 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 m-1.5"
							bind:value={row.Pilih_User}
							on:change={() => handleUserSelectionChange(event, index)}
						>
							{#each selectUserOptions as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</TableBodyCell>
					<TableBodyCell class="!p-4">{row.Nama_Jabatan}</TableBodyCell>
					<TableBodyCell class="!p-4">
						<select
							class="p-1.5 text-gray-900 border-0 rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-3 m-1"
							bind:value={row.Role}
						>
							{#each selectRoleOptions as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</TableBodyCell>
					<TableBodyCell class="!p-4 space-x-2">
						{#each row.Aksi as aksiOption}
							{#if aksiOption === 'Delete'}
								<Button
									class="bg-red-500 hover:bg-red-700 text-white"
									variant="default"
									on:click={() => removeRow(index)}
								>
									<Trash2 class="w-4 h-4 mr-2" />
									Delete
								</Button>
							{/if}
							{#if aksiOption === 'Up'}
								<Button class="bg-emerald-500 hover:bg-emerald-700 text-white" variant="default" on:click={() => moveRowUp(index)}>
									<ArrowUpCircle class="w-4 h-4 mr-2" />
									Up
								</Button>
							{/if}
							{#if aksiOption === 'Down'}
								<Button class="bg-sky-500 hover:bg-sky-700 text-white" variant="default" on:click={() => moveRowDown(index)}>
									<ArrowDownCircle class="w-4 h-4 mr-2" />
									Down
								</Button>
							{/if}
						{/each}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
