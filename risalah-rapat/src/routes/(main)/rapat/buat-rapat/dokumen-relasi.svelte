<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import Swal from 'sweetalert2';
	import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
	import { PlusCircle } from 'lucide-svelte';

	const saveData = () => {
		Swal.fire({
			icon: 'success',
			title: 'Data berhasil ditambahkan',
			showConfirmButton: false,
			timer: 1500
		});
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'defalut', className: "bg-sky-500 hover:bg-sky-700 text-white" })}>
		<PlusCircle class="w-5 h-5 mr-2" />
		Tambah
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Tambah Dokumen Relasi</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<div class="py-4 space-y-4">
			<div
					class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4"
				>
					<Label for="unggah-lampiran">Unggah Lampiran</Label>
					<Input id="unggah-lampiran" type="file" class="cursor-pointer" />
				</div>
				<div
					class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4"
				>
					<Label for="nama-lampiran">Nama Lampiran</Label>
					<Input id="nama-lampiran" placeholder="masukkan nama lampiran" />
				</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" class="w-full" on:click={saveData}>Simpan</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
