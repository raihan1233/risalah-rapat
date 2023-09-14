<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Trash2 } from 'lucide-svelte';
	import Swal from 'sweetalert2';

	export let onDelete;

	const confirmDelete = async () => {
		const result = await Swal.fire({
			icon: 'warning',
			title: 'Konfirmasi Hapus',
			text: 'Apakah Anda yakin ingin menghapus data ini?',
			showCancelButton: true,
			confirmButtonText: 'Ya',
			cancelButtonText: 'Tidak'
		});

		if (result.isConfirmed) {
			onDelete();
			Swal.fire({
				icon: 'success',
				title: 'Data berhasil dihapus',
				showConfirmButton: false,
				timer: 1500
			});
		}
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
			<Button on:click={confirmDelete}>Lanjutkan</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
