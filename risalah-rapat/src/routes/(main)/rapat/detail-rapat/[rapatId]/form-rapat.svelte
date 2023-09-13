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

			import { onMount } from 'svelte';
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

	export let data: SuperValidated<FormSchema>;
</script>

<Form.Root form={data} schema={formSchema} let:config method="POST" class="space-y-8">
	<Form.Item>
		<Form.Field {config} name="perihal">
			<Form.Label>Perihal</Form.Label>
			<Form.Input placeholder="Perihal pemindahan jadwal risalah" />
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
			<Form.Select>
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
			<Form.Select>
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
			<p>No template selected</p>
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
			<Form.Input id="unggah-template" type="file" class="cursor-pointer" />
		</Form.Field>
	</Form.Item>
</Form.Root>
