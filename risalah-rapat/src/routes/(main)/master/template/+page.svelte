<script lang="ts">
	import EditTemplate from './edit-template.svelte';
	import AddTemplate from './add-template.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Pencil } from 'lucide-svelte';
	import { Radio } from 'flowbite-svelte';
	import type { PageData, ActionData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { BASE_URL_EXPRESS } from '../../../../utils/network-data';

	export let data: PageData;
	export let form;
	$: ({ templates } = data);

	let searchTerm = '';
	$: filteredItems = templates.filter((item) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});

	let isEditDialogOpen = false;
	let editedTemplate = null;
</script>

<div class="py-10 space-y-4">
	<div class="space-y-4">
		<h2 class="text-3xl font-bold tracking-tight">Master Template</h2>
	</div>
	<div>
		<div class="space-y-4 overflow-x-auto">
			<Dialog.Root open={form?.success && false}>
				<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Tambah</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Tambah Template</Dialog.Title>
					</Dialog.Header>
					<Separator />
					<form action="?/createTemplate" method="POST" enctype="multipart/form-data" use:enhance>
						<div class="py-4 space-y-4">
							<div class="space-y-4">
								<Label for="template">Template</Label>
								<Input id="template" placeholder="Masukkan nama template" name="attachmentTitle" />
								{#if form?.errors?.attachmentTitle}
									<span class="py-2 text-red-400 text-sm">{form?.errors?.attachmentTitle[0]}</span>
								{/if}
							</div>
							<div class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
								<Label for="unggah-template">Unggah Template</Label>
								<Input
									id="unggah-template"
									type="file"
									class="cursor-pointer"
									name="attachment"
									accept=".doc, .docx, .pdf"
								/>
								{#if form?.errors?.attachment}
									<span class="py-2 text-red-400 text-sm">{form?.errors?.attachment[0]}</span>
								{/if}
							</div>
							<div class="space-y-4">
								<Label>Status</Label>
								<RadioGroup.Root class="flex space-x-3.5">
									<div class="flex items-center space-x-2">
										<Radio value="Aktif" id="aktif" name="status" />
										<Label for="aktif">Aktif</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Radio value="Tidak aktif" id="tidak-aktif" name="status" />
										<Label for="tidak-aktif">Tidak Aktif</Label>
									</div>
								</RadioGroup.Root>
								{#if form?.errors?.status}
									<span class="py-2 text-red-400 text-sm">{form?.errors?.status[0]}</span>
								{/if}
							</div>
						</div>
						<Dialog.Footer>
							<Button type="submit" class="w-full">Simpan</Button>
						</Dialog.Footer>
					</form>
				</Dialog.Content>
			</Dialog.Root>

			<div class="sm:flex sm:justify-end">
				<TableSearch
					placeholder="Cari di sini"
					hoverable={true}
					bind:inputValue={searchTerm}
					classInput="mb-4 px-8 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs"
					classSvgDiv="p-2"
					divClass="shadow-none relative"
				/>
			</div>

			<Table shadow>
				<TableHead class="text-sm">
					<TableHeadCell class="!p-4">No</TableHeadCell>
					<TableHeadCell class="!p-4">Nama Template</TableHeadCell>
					<TableHeadCell class="!p-4">File</TableHeadCell>
					<TableHeadCell class="!p-4">Status</TableHeadCell>
					<TableHeadCell class="!p-4">Aksi</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each filteredItems as row, index (row.id_template)}
						<TableBodyRow>
							<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.nama_template}</TableBodyCell>
							<TableBodyCell class="!p-4"
								><a
									class="underline"
									href={`${BASE_URL_EXPRESS}/_QUERIES/templates/get_template/${row.file}`}
									download>{row.file}</a
								>
							</TableBodyCell>
							<TableBodyCell class="!p-4">{row.status}</TableBodyCell>
							<TableBodyCell class="!p-4">
								<button
									class={buttonVariants({
										variant: 'default',
										className: 'bg-sky-500 hover:bg-sky-700'
									})}
									on:click={() => {
										isEditDialogOpen = true;
										editedTemplate = row;
									}}
								>
									<Pencil class="h-4 w-4 mr-2" /> Edit
								</button>

								{#if isEditDialogOpen && editedTemplate.id_template === row.id_template}
									<Dialog.Root open={form?.success ? false : true}>
										<Dialog.Content class="sm:max-w-[425px]">
											<Dialog.Header>
												<Dialog.Title>Edit Template</Dialog.Title>
											</Dialog.Header>
											<Separator />
											<form
												action="?/updateTemplate"
												method="POST"
												enctype="multipart/form-data"
												use:enhance
											>
												<input
													type="hidden"
													name="id_template"
													bind:value={editedTemplate.id_template}
												/>
												<div class="py-4 space-y-4">
													<div class="space-y-4">
														<Label for="template">Template</Label>
														<Input
															id="template"
															placeholder="Masukkan nama template"
															name="attachmentTitle"
															bind:value={editedTemplate.nama_template}
														/>
														{#if form?.errors?.attachmentTitle}
															<span class="py-2 text-red-400 text-sm"
																>{form?.errors?.attachmentTitle[0]}</span
															>
														{/if}
													</div>
													<div class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
														<Label for="unggah-template">Unggah Template</Label>
														<Input
															id="unggah-template"
															type="file"
															class="cursor-pointer"
															name="attachment"
															bind:file={editedTemplate.file}
														/>
														{#if form?.errors?.attachment}
															<span class="py-2 text-red-400 text-sm"
																>{form?.errors?.attachment[0]}</span
															>
														{/if}
													</div>
													<div class="space-y-4">
														<Label>Status</Label>
														<RadioGroup.Root class="flex space-x-3.5">
															<div class="flex items-center space-x-2">
																<Radio
																	value="Aktif"
																	id="aktif"
																	name="status"
																	bind:group={editedTemplate.status}
																	checked={editedTemplate.status === 'Aktif'}
																/>
																<Label for="aktif">Aktif</Label>
															</div>
															<div class="flex items-center space-x-2">
																<Radio
																	value="Tidak Aktif"
																	id="tidak-aktif"
																	name="status"
																	bind:group={editedTemplate.status}
																	checked={editedTemplate.status === 'Tidak aktif'}
																/>
																<Label for="tidak-aktif">Tidak Aktif</Label>
															</div>
														</RadioGroup.Root>
														{#if form?.errors?.status}
															<span class="py-2 text-red-400 text-sm"
																>{form?.errors?.status[0]}</span
															>
														{/if}
													</div>
												</div>
												<Dialog.Footer>
													<Button type="submit" class="w-full">Simpan</Button>
												</Dialog.Footer>
											</form>
										</Dialog.Content>
									</Dialog.Root>
								{/if}
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	</div>
</div>
