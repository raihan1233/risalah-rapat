<script>
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import Swal from 'sweetalert2';
	import { Pencil } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { BASE_URL_EXPRESS, getUserId } from '../../../../utils/network-data';

	let user = getUserId();
	let dispatch = createEventDispatcher();

	export let id_template;
	export let templateData;

	let title = templateData.nama_template;
	let file = templateData.file;
	let selectedFile = null;

	// let file = null;
	// console.log(file);
	let status = templateData.status;

	// Add a variable to store the fetched place data
	// let templateData = null;

	let isDialogOpen = false;

	const saveData = async () => {
		try {
		// 	const newData = {
		// 	id_template: id_template,
		// 	nama: nama, 
		// 	status: status, 
  	// 	modified_by: parseInt(user, 10)
		// };

			const formData = new FormData();
			formData.append('id_template', id_template)
			formData.append('attachmentTitle', title);
			formData.append('attachment', selectedFile);
			formData.append('status', status);
			formData.append('modified_by', parseInt(user, 10));

			const response = await fetch(`${BASE_URL_EXPRESS}/_QUERIES/templates/patch_template/${id_template}`, {
				method: 'PATCH',
				body: formData
			});

			if (response.ok) {
				const responseData = await response.text();
				console.log(responseData);

				dispatch('dataUpdated', formData);
				console.log(formData);

				Swal.fire({
					icon: 'success',
					title: 'Data berhasil disimpan',
					showConfirmButton: false,
					timer: 1500
				}).then(() => {
					// Close the dialog by setting isDialogOpen to false
					isDialogOpen = false;
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Gagal menyimpan data',
					text: 'Terjadi kesalahan saat menyimpan data'
				});
			}
		} catch (error) {
			console.error('Error updating template data:', error);
		}
	};

	// const handleFileInputChange = (event) => {
	// 	const file = event.target.files[0];
	// 	console.log(file);
	// 	if (file) {
	// 		templateData.file = file;
	// 		console.log(file);
	// 	}
	// };

	$: if (file) {
		// const file = event.target.files[0];
		// templateData.file = file;
		console.log(file);
	}

	const handleFileInputChange = (event) => {
		const newFile = event.target.files[0];
		console.log(newFile);
		if (newFile) {
			selectedFile = newFile;
			console.log(selectedFile);
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
			<Dialog.Title>Edit Template</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<div class="py-4 space-y-4">
			<div class="space-y-4">
				<Label for="template">Template</Label>
				<Input id="template" placeholder="Masukkan nama template" bind:value={title} />
			</div>
			<div class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
				<Label for="unggah-template">Unggah Template</Label>
				<Input
					id="unggah-template"
					type="file"
					class="cursor-pointer"
					name="attachment"
					bind:file
					on:change={handleFileInputChange}
				/>
			</div>
			<div class="space-y-4">
				<Label>Status</Label>
				<RadioGroup.Root class="flex space-x-3.5" bind:value={status}>
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
