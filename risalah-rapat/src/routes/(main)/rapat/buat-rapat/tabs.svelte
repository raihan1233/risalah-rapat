<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
    import DataTable from './data-table.svelte';
	// import DokumenRelasi from './add-relation-document.svelte';
	import RelationDataTable from './relation-data-table.svelte';
</script>

<Tabs.Root value="Checker">
	<Tabs.List class="grid w-full grid-cols-2 bg-cyan-500 text-white">
			<Tabs.Trigger value="Checker">Checker</Tabs.Trigger>
		<Tabs.Trigger value="Dokumen Relasi">Dokumen Relasi</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="Checker">
		<Card.Root>
			<Card.Header>
				<Card.Title>Checker</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<DataTable />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>

	<Tabs.Content value="Dokumen Relasi">
		<Card.Root>
			<Card.Header>
				<Card.Title>Dokumen Relasi</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2">
				<!-- <DokumenRelasi /> -->
				<RelationDataTable />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
  
</Tabs.Root>
