<script>
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { createEventDispatcher } from 'svelte';
	import Swal from 'sweetalert2';
	import { BASE_URL_PRESTD, BASE_URL_EXPRESS, fetchWithToken, getUserId } from '../../../../utils/network-data';

	let user = getUserId();

	const saveData = async () => {
		const newData = {
			nama: inputData.nama, // Example value, replace with actual input data
			status: inputData.status, // Example value, replace with actual input data
			created_by: parseInt(user, 10),
  		modified_by: parseInt(user, 10)
		};

		// Emit an event with the new data
		try {
			const response = await fetchWithToken(`${BASE_URL_PRESTD}/_QUERIES/places/add_place?nama=${inputData.nama}&status=${inputData.status}&created_by=${user}&modified_by=${user}`, {
				method: 'POST',
				body: JSON.stringify(newData)
			});
			console.log('New Data:', newData);

			if (response.ok) {
				const responseData = await response.json();
				console.log(responseData);
				// Emit an event with the new data (if needed)
				dispatch('dataSaved', JSON.stringify(newData));

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

	let inputData = {
		nama: '',
		status: ""
	};

	const dispatch = createEventDispatcher();

	let isDialogOpen = false;
</script>

<Dialog.Root bind:open={isDialogOpen}>
	<div class="px-4">
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Tambah</Dialog.Trigger>
	</div>
	<form action="?/createPlace" method="POST">
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Tambah Tempat</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<div class="py-4 space-y-4">
			<div class="space-y-4">
				<Label for="nama">Tempat</Label>
				<Input id="nama" placeholder="Masukkan tempat" />
			</div>
			<div class="space-y-4">
				<Label>Status</Label>
				<RadioGroup.Root class="flex space-x-3.5">
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="Aktif" id="aktif" name="status"/>
						<Label for="aktif">Aktif</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="Tidak aktif" id="tidak-aktif" name="status" />
						<Label for="tidak-aktif">Tidak Aktif</Label>
					</div>
				</RadioGroup.Root>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" class="w-full">Simpan</Button>
		</Dialog.Footer>
	</Dialog.Content>
	</form>
</Dialog.Root>