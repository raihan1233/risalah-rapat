<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Trash2 } from 'lucide-svelte';
	import Swal from 'sweetalert2';

	const deleteData = () => {
		Swal.fire({
			icon: 'success',
			title: 'Data berhasil dihapus',
			showConfirmButton: false,
			timer: 1500
		});
	};
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger
		class={buttonVariants({ variant: 'default', className: 'bg-red-500 hover:bg-red-700' })}
	>
		<Trash2 class="h-4 w-4" />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Apakah Anda yakin ingin menghapus data ini?</AlertDialog.Title>
			<AlertDialog.Description>Tindakan ini tidak dapat dibatalkan.</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Batal</AlertDialog.Cancel>
			<!-- <AlertDialog.Action type="button" on:click={deleteData}>
          Lanjutkan
        </AlertDialog.Action> -->
			<Button on:click={deleteData}>Lanjutkan</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
