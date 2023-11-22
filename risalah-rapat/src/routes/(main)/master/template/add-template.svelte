<script>
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { createEventDispatcher } from 'svelte';
	import Swal from 'sweetalert2';
	import { fetchWithToken, BASE_URL_PRESTD, getUserId, BASE_URL_EXPRESS } from '../../../../utils/network-data';

	let user = getUserId();

	// export let data = [];

	let dispatch = createEventDispatcher();

	let isDialogOpen = false;

	let inputData = {
		title: '',
		file: null,
		status: ''
	};

	async function saveData() {
		if (inputData.title && inputData.file && inputData.status) {
			try {
				const formData = new FormData();
				formData.append('attachmentTitle', inputData.title);
				formData.append('attachment', inputData.file);
				formData.append('status', inputData.status);
				formData.append('created_by', parseInt(user, 10));
				formData.append('modified_by', parseInt(user, 10));

				const response = await fetch(`${BASE_URL_EXPRESS}/_QUERIES/templates/add_template`, {
					method: 'POST',
					body: formData
				});

				if (response.ok) {
					const responseData = await response.text();
					console.log(responseData);
					// const res = Object.fromEntries(formData);
					// console.log(res);

					// const templateData = {};
					// 	formData.forEach((value, key) => {
					// 		templateData[key] = value;
					// 	});
					// dispatch('dataSaved', templateData);

					dispatch('dataSaved', formData);

					Swal.fire({
						icon: 'success',
						title: 'Data berhasil ditambahkan',
						showConfirmButton: false,
						timer: 1500
					}).then(() => {
						isDialogOpen = false;
					});

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
	}

	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			inputData.file = file;
		}
	};
</script>

<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Tambah</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Tambah Template</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<div class="py-4 space-y-4">
			<div class="space-y-4">
				<Label for="template">Template</Label>
				<Input id="template" placeholder="Masukkan nama template" bind:value={inputData.title} />
			</div>
			<div class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
				<Label for="unggah-template">Unggah Template</Label>
				<Input
					id="unggah-template"
					type="file"
					class="cursor-pointer"
					on:change={handleFileInputChange}
				/>
			</div>
			<div class="space-y-4">
				<Label>Status</Label>
				<RadioGroup.Root class="flex space-x-3.5" bind:value={inputData.status}>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="Aktif" id="aktif" />
						<Label for="aktif">Aktif</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="Tidak Aktif" id="tidak-aktif" />
						<Label for="tidak-aktif">Tidak Aktif</Label>
					</div>
				</RadioGroup.Root>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" class="w-full" on:click={saveData}>Simpan</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
