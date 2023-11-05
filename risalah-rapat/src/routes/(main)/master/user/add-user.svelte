<script>
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import Swal from 'sweetalert2';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { BASE_URL_PRESTD, getUserId, fetchWithToken } from '../../../../utils/network-data';

	// export let data;
	let user = getUserId();

	let inputData = {
		name: '',
		username: '',
		jabatan: '',
		role: '',
		password: '',
		confirmPassword: '',
		status: ''
	};

	const saveData = async () => {
		const newData = {
			name: inputData.name,
			username: inputData.username,
			password: inputData.password,
			confirmPassword: inputData.confirmPassword,
			jabatan: inputData.jabatan,
			role: inputData.role,
			status: inputData.status // Example value, replace with actual input data
		};

		// Emit an event with the new data
		try {
			const response = await fetchWithToken(`${BASE_URL_PRESTD}/_QUERIES/users/add_user?name=${inputData.name}&username=${inputData.username}&password=${inputData.password}&jabatan=${inputData.jabatan}&role=${inputData.role}&status=${inputData.status}&created_by=${user}&modified_by=${user}`, {
				method: 'POST',
				body: JSON.stringify(newData)
			});
			console.log('New Data:', newData);

			if (response.ok) {
				const responseData = await response.text();
				console.log(responseData);
				// Emit an event with the new data (if needed)
				dispatch('dataSaved', JSON.stringify(newData));

				Swal.fire({
					icon: 'success',
					title: 'Data berhasil ditambahkan',
					showConfirmButton: false,
					timer: 1500
				}).then(() => {
          // Close the dialog by setting isDialogOpen to false
          isDialogOpen = false;
        });
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Gagal menambahkan data',
					text: 'Ada masalah saat menambahkan data ke server'
				});
			}
		} catch (error) {
			console.error('Error:', error);
			Swal.fire({
				icon: 'error',
				title: 'Terjadi kesalahan',
				text: 'Terjadi kesalahan saat mengirim data ke server'
			});
		}
	};

	const dispatch = createEventDispatcher();

	let isDialogOpen = false;

	let showPassword = false;

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	let showConfirmPassword = false;

	const toggleConfirmPasswordVisibility = () => {
		showConfirmPassword = !showConfirmPassword;
	};
</script>

<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Tambah</Dialog.Trigger>
	<Dialog.Content class="overflow-y-scroll max-h-screen sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Tambah User</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<div class="py-4 space-y-4">
			<div class="space-y-4">
				<Label for="nama-lengkap">Nama Lengkap</Label>
				<Input
					id="nama-lengkap"
					placeholder="Masukkan nama lengkap"
					bind:value={inputData.name}
				/>
			</div>
			<div class="space-y-4">
				<Label for="username">Username</Label>
				<Input id="username" placeholder="Masukkan username" bind:value={inputData.username} />
			</div>
			<div class="space-y-4">
				<Label for="jabatan">Jabatan</Label>
				<Input id="jabatan" placeholder="Masukkan jabatan" bind:value={inputData.jabatan} />
			</div>
			<div class="space-y-4">
				<Label for="password">Password</Label>
				<div class="relative w-full">
					<Input
						id="password"
						placeholder="Masukkan password"
						type={showPassword ? 'text' : 'password'}
						bind:value={inputData.password}
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
				</div>
			</div>
			<div class="space-y-4">
				<Label for="konfirmasi-password">Konfirmasi Password</Label>
				<div class="relative w-full">
					<Input
						id="konfirmasi-password"
						placeholder="Masukkan ulang password"
						type={showConfirmPassword ? 'text' : 'password'}
						bind:value={inputData.confirm_password}
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
				</div>
			</div>
			<div class="space-y-4">
				<Label>Role</Label>
				<RadioGroup.Root class="flex space-x-4" bind:value={inputData.role}>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="user" id="user" />
						<Label for="user">User</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="admin" id="admin" />
						<Label for="admin">Admin</Label>
					</div>
				</RadioGroup.Root>
			</div>
			<div class="space-y-4">
				<Label>Status</Label>
				<RadioGroup.Root class="flex space-x-3.5" bind:value={inputData.status}>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="Aktif" id="aktif" />
						<Label for="aktif">Aktif</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="Tidak aktif" id="tidak-aktif" />
						<Label for="tidak-aktif">Tidak Aktif</Label>
					</div>
				</RadioGroup.Root>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" class="w-full" on:click={saveData}>Simpan</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
