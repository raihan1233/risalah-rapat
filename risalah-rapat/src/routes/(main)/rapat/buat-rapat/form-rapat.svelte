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
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let data: SuperValidated<FormSchema>;

	import { onMount } from 'svelte';

	let selectedTemplate;

	let saveData = {
		dateStart: '',
		dateEnd: '',
		tempat: '',
		template: '',
		perihal: '',
		download: '',
		updateTemp: ''
	};

	let templateOptions = [
			{ value: 'first.pdf', label: 'Template One', downloadLink: '/files/template1.pdf' },
			{ value: 'second.pdf', label: 'Template Two', downloadLink: '/files/template2.pdf' },
			{ value: 'three.pdf', label: 'Template Three', downloadLink: '/files/template3.pdf' }
		];; //store template option fetched from API

	const updateDownloadLink = () => {
        // console.log('update download link');
        if (saveData.template) {
			// saveData.download = selectedTemplate.downloadLink;
			const selectedOption = templateOptions.find((option) => option.value === saveData.template);
			if (selectedOption) {
				saveData.download = selectedOption.downloadLink;
			} else {
				saveData.download = ''; //no matching template found
			}
            // console.log('Download link set:', saveData.download);
		} else {
			saveData.download = ''; //no template selected and hide the link
            // console.log('no template selected');
		}
	};

	
	// update the download link whenever the template value changes
	$: {
        // selectedTemplate = templateOptions.find((option) => option.value === saveData.template)
        updateDownloadLink()
    };

	const handleSubmit = () => {
		console.log(saveData);
		// showAddButton();
	};

	// onMount(async () => {
		
	// });

	import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css';
		import 'flatpickr/dist/themes/light.css';

   onMount(() => {
		flatpickr('#inputDate', {
			mode: "range",
			allowInput: true,
			clickOpens: true,
			time_24hr: true,
			enableTime: true, // Enable time selection
			dateFormat: 'Y-m-d H:i', // Format for both date and time
        theme: 'light'
		});
	});
</script>

<Form.Root form={data} schema={formSchema} let:config class="space-y-8">
	<Form.Item>
		<Form.Field {config} name="perihal">
			<Form.Label>Perihal</Form.Label>
			<Form.Input 			bind:value={saveData.perihal}
			on:input={(e) => (saveData.perihal = e.target.value)} placeholder="Perihal pemindahan jadwal rapat" />
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="periode-waktu">
			<Form.Label for="inputDate">Periode Waktu</Form.Label>
				<Form.Input
				 	id="inputDate"
					placeholder="Masukkan periode waktu"
				/>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="tempat">
			<Form.Label>Tempat</Form.Label>
			<Form.Select bind:value={saveData.tempat}
			on:input={(e) => (saveData.tempat = e.target.value)}>
				<Form.SelectTrigger placeholder="Pilih tempat" />
				<Form.SelectContent>
					<Form.SelectItem value="one" label="one">one</Form.SelectItem>
					<Form.SelectItem value="two" label="two">two</Form.SelectItem>
					<Form.SelectItem value="three" label="three">three</Form.SelectItem>
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
					<Form.SelectItem value="one" label="one">one</Form.SelectItem>
					<Form.SelectItem value="two" label="two">two</Form.SelectItem>
					<Form.SelectItem value="three" label="three">three</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="download">
			<Form.Label>Download</Form.Label>
			{#if saveData.download}
			<a href={saveData.download} id="downloadLink" class="form-control" download="filename.pdf">
				{saveData.template}
			</a>
		{:else}
			<p>No template selected</p>
		{/if}
			<!-- {#if saveData.download}
			<a href={saveData.download} class="form-control" download="filename.pdf">
				{saveData.template}
			</a>
			{:else}
			<p>No template selected</p>
			{/if} -->
			<!-- <Form.Validation /> -->
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field
			{config}
			name="unggah-template"
			class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4"
		>
			<Form.Label for="unggah-template">Unggah Template</Form.Label>
			<Form.Input 			bind:value={saveData.updateTemp}
			on:input={(e) => (saveData.updateTemp = e.target.value)} id="unggah-template" type="file" class="cursor-pointer" />
		</Form.Field>
	</Form.Item>
</Form.Root>
