<script>
	import { onMount } from 'svelte';
	import DataTable from 'datatables.net-dt';
	import 'datatables.net-dt/css/jquery.dataTables.css';

	// Isi tabel dengan data (contoh data statis)
	let tableData = [];

	const redirectPage = () => {
		window.location.href = 'rapat/daftar-rapat';
	};

	const data = [
		{
			'No_Urut': 1,
			'Pilih_User': 'Mas Bagus',
			'Nama_Jabatan': 'Manager IT',
			'Role': 'Checker'
		},
		{
			'No_Urut': 2,
			'Pilih_User': 'Mas Wahyu',
			'Nama_Jabatan': 'Pegawai IT',
			'Role': 'Approver'
		},
		// Add more data as needed
	];

	// Define the select options for "Pilih User"
	const selectUserOptions = data.map(user => user.Pilih_User);

	// Define the select options for "Pilih Role"
	const selectRoleOptions = [
		'Checker',
		'Approver',
		'Tembusan',
	];

	let table; // Declare table variable

	const handleUserSelectionChange = (event, rowIndex) => {
		const selectedValue = event.target.value;
		const namaJabatan = data.find(user => user.Pilih_User === selectedValue)?.Nama_Jabatan || '';
		table.cell(rowIndex, 2).data(namaJabatan).draw();
	};

	onMount(async () => {
		const userData = data;
		tableData = userData.map((user) => [
			user.No_Urut,
			`<select class='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 m-1.5' onchange="handleUserSelectionChange(event, this.parentNode.parentNode.rowIndex)">
				${selectUserOptions.map(option => `
					<option ${option === user.Pilih_User ? 'selected' : ''}>${option}</option>
				`).join('')}
			</select>`,
			user.Nama_Jabatan,
			`<select class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-3 m-1'>
				${selectRoleOptions.map(option => `
					<option ${option === user.Role ? 'selected' : ''}>${option}</option>
				`).join('')}
			</select>`,
		]);

		// Initialize datatables and add event listener for select input changes
		table = new DataTable('#myTable', {
			data: tableData,
			columns: [
				{ title: 'No Urut' },
				{ title: 'Pilih User', createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
					cell.innerHTML = cellData; // Set the select input HTML
					cell.querySelector('select').addEventListener('change', (event) => {
						handleUserSelectionChange(event, rowIndex);
					});
				}},
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

<table id="myTable" class="display cell-border">
	<tbody />
</table>
