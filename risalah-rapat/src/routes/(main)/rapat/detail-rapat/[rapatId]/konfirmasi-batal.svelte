<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { XCircle } from "lucide-svelte";
      import * as Dialog from "$lib/components/ui/dialog";
        import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
    import { Separator } from "$lib/components/ui/separator";
    import { Textarea } from "$lib/components/ui/textarea";
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger class={ buttonVariants({ className: "bg-red-500 hover:bg-red-700" })}>
    <XCircle class="mr-2 h-4 w-4" />
			Batalkan
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Apakah Anda yakin akan membatalkan dokumen ini?</AlertDialog.Title>
      <!-- <AlertDialog.Description>
        Tindakan ini tidak dapat dibatalkan.
      </AlertDialog.Description> -->
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <!-- <AlertDialog.Action type="button" on:click={deleteData}>
        Lanjutkan
      </AlertDialog.Action> -->
      <!-- <Button>
        Ya, revisi saja
      </Button> -->
      <Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "default" })}>
    Ya, batalkan saja
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Batalkan Notulen</Dialog.Title>
    </Dialog.Header>
    <Separator />
    <div class="py-4 space-y-4">
      <div class="space-y-4">
        <Label for="tempat">Alasan Pembatalan</Label>
        <Textarea placeholder="Silakan isi  alasan pembatalan di sini" />
      </div>
    </div>
    <Dialog.Footer>
      <Button type="submit" class="w-full">Konfirmasi batal</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>