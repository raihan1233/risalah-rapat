<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Separator } from "$lib/components/ui/separator";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import Swal from 'sweetalert2';
  import { Pencil } from "lucide-svelte";

  export let id;
  let tempat = "";
  let status = "aktif";

  const saveData = async () => {
    try {
      const response = await fetch(`/place/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tempat, status }), // Send the updated data
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Data berhasil disimpan',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.error('Failed to update data:', response.statusText);
        Swal.fire({
          icon: 'error',
          title: 'Gagal menyimpan data',
          text: 'Terjadi kesalahan saat menyimpan data.'
        });
      }
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal menyimpan data',
        text: 'Terjadi kesalahan saat menyimpan data.'
      });
    }
  };
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "default", className: "bg-sky-500 hover:bg-sky-700" })}>
    <Pencil class="h-4 w-4" />
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Edit Tempat</Dialog.Title>
    </Dialog.Header>
    <Separator />
    <div class="py-4 space-y-4">
      <div class="space-y-4">
        <Label for="tempat">Tempat</Label>
        <Input id="tempat" placeholder="Masukkan tempat" bind:value={tempat} />
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