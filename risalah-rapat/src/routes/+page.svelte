<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import '../app.postcss';
	import Swal from 'sweetalert2';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { BASE_URL_PRESTD, putAccessToken, putUserId } from '../utils/network-data';
	import { enhance } from '$app/forms';

	export let form;

	// let data = [];
	// const fetchUsers = async () => {
	// 	try {
	// 		const response = await fetch('http://localhost:3000/users'); // Replace with your API endpoint
	// 		if (response.ok) {
	// 			data = await response.json();
	// 			console.log(data);
	// 		} else {
	// 			console.error('Failed to fetch data from the API');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 	}
	// };

	// onMount(fetchUsers);

	const popupSuccess = () => {
		Swal.fire(`selamat datang ${inputData.username} !`, 'tunggu beberapa saat', 'success');
	};

	// console.log(form.username);

	// const popupError = () => {
	// 	Swal.fire({
	// 		icon: 'error',
	// 		title: 'Gagal masuk',
	// 		text: 'Username atau password salah, silahkan coba lagi!'
	// 	});
	// 	return;
	// };

	// let inputData = {
	// 	username: '',
	// 	password: ''
	// };

	// const handleSubmit = async () => {
	// 	if (!inputData.username || !inputData.password) {
	// 		popupError();
	// 		return;
	// 	}

	// 	try {
	// 		const response = await fetch(`${BASE_URL_PRESTD}/auth`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify(inputData)
	// 		});

	// 		if (response.ok) {
	// 			// Login successful
	// 			const data = await response.json();
	// 			token = data.token; // Store the JWT token
	// 			id_user = data.user_info.id;
	// 			putAccessToken(token);
	// 			putUserId(id_user);
	// 			popupSuccess();
	// 			setTimeout(() => {
	// 				window.location.href = '/home';
	// 			}, 1500);
	// 		} else {
	// 			// Login failed
	// 			popupError();
	// 		}
	// 	} catch (error) {
	// 		console.error('Error during login:', error);
	// 		popupError();
	// 	}
	// };

	let showPassword = false;
	// let token = '';
	// let id_user = '';

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

<div class="min-h-screen background">
	<div class="w-1/2 mx-auto pt-20">
		<Card.Root>
			<form action="?/auth" method="POST" use:enhance>
				<Card.Header class="space-y-1">
					<img src="/logo.png" alt="logo" class="w-1/4 mx-auto" />
				</Card.Header>
				<Card.Content class="grid gap-4">
					<div class="grid gap-2">
						<Label for="username">Username</Label>
						<Input id="username" type="text" placeholder="e.g: username12" name="username" />
						{#if form?.errors?.username}
							<span class="py-2 text-red-400 text-sm">{form?.errors?.username[0]}</span>
						{/if}
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<div class="relative w-full">
							<Input
								id="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="masukkan password"
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
						</div>
						{#if form?.errors?.password}
							<span class="py-2 text-red-400 text-sm">{form?.errors?.password[0]}</span>
						{/if}
					</div>
					{#if form?.incorrect}
						<p>Invalid username or password</p>
					{/if}
				</Card.Content>
				<Card.Footer>
					<Button class="w-full" type="submit">Masuk</Button>
				</Card.Footer>
			</form>
		</Card.Root>
	</div>
</div>

<style>
	.background {
		background-image: url('/background.jpg');
		background-repeat: no-repeat;
	}
</style>
