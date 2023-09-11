<script lang="ts">
	// import { Icons } from "$lib/components/docs/icons";
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components//ui/input';
	import Swal from 'sweetalert2';
	import { Eye, EyeOff } from "lucide-svelte";

	let inputData = {
		passLama: '',
		passBaru: '',
		konfBaru: ''
	};

	let data = [
		{
			passLama: 'ardi12',
			passBaru: ''
		}
	];

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
		if (!inputData.passLama || !inputData.passBaru || !inputData.konfBaru) {
			popupError();
		}
		if (inputData.passLama === data[0].passLama && inputData.passBaru === inputData.konfBaru) {
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
</script>

<div class="p-5">
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
						bind:value={inputData.passLama}
					/>
					<div class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none" on:click={toggleOldPasswordVisibility}>
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
						bind:value={inputData.passBaru}
					/>
					<div class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none" on:click={toggleNewPasswordVisibility}>
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
						bind:value={inputData.konfBaru}
					/>
					<div class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none" on:click={toggleConfirmNewPasswordVisibility}>
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
			<Button class="w-full" on:click={handlesubmit}>Simpan</Button>
		</Card.Footer>
	</Card.Root>
</div>