<script lang="ts">
	import EditUser from './edit-user.svelte';
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
	import Swal from 'sweetalert2';
	import { Eye, EyeOff, Pencil } from 'lucide-svelte';
	import { Radio } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';

	export let data: PageData;
	export let form;

	$: ({ users } = data);

	let searchTerm = '';
	$: filteredItems = users.filter((item) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});

	let isAddDialogOpen = false;
	let isEditDialogOpen = false;
	let showPassword = false;
	let showConfirmPassword = false;
	let editedUser = null;

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	const toggleConfirmPasswordVisibility = () => {
		showConfirmPassword = !showConfirmPassword;
	};

	// const submitCreateUser: SubmitFunction = ({ form, data, action, cancel }) => {
	// 	return async ({ result, update }) => {
	// 		if (result.type === 'success') {
	// 			Swal.fire({
	// 				icon: 'success',
	// 				title: 'Data berhasil ditambahkan',
	// 				showConfirmButton: false,
	// 				timer: 1500
	// 			}).then(() => {
	// 				isAddDialogOpen = false;
	// 			});
	// 		}
	// 		await update();
	// 	};
	// };

	// const submitUpdateUser: SubmitFunction = ({ form, data, action, cancel }) => {
	// 	return async ({ result, update }) => {
	// 		if (result.type === 'success') {
	// 			Swal.fire({
	// 				icon: 'success',
	// 				title: 'Data berhasil diubah',
	// 				showConfirmButton: false,
	// 				timer: 1500
	// 			}).then(() => {
	// 				isEditDialogOpen = false;
	// 			});
	// 		}
	// 		await update();
	// 	};
	// };
</script>

<div class="py-10 space-y-4">
	<div class="space-y-4">
		<h2 class="text-3xl font-bold tracking-tight">Master User</h2>
	</div>
	<div>
		<div class="space-y-4 overflow-x-auto">
			<Dialog.Root open={form?.success && false}>
				<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Tambah</Dialog.Trigger>
				<Dialog.Content class="overflow-y-scroll max-h-screen sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Tambah User</Dialog.Title>
					</Dialog.Header>
					<Separator />
					<form action="?/createUser" method="POST" use:enhance>
						<div class="py-4 space-y-4">
							<div class="space-y-4">
								<Label for="nama-lengkap">Nama Lengkap</Label>
								<Input id="nama-lengkap" placeholder="Masukkan nama lengkap" name="name" />
								{#if form?.errors?.name}
									<span class="py-2 text-red-400 text-sm">{form?.errors?.name[0]}</span>
								{/if}
							</div>
							<div class="space-y-4">
								<Label for="username">Username</Label>
								<Input id="username" placeholder="Masukkan username" name="username" />
								{#if form?.errors?.username}
									<span class="py-2 text-red-400 text-sm">{form?.errors?.username[0]}</span>
								{/if}
							</div>
							<div class="space-y-4">
								<Label for="jabatan">Jabatan</Label>
								<Input id="jabatan" placeholder="Masukkan jabatan" name="jabatan" />
								{#if form?.errors?.jabatan}
									<span class="py-2 text-red-400 text-sm">{form?.errors?.jabatan[0]}</span>
								{/if}
							</div>
							<div class="space-y-4">
								<Label for="password">Password</Label>
								<div class="relative w-full">
									<Input
										id="password"
										placeholder="Masukkan password"
										type={showPassword ? 'text' : 'password'}
										name="password"
									/>
									<div
										class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none"
										on:click={togglePasswordVisibility}
									>
										{#if showPassword}
											<!-- Eye icon open -->
											<Eye class="h-4 w-4 cursor-pointer" />
										{:else}
											<!-- Eye icon closed -->
											<EyeOff class="h-4 w-4 cursor-pointer" />
										{/if}
									</div>
									{#if form?.errors?.password}
										<span class="py-2 text-red-400 text-sm">{form?.errors?.password[0]}</span>
									{/if}
								</div>
							</div>
							<div class="space-y-4">
								<Label for="confirmpassword">Konfirmasi Password</Label>
								<div class="relative w-full">
									<Input
										id="confirmpassword"
										placeholder="Masukkan ulang password"
										type={showConfirmPassword ? 'text' : 'password'}
										name="confirmpassword"
									/>
									<div
										class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none"
										on:click={toggleConfirmPasswordVisibility}
									>
										{#if showConfirmPassword}
											<!-- Eye icon open -->
											<Eye class="h-4 w-4 cursor-pointer" />
										{:else}
											<!-- Eye icon closed -->
											<EyeOff class="h-4 w-4 cursor-pointer" />
										{/if}
									</div>
									{#if form?.errors?.confirmpassword}
										<span class="py-2 text-red-400 text-sm">{form?.errors?.confirmpassword[0]}</span
										>
									{/if}
								</div>
							</div>
							<div class="space-y-4">
								<Label>Role</Label>
								<RadioGroup.Root class="flex space-x-4">
									<div class="flex items-center space-x-2">
										<Radio value="User" id="user" name="role" />
										<Label for="user">User</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Radio value="Admin" id="admin" name="role" />
										<Label for="admin">Admin</Label>
									</div>
								</RadioGroup.Root>
								{#if form?.errors?.role}
									<span class="py-2 text-red-400 text-sm">{form?.errors?.role[0]}</span>
								{/if}
							</div>
							<div class="space-y-4">
								<Label>Tipe</Label>
								<RadioGroup.Root class="flex space-x-4">
									<div class="flex items-center space-x-2">
										<Radio value="Internal" id="internal" name="tipe" />
										<Label for="internal">Internal</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Radio value="Eksternal" id="eksternal" name="tipe" />
										<Label for="eksternal">Eksternal</Label>
									</div>
								</RadioGroup.Root>
								{#if form?.errors?.tipe}
									<span class="py-2 text-red-400 text-sm">{form?.errors?.tipe[0]}</span>
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
					<TableHeadCell class="!p-4">Nama Lengkap</TableHeadCell>
					<TableHeadCell class="!p-4">Username</TableHeadCell>
					<TableHeadCell class="!p-4">Jabatan</TableHeadCell>
					<TableHeadCell class="!p-4">Role</TableHeadCell>
					<TableHeadCell class="!p-4">Tipe</TableHeadCell>
					<TableHeadCell class="!p-4">Status</TableHeadCell>
					<TableHeadCell class="!p-4">Aksi</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each filteredItems as row, index (row.id)}
						<TableBodyRow>
							<TableBodyCell class="!p-4">{index + 1}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.name}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.username}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.jabatan}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.role}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.tipe}</TableBodyCell>
							<TableBodyCell class="!p-4">{row.status}</TableBodyCell>
							<TableBodyCell class="!p-4">
								<button
									class={buttonVariants({
										variant: 'default',
										className: 'bg-sky-500 hover:bg-sky-700'
									})}
									on:click={() => {
										editedUser = row;
										isEditDialogOpen = true;
									}}
								>
									<Pencil class="h-4 w-4 mr-2" /> Edit
								</button>
								{#if isEditDialogOpen && editedUser.id === row.id}
									<Dialog.Root bind:open={isEditDialogOpen}>
										<Dialog.Content class="overflow-y-scroll max-h-screen sm:max-w-[425px]">
											<Dialog.Header>
												<Dialog.Title>Edit User</Dialog.Title>
											</Dialog.Header>
											<Separator />
											<form action="?/updateUser" method="POST" use:enhance>
												<input type="hidden" name="id_user" bind:value={editedUser.id} />
												<div class="py-4 space-y-4">
													<div class="space-y-4">
														<Label for="nama-lengkap">Nama Lengkap</Label>
														<Input
															id="nama-lengkap"
															placeholder="Masukkan nama lengkap"
															name="name"
															bind:value={editedUser.name}
														/>
														{#if form?.errors?.name}
															<span class="py-2 text-red-400 text-sm">{form?.errors?.name[0]}</span>
														{/if}
													</div>
													<div class="space-y-4">
														<Label for="username">Username</Label>
														<Input
															id="username"
															placeholder="Masukkan username"
															bind:value={editedUser.username}
														/>
														{#if form?.errors?.username}
															<span class="py-2 text-red-400 text-sm"
																>{form?.errors?.username[0]}</span
															>
														{/if}
													</div>
													<div class="space-y-4">
														<Label for="jabatan">Jabatan</Label>
														<Input
															id="jabatan"
															placeholder="Masukkan jabatan"
															bind:value={editedUser.jabatan}
														/>
														{#if form?.errors?.jabatan}
															<span class="py-2 text-red-400 text-sm"
																>{form?.errors?.jabatan[0]}</span
															>
														{/if}
													</div>
													<div class="space-y-4">
														<Label for="password">Password</Label>
														<div class="relative w-full">
															<Input
																id="password"
																placeholder="Masukkan password"
																type={showPassword ? 'text' : 'password'}
																bind:value={editedUser.password}
															/>
															<div
																class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none"
																on:click={togglePasswordVisibility}
															>
																{#if showPassword}
																	<!-- Eye icon open -->
																	<Eye class="h-4 w-4 cursor-pointer" />
																{:else}
																	<!-- Eye icon closed -->
																	<EyeOff class="h-4 w-4 cursor-pointer" />
																{/if}
															</div>
															{#if form?.errors?.password}
																<span class="py-2 text-red-400 text-sm"
																	>{form?.errors?.password[0]}</span
																>
															{/if}
														</div>
													</div>
													<div class="space-y-4">
														<Label for="konfirmasi-password">Konfirmasi Password</Label>
														<div class="relative w-full">
															<Input
																id="konfirmasi-password"
																placeholder="Masukkan ulang password"
																type={showConfirmPassword ? 'text' : 'password'}
																bind:value={editedUser.confirmpassword}
															/>
															<div
																class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none"
																on:click={toggleConfirmPasswordVisibility}
															>
																{#if showConfirmPassword}
																	<!-- Eye icon open -->
																	<Eye class="h-4 w-4 cursor-pointer" />
																{:else}
																	<!-- Eye icon closed -->
																	<EyeOff class="h-4 w-4 cursor-pointer" />
																{/if}
															</div>
															{#if form?.errors?.confirmpassword}
																<span class="py-2 text-red-400 text-sm"
																	>{form?.errors?.confirmpassword[0]}</span
																>
															{/if}
														</div>
													</div>
													<div class="space-y-4">
														<Label>Role</Label>
														<RadioGroup.Root class="flex space-x-4">
															<div class="flex items-center space-x-2">
																<Radio
																	value="User"
																	id="user"
																	name="role"
																	bind:group={editedUser.role}
																	checked={editedUser.role === 'User'}
																/>
																<Label for="user">User</Label>
															</div>
															<div class="flex items-center space-x-2">
																<Radio
																	value="Admin"
																	id="admin"
																	name="role"
																	bind:group={editedUser.role}
																	checked={editedUser.role === 'Admin'}
																/>
																<Label for="admin">Admin</Label>
															</div>
														</RadioGroup.Root>
														{#if form?.errors?.role}
															<span class="py-2 text-red-400 text-sm">{form?.errors?.role[0]}</span>
														{/if}
													</div>
													<div class="space-y-4">
														<Label>Tipe</Label>
														<RadioGroup.Root class="flex space-x-4">
															<div class="flex items-center space-x-2">
																<Radio
																	value="Internal"
																	id="internal"
																	name="tipe"
																	bind:group={editedUser.tipe}
																	checked={editedUser.tipe === 'Internal'}
																/>
																<Label for="internal">Internal</Label>
															</div>
															<div class="flex items-center space-x-2">
																<Radio
																	value="Eksternal"
																	id="eksternal"
																	name="tipe"
																	bind:group={editedUser.tipe}
																	checked={editedUser.tipe === 'Eksternal'}
																/>
																<Label for="eksternal">Eksternal</Label>
															</div>
														</RadioGroup.Root>
														{#if form?.errors?.tipe}
															<span class="py-2 text-red-400 text-sm">{form?.errors?.tipe[0]}</span>
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
																	bind:group={editedUser.status}
																	checked={editedUser.status === 'Aktif'}
																/>
																<Label for="aktif">Aktif</Label>
															</div>
															<div class="flex items-center space-x-2">
																<Radio
																	value="Tidak aktif"
																	id="tidak-aktif"
																	name="status"
																	bind:group={editedUser.status}
																	checked={editedUser.status === 'Tidak aktif'}
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
