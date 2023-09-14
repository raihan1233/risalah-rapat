<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import DataTable from 'datatables.net-dt';
	import 'datatables.net-dt/css/jquery.dataTables.css';
	import { Button } from '$lib/components/ui/button';
	import { PlusCircle } from 'lucide-svelte';
	import { ArrowUpCircle, ArrowDownCircle, Trash2 } from 'lucide-svelte';

	const dispatch = createEventDispatcher();

	let tableData = [
		{
			No_Urut: 1,
			Pilih_User: 'Mas Bagus',
			Nama_Jabatan: 'Manager IT',
			Role: 'Checker'
		}
	];

	const removeRow = (index) => {
		tableData = tableData.filter((_, i) => i !== index);
		// update the 'no' field of remaining rows
		tableData.forEach((row, i) => {
			row.no = i + 1;
		});
		// add a new empty row if the table is completely empty
		if (tableData.length === 0) {
			tableData.push({ no: '', user: '', jabatan: '', role: '' });
		}
	};

	const addRow = () => {
		const nextNo = tableData.length + 1;
		const newRow = { no: nextNo, user: userData, jabatan: 'New Jabatan', role: 'New Role' };
		tableData = [...tableData, newRow];
		updateButtonVisibility();
	};

	const data = [
		{
			No_Urut: 1,
			Pilih_User: 'Mas Bagus',
			Nama_Jabatan: 'Manager IT',
			Role: 'Checker'
		}
		// {
		// 	No_Urut: 2,
		// 	Pilih_User: 'Mas Fahri',
		// 	Nama_Jabatan: 'Dev IT',
		// 	Role: 'Checker'
		// },
		// {
		// 	No_Urut: 3,
		// 	Pilih_User: 'Mas Fauzi',
		// 	Nama_Jabatan: 'Dev IT',
		// 	Role: 'Checker'
		// }

		// Add more data as needed
	];

	const updateButtonVisibility = () => {
		tableData = tableData.map((row, index) => ({
			...row,
			showButtons: index >= 2,
			isFirstRow: index === 0,
			isSecondRow: index === 1,
			isLastRow: index === tableData.length - 1
		}));
	};
	updateButtonVisibility();

	// Define the select options for "Pilih User"
	const selectUserOptions = data.map((user) => user.Pilih_User);

	let userData = `<select class='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 m-1.5' onchange="handleUserSelectionChange(event, this.parentNode.parentNode.rowIndex)">
					${selectUserOptions
						.map(
							(option, index) => `
						<option ${option == data[index].Pilih_User ? 'selected' : ''}>${option}</option>
					`
						)
						.join('')}
				</select>`;

	// Define the select options for "Pilih Role"
	const selectRoleOptions = ['Checker', 'Approver', 'Tembusan'];

	let table; // Declare table variable

	const handleUserSelectionChange = (event, rowIndex) => {
		const selectedValue = event.target.value;
		const namaJabatan = data.find((user) => user.Pilih_User === selectedValue)?.Nama_Jabatan || '';
		table.cell(rowIndex, 2).data(namaJabatan).draw();
	};

	onMount(async () => {
		const userData = data;
		tableData = userData.map((user) => [
			user.No_Urut,
			`<select class='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 m-1.5' onchange="handleUserSelectionChange(event, this.parentNode.parentNode.rowIndex)">
					${selectUserOptions
						.map(
							(option) => `
						<option ${option === user.Pilih_User ? 'selected' : ''}>${option}</option>
					`
						)
						.join('')}
				</select>`,
			user.Nama_Jabatan,
			`<select class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-3 m-1'>
					${selectRoleOptions
						.map(
							(option) => `
						<option ${option === user.Role ? 'selected' : ''}>${option}</option>
					`
						)
						.join('')}
				</select>`
		]);

		// Initialize datatables and add event listener for select input changes
		table = new DataTable('#myTable', {
			data: tableData,
			columns: [
				{ title: 'No Urut' },
				{
					title: 'Pilih User',
					createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
						cell.innerHTML = cellData; // Set the select input HTML
						cell.querySelector('select').addEventListener('change', (event) => {
							handleUserSelectionChange(event, rowIndex);
						});
					}
				},
				{ title: 'Nama Jabatan' },
				{ title: 'Role' },
				{ title: 'Aksi' }
			],
			columnDefs: [
				{
					targets: 4,
					render: function (data, type, row) {
						return `<button type="button" class="btn btn-success" on:click={redirectPage} >Details</button>`;
					}
				}
			]
		});
	});
</script>

<Button class="bg-sky-500 hover:bg-sky-700" on:click={addRow}>
	<PlusCircle class="mr-2 h-4 w-4" />
	Tambah
</Button>
<table id="myTable" class="display cell-border">
	<tbody>
		{#each tableData as row, index (row.no)}
			<tr>
				<th scope="row">{row.no}</th>
				<td>{@html row.user}</td>
				<td>{row.jabatan}</td>
				<td>{row.role}</td>
				<td>
					{#if row.isFirstRow}
						<p class="visibility-hidden" />
					{:else}
						<Button class="bg-red-500 hover:bg-red-700" on:click={() => removeRow(index)}>
							<Trash2 class="mr-2 h-4 w-4" />
							Delete
						</Button>
						{#if row.isSecondRow}
							<Button class="bg-emerald-500 hover:bg-emerald-700">
								<ArrowUpCircle class="mr-2 h-4 w-4" />
								Up
							</Button>
						{/if}
						{#if row.showButtons}
							{#if row.isLastRow}
								<Button class="bg-sky-500 hover:bg-sky-700">
									<ArrowDownCircle class="mr-2 h-4 w-4" />
									Down
								</Button>
							{:else}
								<Button class="bg-sky-500 hover:bg-sky-700">
									<ArrowDownCircle class="mr-2 h-4 w-4" />
									Down
								</Button>
								<Button class="bg-emerald-500 hover:bg-emerald-700">
									<ArrowUpCircle class="mr-2 h-4 w-4" />
									Up
								</Button>
							{/if}
						{/if}
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
