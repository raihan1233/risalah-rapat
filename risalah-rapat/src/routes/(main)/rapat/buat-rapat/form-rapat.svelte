<script lang="ts" context="module">
	import { z } from "zod";
	export const profileFormSchema = z.object({
		username: z
			.string()
			.min(2, "Username must be at least 2 characters.")
			.max(30, "Username must not be longer than 30 characters"),
		email: z
			.string({ required_error: "Please select an email to display" })
			.email(),
		bio: z.string().min(4).max(160).default("I own a computer."),
		website: z
			.string()
			.url({ message: "Please enter a valid URL." })
			.default("https://shadcn-svelte.com")
	});
	export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import type { SuperValidated } from "sveltekit-superforms";

	export let data: SuperValidated<ProfileFormSchema>;
</script>

<Form.Root
	form={data}
	schema={profileFormSchema}
	let:config
	method="POST"
	class="space-y-8"
	debug={true}
>
	<Form.Item>
		<Form.Field {config} name="perihal">
			<Form.Label>Perihal</Form.Label>
			<Form.Input placeholder="Perihal pemindahan jadwal rapat" />
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="waktu-mulai">
			<Form.Label>Waktu Mulai</Form.Label>
				<Form.Input placeholder="Masukkan tanggal dan waktu mulai" 
					type="datetime-local"
					name="waktu selesai"
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="waktu-selesai">
			<Form.Label>Waktu Selesai</Form.Label>
			<Form.Input placeholder="Masukkan tanggal dan waktu selesai" id="waktu-selesai"
          type="datetime-local"
					name="waktu selesai"
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="tempat">
			<Form.Label>Tempat</Form.Label>
			<Form.Select>
				<Form.SelectTrigger
					placeholder="Pilih tempat"
				/>
				<Form.SelectContent>
					<Form.SelectItem value="one" label="one"
						>one
					</Form.SelectItem>
					<Form.SelectItem value="two" label="two"
						>two
					</Form.SelectItem>
					<Form.SelectItem value="three" label="three"
						>three
					</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="template">
			<Form.Label>Template</Form.Label>
			<Form.Select>
				<Form.SelectTrigger
					placeholder="Pilih template"
				/>
				<Form.SelectContent>
					<Form.SelectItem value="one" label="one"
						>one
					</Form.SelectItem>
					<Form.SelectItem value="two" label="two"
						>two
					</Form.SelectItem>
					<Form.SelectItem value="three" label="three"
						>three
					</Form.SelectItem>
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
		<Form.Field {config} name="unggah-template" class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
			<Form.Label for="unggah-template">Unggah Template</Form.Label>
      <Form.Input id="unggah-template" type="file" class="cursor-pointer" />
		</Form.Field>
	</Form.Item>

	<Form.Button>Update profile</Form.Button>
</Form.Root>