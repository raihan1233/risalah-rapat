<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import '../app.postcss';
	import Swal from 'sweetalert2';
  import { Eye, EyeOff } from "lucide-svelte";

	const data = [
		{
			email: 'admin@gmail.com',
			password: 'admin'
		}
	];

	const popupSuccess = () => {
		Swal.fire(`selamat datang ${inputData.email} !`, 'tunggu beberapa saat', 'success');
	};

	const popupError = () => {
		Swal.fire({
			icon: 'error',
			title: 'Gagal masuk',
			text: 'Email atau password salah, silahkan coba lagi!'
		});
		return;
	};

	let inputData = {
		email: '',
		password: ''
	};

	const handleSubmit = () => {
		if (!inputData.email || inputData.password) {
			popupError();
		}
		if (inputData.email === data[0].email && inputData.password === data[0].password) {
			popupSuccess();
			setTimeout(() => {
				window.location.href = '/home';
			}, 1500);
		}
	};

	let showPassword = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
</script>

<div class="background">
	<div class="w-1/2 mx-auto pt-20">
		<Card.Root>
			<Card.Header class="space-y-1">
				<img src="/Logogram.png" alt="logo" class="w-16 mx-auto" />
			</Card.Header>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@gmail.com" bind:value={inputData.email} />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<div class="relative w-full">
						<Input id="password" type={showPassword ? 'text' : 'password'} placeholder="masukkan password" bind:value={inputData.password} />
						<div class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none" on:click={togglePasswordVisibility}>
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
			</Card.Content>
			<Card.Footer>
				<Button class="w-full" type="submit" on:click={handleSubmit}>Masuk</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>

<style>
	.background {
		background-image: url('/background.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		min-height: 100vh;
	}
</style>
