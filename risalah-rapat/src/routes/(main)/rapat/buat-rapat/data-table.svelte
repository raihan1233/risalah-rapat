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
			'Pilih_User': 'Team Meeting',
			'Nama_Jabatan': 'Ruang Rapat Awu Lantai 3',
			'Role': 'Mas Bagus'
		},
		{
			'No_Urut': 2,
			'Pilih_User': 'Team Meeting',
			'Nama_Jabatan': 'Ruang Rapat Awu Lantai 3',
			'Role': 'Mas Bagus'
		},
		{
			'No_Urut': 3,
			'Pilih_User': 'Team Meeting',
			'Nama_Jabatan': 'Ruang Rapat Awu Lantai 3',
			'Role': 'Mas Bagus'
		},
		{
			'No_Urut': 4,
			'Pilih_User': 'Team Meeting',
			'Nama_Jabatan': 'Ruang Rapat Awu Lantai 3',
			'Role': 'Mas Bagus'
		},
		{
			'No_Urut': 5,
			'Pilih_User': 'Team Meeting',
			'Nama_Jabatan': 'Ruang Rapat Awu Lantai 3',
			'Role': 'Mas Bagus'
		}
	];

	// Define the select options for "Pilih User"
	const selectUserOptions = [
		'Mas Bagus',
		'Mas Wahyu',
		'Mas Fahri',
	];

	// define the select options for "pilih role"
	const selectRoleOptions = [
		'Checker',
		'Approver',
		'Tembusan',
	];

	onMount(async () => {
		// const response = await fetch('https://jsonplaceholder.typicode.com/users');
		// const userData = await response.json();
		const userData = data;
		tableData = userData.map((user) => [
			user.No_Urut,
			`<select class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-3 m-1'>
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

		// initialize datatables
		table = new DataTable('#myTable', {
			data: tableData,
			columns: [
				{ title: 'No Urut' },
				{ title: 'Pilih User' },
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