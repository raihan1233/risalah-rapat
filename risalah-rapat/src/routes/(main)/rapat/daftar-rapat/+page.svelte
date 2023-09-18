<script>
	import DataTable from './data-table.svelte';
	import * as Card from '$lib/components/ui/card';
	import FormRapat from './form-rapat.svelte';
	import { Filter } from 'lucide-svelte';

	let isFilterActive = true;

	const toggleFilter = () => {
		isFilterActive = !isFilterActive;
	};

	let searchData = {};

	function handleSearch(event) {
    searchData = event.detail; // Update searchData with the search criteria
    // Perform data filtering or any other necessary actions with searchData
  }
</script>

<div class="overflow-x-hidden">
	<div class="py-10 space-y-8">
		<Card.Root>
			<Card.Header>
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-bold tracking-tight">Daftar Risalah</h2>
					<div class="flex items-center">
						<button
							class="hover:bg-transparent focus:outline-none"
							on:click={toggleFilter}
						>
							<span>
								<Filter
									class={isFilterActive ? 'text-sky-500 fill-sky-500' : 'text-gray-400'}
									size={32}
								/>
							</span>
						</button>
					</div>
				</div>
			</Card.Header>
			<Card.Content>
				<div>
					{#if isFilterActive}
						<FormRapat on:search={handleSearch}/>
					{/if}
				</div>
			</Card.Content>
		</Card.Root>
	
		<Card.Root>
			<div class="space-y-4">
				<Card.Content class="p-6">
					<DataTable searchData={searchData} />
				</Card.Content>
			</div>
		</Card.Root>
	</div>
</div>