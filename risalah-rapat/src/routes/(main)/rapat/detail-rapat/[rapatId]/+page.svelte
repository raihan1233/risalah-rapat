<script lang="ts">
	import type { PageData } from './$types';
	import FormRapat from './form-rapat.svelte';
	import DataTable from './data-table.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Save, FileOutput, Send, XCircle, FileStack } from 'lucide-svelte';
	import Tabs from './tabs.svelte';

	import Swal from 'sweetalert2';
	import KonfirmasiRevisi from './konfirmasi-revisi.svelte';
	import KonfirmasiBatal from './konfirmasi-batal.svelte';

	const sendData = () => {
		Swal.fire({
			icon: 'success',
			title: 'Data berhasil dikirim',
			showConfirmButton: false,
			timer: 1500
		});
	};

	const saveDraft = () => {
		Swal.fire({
			icon: 'success',
			title: 'Draft berhasil disimpan',
			showConfirmButton: false,
			timer: 1500
		});
	};

	export let data: PageData;
</script>

<div class="container mx-auto py-10 space-y-8">
	<Card.Root>
		<Card.Header>
			<h2 class="text-3xl font-bold tracking-tight">Detail Risalah</h2>
		</Card.Header>
		<Card.Content>
			<FormRapat data={data.form} />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<div class="space-y-4 pt-4">
			<!-- <Card.Header>
				<h2 class="text-3xl font-bold tracking-tight">Checker</h2>
			</Card.Header> -->
			<Card.Content>
				<Tabs />
			</Card.Content>
		</div>
	</Card.Root>
	<div class="flex space-x-4">
		<Button class="bg-sky-500 hover:bg-sky-700" on:click={saveDraft}>
			<Save class="mr-2 h-4 w-4" />
			Simpan Draft
		</Button>
		<Button class="bg-cyan-500 hover:bg-cyan-700">
			<FileOutput class="mr-2 h-4 w-4" />
			Lihat Output PDF
		</Button>
		<Button class="bg-emerald-500 hover:bg-emerald-700" on:click={sendData}>
			<Send class="mr-2 h-4 w-4" />
			Kirim
		</Button>
		<KonfirmasiRevisi />
		<KonfirmasiBatal />
	</div>
</div>
