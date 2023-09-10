<script lang="ts">
	import type { PageData } from './$types';
	import FormRapat from './form-rapat.svelte';
	import DataTable from './data-table.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from "$lib/components/ui/button";
	import { Save, FileOutput, Send, XCircle } from "lucide-svelte"
	import Tabs from './tabs.svelte';

	export let data: PageData;

	let isSwitchOn = true;

	// Function to programmatically toggle the switch
	function toggleSwitch() {
		isSwitchOn = !isSwitchOn;
	}
</script>

<div class="container mx-auto py-10 space-y-8">
	<Card.Root>
		<Card.Header>
			<div class="flex items-center justify-between">
				<h2 class="text-3xl font-bold tracking-tight">Detail Rapat</h2>
				<div class="flex items-center">
					<button
						class={isSwitchOn
							? 'bg-sky-500 w-10 h-6 rounded-full p-1'
							: 'w-10 h-6 bg-gray-300 rounded-full p-1'}
						on:click={toggleSwitch}
					>
						<span
							class="bg-white w-4 h-4 rounded-full block shadow-md transform transition-transform"
							class:translate-x-full={isSwitchOn}
						/>
					</button>
				</div>
			</div>
		</Card.Header>
		<Card.Content>
			<div>
				{#if isSwitchOn}
					<FormRapat data={data.form} />
				{/if}
			</div>
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
		<Button class="bg-sky-500 hover:bg-sky-700">
			<Save class="mr-2 h-4 w-4" />
			Simpan Draft
		</Button>
		<Button class="bg-cyan-500 hover:bg-cyan-700">
			<FileOutput class="mr-2 h-4 w-4" />
			Lihat Output PDF
		</Button>
		<Button class="bg-emerald-500 hover:bg-emerald-700">
			<Send class="mr-2 h-4 w-4" />
			Kirim
		</Button>
		<Button class="bg-red-500 hover:bg-red-700">
			<XCircle class="mr-2 h-4 w-4" />
			Batalkan
		</Button>
	</div>
</div>
