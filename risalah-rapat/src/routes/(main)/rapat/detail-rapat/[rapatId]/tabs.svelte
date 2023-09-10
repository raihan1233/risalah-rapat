<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
    import DataTable from './data-table.svelte';
	import DokumenRelasi from './dokumen-relasi.svelte';
</script>

<Tabs.Root value="Dokumen Relasi">
	<Tabs.List class="grid w-full grid-cols-3 bg-cyan-500 text-white">
		<Tabs.Trigger value="Dokumen Relasi">Dokumen Relasi</Tabs.Trigger>
		<Tabs.Trigger value="Catatan Revisi">Catatan Revisi</Tabs.Trigger>
		<Tabs.Trigger value="Detail Checker">Detail Checker</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="Dokumen Relasi">
		<Card.Root>
			<Card.Header>
				<Card.Title>Dokumen Relasi</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<DokumenRelasi />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="Catatan Revisi">
		<Card.Root>
			<Card.Header>
				<Card.Title>Password</Card.Title>
				<Card.Description>
					Change your password here. After saving, you'll be logged out.
				</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="current">Current password</Label>
					<Input id="current" type="password" />
				</div>
				<div class="space-y-1">
					<Label for="new">New password</Label>
					<Input id="new" type="password" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button>Save password</Button>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
    <Tabs.Content value="Detail Checker">
		<Card.Root>
			<Card.Header>
				<Card.Title>Detail Checker</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<DataTable />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
