<script lang="ts">
	import FormRapat from './form-rapat.svelte';
	import DataTable from './data-table.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from "$lib/components/ui/button";
	import { Save, FileOutput, Send, XCircle } from "lucide-svelte"
	import Tabs from './tabs.svelte';

	import Swal from 'sweetalert2';
	import BatalButton from './batal-button.svelte';

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

	function openPDF() {
     let urlPDF = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
      window.open(urlPDF, '_blank');
    }
</script>

<div class="py-10 space-y-8">
	<Card.Root>
		<Card.Header>
				<h2 class="text-3xl font-bold tracking-tight">Buat Risalah</h2>
		</Card.Header>
		<Card.Content>
					<FormRapat />
		</Card.Content>
	</Card.Root>

<Card.Root>
		<div class="space-y-4 pt-4">
			<Card.Content>
				<Tabs />
			</Card.Content>
		</div>
	</Card.Root>

	<div class="sm:flex-row gap-4 flex flex-col">
		<Button class="bg-sky-500 hover:bg-sky-700" on:click={saveDraft}>
			<Save class="mr-2 h-4 w-4" />
			Simpan Draft
		</Button>
		<Button class="bg-cyan-500 hover:bg-cyan-700" on:click={openPDF}>
			<FileOutput class="mr-2 h-4 w-4" />
			Lihat PDF
		</Button>
		<Button class="bg-emerald-500 hover:bg-emerald-700" on:click={sendData}>
			<Send class="mr-2 h-4 w-4" />
			Kirim
		</Button>
		<BatalButton />
	</div>
</div>
