<script lang="ts">
	// import { Icons } from "$lib/components/docs/icons";
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components//ui/input';
	import Swal from 'sweetalert2';

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
</script>

<div class="p-5">
	<Card.Root>
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl">Profile User</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div class="grid gap-2">
				<Label for="passwordLama">Password Lama</Label>
				<Input
					id="passwordLama"
					type="password"
					placeholder="masukkan password lama"
					bind:value={inputData.passLama}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="passwordBaru">Password Baru</Label>
				<Input
					id="passwordBaru"
					type="password"
					placeholder="masukkan password baru"
					bind:value={inputData.passBaru}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="konfirmasiPasswordBaru">Konfirmasi Password Baru</Label>
				<Input
					id="konfirmasiPasswordBaru"
					type="password"
					placeholder="konfirmasi password baru"
					bind:value={inputData.konfBaru}
				/>
			</div>
		</Card.Content>
		<Card.Footer>
			<Button class="w-full" on:click={handlesubmit}>Simpan</Button>
		</Card.Footer>
	</Card.Root>
</div>