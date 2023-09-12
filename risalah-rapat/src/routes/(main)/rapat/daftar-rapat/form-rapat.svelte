<script lang="ts" context="module">
	import { z } from 'zod';
	export const formSchema = z.object({});
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

	export let data: SuperValidated<FormSchema>;;

</script>

<Form.Root form={data} schema={formSchema} let:config class="space-y-8">
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
		<Form.Field {config} name="status">
			<Form.Label>Status</Form.Label>
			<Form.Select>
				<Form.SelectTrigger placeholder="Pilih status" />
				<Form.SelectContent>
					<Form.SelectItem value="Belum Approve" label="Belum Approve"
						>Belum Approve
					</Form.SelectItem>
					<Form.SelectItem value="Terkirim" label="Terkirim">Terkirim</Form.SelectItem>
					<Form.SelectItem value="Publish" label="Publish">Publish</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="tipe">
			<Form.Label>Tipe</Form.Label>
			<Form.Select>
				<Form.SelectTrigger placeholder="Pilih tipe" />
				<Form.SelectContent>
					<Form.SelectItem value="Checker" label="Checker">Checker</Form.SelectItem>
					<Form.SelectItem value="Approver" label="Approver">Approver</Form.SelectItem>
					<Form.SelectItem value="Tembusan" label="Tembusan">Tembusan</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="perihal">
			<Form.Label>Perihal</Form.Label>
			<Form.Input placeholder="Perihal pemindahan jadwal rapat" />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="tempat">
			<Form.Label>Tempat</Form.Label>
			<Form.Input placeholder="Pilih Tempat" />
		</Form.Field>
	</Form.Item>

	<Form.Button>Cari</Form.Button>
</Form.Root>