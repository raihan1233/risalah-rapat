<script lang="ts" context="module">
	import { z } from 'zod';
	export const formSchema = z.object({
		perihal: z
			.string()
			.min(2, 'Perihal minimal harus 2 karakter.')
			.max(50, 'Perihal tidak boleh lebih dari 50 karakter.'),
		// waktu_mulai: z
		// 	.string({ required_error: "Mohon pilih waktu mulai" })
		// 	.datetime(),
		// waktu_selesai: z
		// 	.string({ required_error: "Mohon pilih waktu selesai" })
		// 	.datetime(),
		tempat: z.enum(['one', 'two', 'three'], {
			invalid_type_error: 'Pilih tempat',
			required_error: 'Mohon pilih tempat.'
		}),
		template: z.enum(['one', 'two', 'three'], {
			invalid_type_error: 'Pilih template',
			required_error: 'Mohon pilih template.'
		})
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import * as Form from '$lib/components/ui/form';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/light.css';

	let saveData = {
		perihal: '',
		periode: '',
		tempat: '',
		template: '',
		download: '',
		updateTemp: ''
	};	

	let templateOptions = [
		{ value: 'first.pdf', label: 'Template One', downloadLink: '/files/template1.pdf' },
		{ value: 'second.pdf', label: 'Template Two', downloadLink: '/files/template2.pdf' },
		{ value: 'three.pdf', label: 'Template Three', downloadLink: '/files/template3.pdf' }
	]; // Store template options fetched from API

	const updateDownloadLink = () => {
		const selectedOption = templateOptions.find((option) => option.value === saveData.template);
		saveData.download = selectedOption ? selectedOption.downloadLink : '';
	};

	// Update the download link whenever the template value changes
	$: {
		updateDownloadLink();
	}

	onMount(() => {
		flatpickr('#inputDate', {
			mode: 'range',
			allowInput: true,
			clickOpens: true,
			time_24hr: true,
			enableTime: true, // Enable time selection
			dateFormat: 'Y-m-d H:i', // Format for both date and time
			theme: 'light'
		});
	});
	const handleSubmit = () => {
		console.log(saveData);
		// Perform form submission or other actions here
	};
	import Svelecte from 'svelecte';

  let options = [{value: 1, label: 'Agenda 1'}, {value: 2, label: 'Agenda 2'}, {value: 3, label: 'Agenda 3'}];

  let labelAsValue = false;

  let selection = [];
  let value = [];
</script>

<Form.Root let:config class="space-y-8">
	<Form.Item>
		<Form.Field {config} name="perihal">
			<Form.Label>Perihal</Form.Label>
			<Form.Input
				bind:value={saveData.perihal}
				placeholder="Perihal pemindahan jadwal rapat"
			/>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="periode-waktu">
			<Form.Label for="inputDate">Periode Waktu</Form.Label>
			<Form.Input
				id="inputDate"
				placeholder="Masukkan periode waktu"
				bind:value={saveData.periode}
			/>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="tempat">
			<Form.Label>Tempat</Form.Label>
			<Form.Select
				bind:value={saveData.tempat}
			>
				<Form.SelectTrigger placeholder="Pilih tempat" />
				<Form.SelectContent>
					<Form.SelectItem value="one" label="One">One</Form.SelectItem>
					<Form.SelectItem value="two" label="Two">Two</Form.SelectItem>
					<Form.SelectItem value="three" label="Three">Three</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="template">
			<Form.Label>Template</Form.Label>
			<Form.Select bind:value={saveData.template}>
				<Form.SelectTrigger placeholder="Pilih template" />
				<Form.SelectContent>
					{#each templateOptions as option (option.value)}
						<Form.SelectItem value={option.value} label={option.label} key={option.value}>
							{option.label}
						</Form.SelectItem>
					{/each}
				</Form.SelectContent>
			</Form.Select>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="agenda">
			<Form.Label>Agenda</Form.Label>
				<Svelecte {options} {labelAsValue}
					bind:readSelection={selection}
					bind:value={value}
					multiple
					highlightFirstItem={false}
					placeholder="Pilih agenda"
				></Svelecte>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="download">
			<Form.Label>Download</Form.Label>
			{#if saveData.download}
				<a href={saveData.download} id="downloadLink" class="form-control" download="{saveData.template}">
					{saveData.template}
				</a>
			{:else}
				<p>No template selected</p>
			{/if}
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field
			{config}
			name="unggah-template"
			class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4"
		>
			<Form.Label for="unggah-template">Unggah Template</Form.Label>
			<Form.Input
				bind:value={saveData.updateTemp}
				id="unggah-template"
				type="file"
				class="cursor-pointer"
			/>
		</Form.Field>
	</Form.Item>

	<div class="mt-8">
		<button type="button" class="btn" on:click={handleSubmit}>Submit</button>
	</div>
</Form.Root>

<style>

  :global(.svelecte-control) {
    --sv-border-color: #e2e8f0 !important;
		--sv-active-border: 1px solid #e2e8f0 !important;
		--sv-height: 40px !important;
  }
	
</style>