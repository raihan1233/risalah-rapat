<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import Swal from 'sweetalert2';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { PlusCircle } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let data;

	const dispatch = createEventDispatcher();

	let isDialogOpen = false;

	let inputData = {
		file: null,
		name: ''
	};

	async function fetchData() {
		try {
			const formData = new FormData();
			formData.append('attachment', inputData.file);
			formData.append('attachmentName', inputData.name);

			const response = await fetch('http://localhost:3000/upload-relation-documents', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const newData = await response.json(); // Assuming the API responds with the newly added user data
				data = [...data, newData];

				Swal.fire({
					icon: 'success',
					title: 'Data berhasil ditambahkan',
					showConfirmButton: false,
					timer: 1500
				}).then(() => {
					// Close the dialog by setting isDialogOpen to false
					isDialogOpen = false;
				});

				dispatch('dataSaved', newData);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Terjadi kesalahan saat menambahkan data'
				});
			}
		} catch (error) {
			console.error('Error:', error);
			Swal.fire({
				icon: 'error',
				title: 'Terjadi kesalahan saat menambahkan data'
			});
		}
	}

	// Update your saveData function to call fetchData
	const saveData = () => {
		if (inputData.file && inputData.name) {
			fetchData();
		}
	};

	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			inputData.file = file;
		}
	};
</script>

<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Trigger
		class={buttonVariants({
			variant: 'default',
			className: 'bg-sky-500 hover:bg-sky-700 text-white'
		})}
	>
		<PlusCircle class="w-5 h-5 mr-2" />
		Tambah
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Tambah Dokumen Relasi</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<div class="py-4 space-y-4">
			<div class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
				<Label for="unggah-lampiran">Unggah Lampiran</Label>
				<Input
					id="unggah-lampiran"
					type="file"
					class="cursor-pointer"
					name="attachment"
					on:change={handleFileInputChange}
				/>
			</div>
			<div class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
				<Label for="nama-lampiran">Nama Lampiran</Label>
				<Input
					id="nama-lampiran"
					placeholder="masukkan nama lampiran"
					bind:value={inputData.name}
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" class="w-full" on:click={saveData}>Simpan</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
