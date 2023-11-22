<script lang="ts">
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
	import Swal from 'sweetalert2';
	import type { PageData, ActionData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';

	export let data: PageData;
	export let form;
	$: ({ places } = data);

	let searchTerm = '';
	$: filteredItems = Array.isArray(places)
		? places.filter((item) => {
				const lowerSearchTerm = searchTerm.toLowerCase();
				return typeof item.nama === 'string' && item.nama.toLowerCase().includes(lowerSearchTerm);
		  })
		: [];

	let isAddDialogOpen = false;
	let isEditDialogOpen = false;
	let editedPlace = null;
	let submitSuccess = false;
</script>

<div class="py-10 space-y-4">
	<div class="space-y-4">
		<h2 class="text-3xl font-bold tracking-tight px-4">Master Tempat</h2>
	</div>
	<div>
		<div class="space-y-4 overflow-x-auto">
			<Dialog.Root open={form?.success && false}>
				<div class="px-4">
					<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Tambah</Dialog.Trigger>
				</div>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Tambah Tempat</Dialog.Title>
					</Dialog.Header>
					<Separator />
					<form action="?/createPlace" method="POST" use:enhance>
						<div class="py-4 space-y-4">
							<div class="space-y-4">
								<Label for="nama">Tempat</Label>
								<Input id="nama" name="nama" placeholder="Masukkan tempat" />
								{#if form?.errors?.nama}
									<span class="py-2 text-red-400 text-sm">{form?.errors?.nama[0]}</span>
								{/if}
							</div>
							<div class="space-y-4">
								<Label>Status</Label>
								<RadioGroup.Root class="flex space-x-3.5">
									<div class="flex items-center space-x-2 mb-2">
										<Radio value="Aktif" id="aktif" name="status" />
										<Label for="aktif">Aktif</Label>
									</div>
									<div class="flex items-center space-x-2 mb-2">
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
					<TableHeadCell class="!p-4">Tempat</TableHeadCell>
					<TableHeadCell class="!p-4">Status</TableHeadCell>
					<TableHeadCell class="!p-4">Aksi</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each filteredItems as row, index (row.id_place)}
						<TableBodyRow>
							<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.nama}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.status}</TableBodyCell>
							<TableBodyCell class="!p-4 space-x-2">
								<button
									class={buttonVariants({
										variant: 'default',
										className: 'bg-sky-500 hover:bg-sky-700'
									})}
									on:click={() => {
										isEditDialogOpen = true;
										editedPlace = row;
									}}
								>
									<Pencil class="h-4 w-4 mr-2" /> Edit
								</button>

								{#if isEditDialogOpen && editedPlace.id_place === row.id_place}
									<Dialog.Root open={form?.success ? false : true}>
										<Dialog.Content class="sm:max-w-[425px]">
											<Dialog.Header>
												<Dialog.Title>Edit Tempat</Dialog.Title>
											</Dialog.Header>
											<Separator />
											<form action="?/updatePlace" method="POST" use:enhance>
												<input type="hidden" name="id_place" bind:value={editedPlace.id_place} />
												<div class="py-4 space-y-4">
													<div class="space-y-4">
														<Label for="nama">Tempat</Label>
														<Input
															id="nama"
															name="nama"
															placeholder="Masukkan tempat"
															bind:value={editedPlace.nama}
														/>
														{#if form?.errors?.nama}
															<span class="py-2 text-red-400 text-sm">{form?.errors?.nama[0]}</span>
														{/if}
													</div>
													<div class="space-y-4">
														<Label>Status</Label>
														<RadioGroup.Root class="flex space-x-3.5">
															<div class="flex items-center space-x-2 mb-2">
																<Radio
																	value="Aktif"
																	id="aktif"
																	name="status"
																	bind:group={editedPlace.status}
																	checked={editedPlace.status === 'Aktif'}
																/>
																<Label for="aktif">Aktif</Label>
															</div>
															<div class="flex items-center space-x-2 mb-2">
																<Radio
																	value="Tidak aktif"
																	id="tidak-aktif"
																	name="status"
																	bind:group={editedPlace.status}
																	checked={editedPlace.status === 'Tidak aktif'}
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
