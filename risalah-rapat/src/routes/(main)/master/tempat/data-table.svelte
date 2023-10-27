<script>
	import { onMount } from 'svelte';
	import EditPlace from './edit-place.svelte';
	import AddPlace from './add-place.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import { BASE_URL, fetchWithToken } from '../../../../utils/network-data';

	export let data = [];

	// const fetchData = async () => {
	// 	try {
	// 		// const response = await fetchWithToken(`${BASE_URL}/_QUERIES/pelni/get_places`);

	// 		const response = await fetch(`${BASE_URL}/_QUERIES/pelni/get_places`, {
	// 			method: 'OPTIONS',
	// 			headers: {
	// 				'Origin': 'http://localhost',
	// 				'Authorization': `Bearer ${getAccessToken()}`
	// 			}
	// 		});

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

// 		const url = 'http://127.0.0.1:3000/_QUERIES/pelni/get_places';

// async function fetchData() {
//   try {
//     // Perform an OPTIONS request for CORS preflight
//     const preflightResponse = await fetch(url, {
//       method: 'OPTIONS',
//       headers: {
//         'Access-Control-Request-Method': 'GET',
//         'Origin': 'http://localhost',
//       },
//     });

//     // Extract the JWT token from the response headers
//     const jwtToken = preflightResponse.headers.get('Authorization');

//     // Make the actual GET request with JWT authentication
//     const dataResponse = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${getAccessToken()}`
//       },
//     });

//     // Parse and log the JSON data
//     const data = await dataResponse.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// // Call the async function
// fetchData();


	const fetchData = async () => {
		try {
			const response = await fetchWithToken(`${BASE_URL}/_QUERIES/places/get_places?_page=1&_page_size=25`); // Replace with your API endpoint)
			if (response.ok) {
				data = await response.json();
				console.log(data);
			} else {
				console.error('Failed to fetch data from the API');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	onMount(fetchData);

	const handleDataSaved = (event) => {
    // Update the data array with the updated values based on id
    const { id_place, nama, status } = event.detail;
    data = [...data, { id_place, nama, status }]; // Add the new data to the array
  };

	let searchTerm = '';
	$: filteredItems = data.filter((item) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return typeof item.nama === 'string' && item.nama.toLowerCase().includes(lowerSearchTerm);
	});
</script>

<div class="space-y-4 overflow-x-auto">
	<AddPlace {data} />

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
			<TableHeadCell class="!p-4">Tempat</TableHeadCell>
			<TableHeadCell class="!p-4">Status</TableHeadCell>
			<TableHeadCell class="!p-4">Aksi</TableHeadCell>
			<!-- </tr> -->
		</TableHead>
		<TableBody>
			{#each filteredItems as row (row.id_place)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">{row.id_place}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.nama}</TableBodyCell>
					<TableBodyCell class="!p-4">{row.status}</TableBodyCell>
					<TableBodyCell class="!p-4 space-x-2">
						<!-- {#each row.Aksi as aksiOption} -->
						<EditPlace id_place={row.id_place} />
						<!-- {/each} -->
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
