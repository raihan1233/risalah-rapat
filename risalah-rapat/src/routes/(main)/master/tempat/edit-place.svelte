<script>
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import Swal from 'sweetalert2';
	import { Pencil } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { BASE_URL, fetchWithToken } from '../../../../utils/network-data';
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher;
	export let id_place;
	let nama = '';
	let status = '';

	// Add a variable to store the fetched place data
	let placeData = null;

	let isDialogOpen = false;

	onMount(async () => {
		try {
			const response = await fetchWithToken(`${BASE_URL}/_QUERIES/pelni/get_place?id_place=${id_place}`);
			if (response.ok) {
				placeData = await response.json();
				// Set the input fields based on the fetched data
				nama = placeData.nama;
				status = placeData.status;
			} else {
				console.error('Failed to fetch data for editing:', response.statusText);
				Swal.fire({
					icon: 'error',
					title: 'Gagal mengambil data untuk pengeditan',
					text: 'Terjadi kesalahan saat mengambil data.'
				});
			}
		} catch (error) {
			console.error('Error fetching data for editing:', error);
			Swal.fire({
				icon: 'error',
				title: 'Gagal mengambil data untuk pengeditan',
				text: 'Terjadi kesalahan saat mengambil data.'
			});
		}
	});

	// onMount(fetchData); // Fetch data when the component is mounted

	// const saveData = async () => {
	// 	try {
	// 		const response = await fetch(`http://localhost:3000/places/${id}`, {
	// 			method: 'PUT',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFubmlzYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NjIyMTgxNywiZXhwIjoxNjk2NDgxMDE3fQ.M879PmtOuY-2hwJ1qEFz596Jh-JhY1MjbF6z-WueUyA`
				
	// 			},
	// 			body: JSON.stringify({ tempat, status }) // Send the updated data
	// 		});

	// 		if (response.ok) {
	// 			Swal.fire({
	// 				icon: 'success',
	// 				title: 'Data berhasil dirubah',
	// 				showConfirmButton: false,
	// 				timer: 1500
	// 			}).then(() => {
	// 				dispatch('dataSaved', { id, tempat, status });
	// 				// Close the dialog by setting isDialogOpen to false
	// 				isDialogOpen = false;
	// 			});
	// 		} else {
	// 			console.error('Failed to update data:', response.statusText);
	// 			Swal.fire({
	// 				icon: 'error',
	// 				title: 'Gagal menyimpan data',
	// 				text: 'Terjadi kesalahan saat menyimpan data.'
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.error('Error updating data:', error);
	// 		Swal.fire({
	// 			icon: 'error',
	// 			title: 'Gagal menperbaharui data',
	// 			text: 'Terjadi kesalahan saat menyimpan data.'
	// 		});
	// 	}
	// };

	const saveData = async () => {
		// Emit an event with the new data
		try {
			const response = await fetch(`${BASE_URL}/_QUERIES/pelni/patch_place?id_place=${id_place}&nama=${nama}&status=${status}`, {
				method: 'PATCH',
				body: JSON.stringify({ nama, status })
			});

			if (response.ok) {
				const responseData = await response.text();

				// Emit an event with the new data (if needed)
				dispatch('dataSaved', responseData);

				Swal.fire({
					icon: 'success',
					title: 'Data berhasil ditambahkan',
					showConfirmButton: false,
					timer: 1500
				}).then(() => {
          // Close the dialog by setting isDialogOpen to false
          isDialogOpen = false;
        });
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Gagal menambahkan data',
					text: 'Ada masalah saat menambahkan data ke server'
				});
			}
		} catch (error) {
			console.error('Error:', error);
			Swal.fire({
				icon: 'error',
				title: 'Terjadi kesalahan',
				text: 'Terjadi kesalahan saat mengirim data ke server'
			});
		}
	};
</script>

<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Trigger
		class={buttonVariants({ variant: 'default', className: 'bg-sky-500 hover:bg-sky-700' })}
	>
		<Pencil class="h-4 w-4 mr-2" />Edit
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit Tempat</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<div class="py-4 space-y-4">
			<div class="space-y-4">
				<Label for="tempat">Tempat</Label>
				<Input id="tempat" placeholder="Masukkan tempat" bind:value={nama} />
			</div>
			<div class="space-y-4">
				<Label>Status</Label>
				<RadioGroup.Root class="flex space-x-3.5" bind:value={status}>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="Aktif" id="aktif" />
						<Label for="aktif">Aktif</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="Tidak aktif" id="tidak-aktif" />
						<Label for="tidak-aktif">Tidak aktif</Label>
					</div>
				</RadioGroup.Root>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" class="w-full" on:click={saveData}>Simpan</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>