<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Separator } from "$lib/components/ui/separator";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import { createEventDispatcher } from "svelte";
  import Swal from 'sweetalert2';

  export let data;
  
  const dispatch = createEventDispatcher();

  const saveData = async () => {
    const newData = {
      title: inputData.title, // Example value, replace with actual input data
      file: inputData.file,
      status: 'Aktif', // Example value, replace with actual input data
    };
    
  console.log(newData);

  try {
			const response = await fetch('http://localhost:3000/template', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newData)
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

    // Emit an event with the new data
    dispatch('dataSaved', newData);
		Swal.fire({
			icon: 'success',
			title: 'Data berhasil ditambahkan',
			showConfirmButton: false,
			timer: 1500
		});
	};
  

  let inputData = {
    title: "",
    file: ""
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    Tambah
  </Dialog.Trigger>
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
          <Input id="unggah-template" type="file" class="cursor-pointer"  bind:value={inputData.file}/>
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
      <Button type="submit" class="w-full" on:click={saveData}>Simpan</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>