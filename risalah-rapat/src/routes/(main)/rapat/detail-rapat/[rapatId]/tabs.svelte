<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
  import DataTable from './data-table.svelte';
	import DokumenRelasi from './dokumen-relasi.svelte';
	import CatatanRevisi from './catatan-revisi.svelte';
	import RelationDataTable from './relation-data-table.svelte';
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
				<RelationDataTable />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="Catatan Revisi">
		<Card.Root>
			<Card.Header>
				<Card.Title>Catatan Revisi Dokumen</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<CatatanRevisi />
			</Card.Content>
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
