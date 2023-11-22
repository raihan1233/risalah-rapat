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
	import { BASE_URL_PRESTD, fetchWithToken, getUserId } from '../../../../utils/network-data';
	import { createEventDispatcher } from 'svelte';

	let user = getUserId();
	let dispatch = createEventDispatcher();	

	export let id_place;
	export let placeData;

	let	nama = placeData.nama;
	let	status = placeData.status;

	let isDialogOpen = false;

	const saveData = async () => {
		try {
			const newData = {
			id_place: id_place,
			nama: nama, 
			status: status, 
  		modified_by: parseInt(user, 10)
		};

			const response = await fetchWithToken(`${BASE_URL_PRESTD}/_QUERIES/places/patch_place?id_place=${id_place}&nama=${nama}&status=${status}&modified_by=${user}`, {
				method: 'PATCH',
				body: JSON.stringify(newData)
			});

			if (response.ok) {
				const responseData = await response.text();
				console.log(responseData);

				dispatch('dataUpdated', JSON.stringify(newData));
				console.log(newData);

				Swal.fire({
					icon: 'success',
					title: 'Data berhasil diubah',
					showConfirmButton: false,
					timer: 1500
				}).then(() => {
          // Close the dialog by setting isDialogOpen to false
          isDialogOpen = false;
        });
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Gagal mengubah data',
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

		import { Radio } from 'flowbite-svelte';
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
		<form action="?/updatePlace" method="POST" use:enhance>
		<div class="py-4 space-y-4">
			<div class="space-y-4">
				<Label for="tempat">Tempat</Label>
				<Input id="tempat" placeholder="Masukkan tempat" value={nama} />
			</div>
			<div class="space-y-4">
				<Label>Status</Label>
				<RadioGroup.Root class="flex space-x-3.5" value={status}>
					<div class="flex items-center space-x-2 mb-2">
						<!-- <RadioGroup.Item value="Aktif" id="aktif" name="status" /> -->
						<Radio value="Aktif" id="aktif" name="status" />
						<Label for="aktif">Aktif</Label>
					</div>
					<div class="flex items-center space-x-2 mb-2">
						<!-- <RadioGroup.Item value="Tidak aktif" id="tidak-aktif" name="status" /> -->
						<Radio value="Tidak aktif" id="tidak-aktif" name="status" />
						<Label for="tidak-aktif">Tidak Aktif</Label>
					</div>
				</RadioGroup.Root>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" class="w-full">Simpan</Button>
		</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>