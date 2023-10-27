<script lang="ts">
	// import { Icons } from "$lib/components/docs/icons";
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components//ui/input';
	import Swal from 'sweetalert2';
	import { Eye, EyeOff } from 'lucide-svelte';

	let inputData = {
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: ''
	};

	// let data = [
	// 	{
	// 		oldPassword: 'ardi12',
	// 		newPassword: ''
	// 	}
	// ];

	const popupSuccess = () => {
		Swal.fire({
			icon: 'success',
			title: 'Your work has been saved',
			showConfirmButton: false,
			timer: 1500
		});
	};

	const popupError = () => {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!'
		});
		return;
	};

	const handlesubmit = () => {
		if (!inputData.oldPassword || !inputData.newPassword || !inputData.confirmNewPassword) {
			popupError();
		}
		if (inputData.newPassword === inputData.confirmNewPassword) {
			popupSuccess();
			console.log(inputData);
		}
	};

	let showOldPassword = false;

	function toggleOldPasswordVisibility() {
		showOldPassword = !showOldPassword;
	}

	let showNewPassword = false;

	function toggleNewPasswordVisibility() {
		showNewPassword = !showNewPassword;
	}

	let showConfirmNewPassword = false;

	function toggleConfirmNewPasswordVisibility() {
		showConfirmNewPassword = !showConfirmNewPassword;
	}

	const saveData = async () => {
		try {
			const response = await fetch(`http://localhost:3000/users/${id}/update-password`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					oldPassword: inputData.oldPassword,
					newPassword: inputData.newPassword
				})
			});

			if (response.ok) {
				handlesubmit();
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Gagal menyimpan data',
					text: 'Terjadi kesalahan saat menyimpan data'
				});
			}
		} catch (error) {
			console.error('Error updating user data:', error);
		}
	};
</script>

<div class="py-10">
	<Card.Root>
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl">Profile User</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div class="grid gap-2">
				<Label for="passwordLama">Password Lama</Label>
				<div class="relative w-full">
					<Input
						id="passwordLama"
						type={showOldPassword ? 'text' : 'password'}
						placeholder="masukkan password lama"
						bind:value={inputData.oldPassword}
					/>
					<div
						class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none"
						on:click={toggleOldPasswordVisibility}
					>
						{#if showOldPassword}
							<!-- Eye icon open -->
							<Eye class="h-4 w-4 cursor-pointer" />
						{:else}
							<!-- Eye icon closed -->
							<EyeOff class="h-4 w-4 cursor-pointer" />
						{/if}
					</div>
				</div>
			</div>
			<div class="grid gap-2">
				<Label for="passwordBaru">Password Baru</Label>
				<div class="relative w-full">
					<Input
						id="passwordBaru"
						type={showNewPassword ? 'text' : 'password'}
						placeholder="masukkan password baru"
						bind:value={inputData.newPassword}
					/>
					<div
						class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none"
						on:click={toggleNewPasswordVisibility}
					>
						{#if showNewPassword}
							<!-- Eye icon open -->
							<Eye class="h-4 w-4 cursor-pointer" />
						{:else}
							<!-- Eye icon closed -->
							<EyeOff class="h-4 w-4 cursor-pointer" />
						{/if}
					</div>
				</div>
			</div>
			<div class="grid gap-2">
				<Label for="konfirmasiPasswordBaru">Konfirmasi Password Baru</Label>
				<div class="relative w-full">
					<Input
						id="konfirmasiPasswordBaru"
						type={showConfirmNewPassword ? 'text' : 'password'}
						placeholder="konfirmasi password baru"
						bind:value={inputData.confirmNewPassword}
					/>
					<div
						class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none"
						on:click={toggleConfirmNewPasswordVisibility}
					>
						{#if showConfirmNewPassword}
							<!-- Eye icon open -->
							<Eye class="h-4 w-4 cursor-pointer" />
						{:else}
							<!-- Eye icon closed -->
							<EyeOff class="h-4 w-4 cursor-pointer" />
						{/if}
					</div>
				</div>
			</div>
		</Card.Content>
		<Card.Footer>
			<Button class="w-full" on:click={saveData}>Simpan</Button>
		</Card.Footer>
	</Card.Root>
</div>
