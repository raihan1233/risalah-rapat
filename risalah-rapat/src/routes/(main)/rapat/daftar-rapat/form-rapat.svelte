<script lang="ts" context="module">
	import { z } from 'zod';
	export const formSchema = z.object({});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let data: SuperValidated<FormSchema>;;

</script>

<Form.Root form={data} schema={formSchema} let:config class="space-y-8">
	<Form.Item>
		<Form.Field {config} name="waktu_mulai">
			<Form.Label>Waktu Mulai</Form.Label>
			<Form.Input
				placeholder="Masukkan tanggal dan waktu mulai"
				type="datetime-local"
				id="waktu_mulai"
				name="waktu mulai"
				class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="waktu_selesai">
			<Form.Label>Waktu Selesai</Form.Label>
			<Form.Input
				placeholder="Masukkan tanggal dan waktu selesai"
				id="waktu_selesai"
				type="datetime-local"
				name="waktu selesai"
				class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
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