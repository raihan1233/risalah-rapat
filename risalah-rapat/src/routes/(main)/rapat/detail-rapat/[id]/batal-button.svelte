<script>
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
      import { Button, buttonVariants } from "$lib/components/ui/button";
      import { XCircle } from "lucide-svelte";
  </script>
  
  <AlertDialog.Root>
    <AlertDialog.Trigger class={ buttonVariants({ className: "bg-red-500 hover:bg-red-700" })}>
      <XCircle class="mr-2 h-4 w-4" />
              Batalkan
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Apakah Anda yakin akan membatalkan aksi ini?</AlertDialog.Title>
        <!-- <AlertDialog.Description>
          Tindakan ini tidak dapat dibatalkan.
        </AlertDialog.Description> -->
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <!-- <AlertDialog.Action type="button" on:click={deleteData}>
          Lanjutkan
        </AlertDialog.Action> -->
        <Button href="/home">
          Lanjutkan
        </Button>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>