<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Separator } from "$lib/components/ui/separator";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import Swal from 'sweetalert2';
  import { Pencil } from "lucide-svelte";

  const saveData = () => {
		Swal.fire({
			icon: 'success',
			title: 'Data berhasil disimpan',
			showConfirmButton: false,
			timer: 1500
		});
	};
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "default", className: "bg-sky-500 hover:bg-sky-700" })}>
    <Pencil class="h-4 w-4" />
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Edit Agenda</Dialog.Title>
    </Dialog.Header>
    <Separator />
    <div class="py-4 space-y-4">
      <div class="space-y-4">
        <Label for="agenda">Agenda</Label>
        <Input id="agenda" placeholder="Masukkan agenda" />
      </div>
    </div>
    <Dialog.Footer>
      <Button type="submit" class="w-full" on:click={saveData}>Simpan</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>