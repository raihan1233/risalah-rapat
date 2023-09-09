<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Label } from "$lib/components/ui/label";
	import { Input } from "$lib/components/ui/input";
	import "../app.postcss"
</script>

<div class="background">
	<div class="w-1/2 mx-auto pt-20">
		<Card.Root>
			<Card.Header class="space-y-1">
				<img src="/Logogram.png" alt="logo" class="w-16 mx-auto">
			</Card.Header>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@gmail.com" />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" placeholder="masukkan password" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button class="w-full">Masuk</Button>
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