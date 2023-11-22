<script lang="ts">
	// import { Icons } from "$lib/components/docs/icons";
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components//ui/input';
	import Swal from 'sweetalert2';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	export let form;

	// const popupSuccess = () => {
	// 	Swal.fire({
	// 		icon: 'success',
	// 		title: 'Your work has been saved',
	// 		showConfirmButton: false,
	// 		timer: 1500
	// 	});
	// };

	// const popupError = () => {
	// 	Swal.fire({
	// 		icon: 'error',
	// 		title: 'Oops...',
	// 		text: 'Something went wrong!'
	// 	});
	// 	return;
	// };

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
</script>

<div class="py-10">
	<Card.Root>
		<form action="?/updatePassword" method="POST" use:enhance>
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Profile User</Card.Title>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<input type="hidden" name="id_user" />
					<Label for="oldPassword">Password Lama</Label>
					<div class="relative w-full">
						<Input
							id="oldPassword"
							type={showOldPassword ? 'text' : 'password'}
							placeholder="Masukkan password lama"
							name="oldPassword"
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
					{#if form?.errors?.oldPassword}
						<span class="py-2 text-red-400 text-sm">{form?.errors?.oldPassword[0]}</span>
					{/if}
				</div>
				<div class="grid gap-2">
					<Label for="newPassword">Password Baru</Label>
					<div class="relative w-full">
						<Input
							id="newPassword"
							type={showNewPassword ? 'text' : 'password'}
							placeholder="Masukkan password baru"
							name="newPassword"
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
					{#if form?.errors?.newPassword}
						<span class="py-2 text-red-400 text-sm">{form?.errors?.newPassword[0]}</span>
					{/if}
				</div>
				<div class="grid gap-2">
					<Label for="confirmNewPassword">Konfirmasi Password Baru</Label>
					<div class="relative w-full">
						<Input
							id="confirmNewPassword"
							type={showConfirmNewPassword ? 'text' : 'password'}
							placeholder="Masukkan konfirmasi password baru"
							name="confirmNewPassword"
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
						{#if form?.errors?.confirmNewPassword}
							<span class="py-2 text-red-400 text-sm">{form?.errors?.confirmNewPassword[0]}</span>
						{/if}
					</div>
				</div>
			</Card.Content>
			<Card.Footer>
				<Button type="submit" class="w-full">Simpan</Button>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
