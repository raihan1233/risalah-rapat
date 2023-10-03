<script>
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import Swal from 'sweetalert2';
	import { Pencil } from 'lucide-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	const dispatch = createEventDispatcher();

	export let id;

	let title = '';
	let file = '';
	let status = '';

	// Add a variable to store the fetched place data
	let templateData = null;

	let isDialogOpen = false;

	const fetchData = async () => {
		try {
			const response = await fetch(`http://localhost:3000/templates/${id}`);
			if (response.ok) {
				templateData = await response.json();
				// Set the input fields based on the fetched data
				title = templateData.title;
				file = templateData.file;
				status = templateData.status;
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
	};

	onMount(fetchData); // Fetch data when the component is mounted

	// Function to update user data and show success message
	const saveData = async () => {
		try {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('file', file);
			formData.append('status', status);

			const response = await fetch(`http://localhost:3000/templates/${id}`, {
				method: 'PUT',
				body: formData
			});

			if (response.ok) {
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
			console.error('Error updating user data:', error);
		}
	};

	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			templateData.file = file;
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
