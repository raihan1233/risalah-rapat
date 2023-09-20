<script lang="ts">
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

	export let templateData = {};
	export let templateId = '';
  export let index;
  export let data = [];

  let id = `user-${uuidv4(16)}`;
	const handleSubmit = async () => {
		try {
      data[index] = { ...templateData };

			const response = await fetch(`http://localhost:3000/template/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(templateData)
			});
      console.log(data);
      
			console.log(templateData);

			if (response.ok) {
				Swal.fire({
					icon: 'success',
					title: 'Data berhasil dirubah',
					showConfirmButton: false,
					timer: 1500
				});

				dispatch('update data');
			} else {
				console.error('Failed to update template');
			}
		} catch (error) {
			console.error('Error updating template:', error);
		}
	};

	onMount(async () => {
		if (templateId) {
			try {
				const response = await fetch(`http://localhost:3000/template/${templateId}`);

				if (response.ok) {
					Swal.fire({
						icon: 'success',
						title: 'Data berhasil dirubah',
						showConfirmButton: false,
						timer: 1500
					});

					const data = await response.json();
					templateData = data;

					dispatch('update data');
				} else {
					console.error('Failed to update template');
				}
			} catch (error) {
				console.error('Error updating template:', error);
			}
		}
	});
</script>

<Dialog.Root>
	<Dialog.Trigger
		class={buttonVariants({ variant: 'default', className: 'bg-sky-500 hover:bg-sky-700' })}
		on:click={() => dispatch('edit', templateId)}
	>
		<Pencil class="h-4 w-4" />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit Template</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<div class="py-4 space-y-4">
			<div class="space-y-4">
				<Label for="template">Template</Label>
				<Input id="template" placeholder="Masukkan nama template" bind:value={templateData.title} />
			</div>
			<div class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
				<Label for="unggah-template">Unggah Template</Label>
				<Input id="unggah-template" type="file" class="cursor-pointer" />
			</div>
			<div class="space-y-4">
				<Label>Status</Label>
				<RadioGroup.Root value="aktif" class="flex space-x-3.5">
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="aktif" id="aktif" />
						<Label for="aktif">Aktif</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="tidak-aktif" id="tidak-aktif" />
						<Label for="tidak-aktif">Tidak Aktif</Label>
					</div>
				</RadioGroup.Root>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" class="w-full" on:click={handleSubmit}>Simpan</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
