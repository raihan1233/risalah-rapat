<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import * as Form from '$lib/components/ui/form';
	import Swal from 'sweetalert2';

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
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Tambah</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Tambah Tempat</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<Form.Root>
			<Form.Item>
				<Form.Field
					name="unggah-lampiran"
					class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4"
				>
					<Form.Label for="unggah-lampiran">Unggah Lampiran</Form.Label>
					<Form.Input id="unggah-lampiran" type="file" class="cursor-pointer" />
				</Form.Field>
			</Form.Item>
			<Form.Item>
				<Form.Field
					name="unggah-template"
					class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4"
				>
					<Form.Label for="nama-lampiran">Nama Lampiran</Form.Label>
					<Form.Input id="nama-lampiran" placeholder="masukkan nama lampiran" />
				</Form.Field>
			</Form.Item>
		</Form.Root>
		<!-- <div class="py-4 space-y-4">
        <div class="space-y-4">
          <Label for="tempat">Unggah Lampiran</Label>
          <Input id="tempat" type="" placeholder="Masukkan tempat" />
        </div>
        <div class="space-y-4">
            <Label for="lampiran">Nama Lampiran</Label>
            <Input id="lampiran" placeholder="Masukkan tempat" />
        </div>
      </div> -->
		<Dialog.Footer>
			<Button type="submit" class="w-full" on:click={saveData}>Simpan</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
