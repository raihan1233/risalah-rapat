<script>
	import DataTable from './data-table.svelte';
	import * as Card from '$lib/components/ui/card';
	import FormRapat from './form-rapat.svelte';

	let isToggleActive = true;

	const toggleVisibility = () => {
		isToggleActive = !isToggleActive;
	};

	let searchData = {};

	function handleSearch(event) {
    searchData = event.detail; // Update searchData with the search criteria
    // Perform data filtering or any other necessary actions with searchData
  }
</script>

<div class="overflow-x-hidden">
	<div class="py-10 space-y-8 container mx-auto ">
		<Card.Root>
			<Card.Header>
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-bold tracking-tight">Daftar Rapat</h2>
					<div class="flex items-center">
						<button
							class={isToggleActive
								? 'bg-sky-500 w-10 h-6 rounded-full p-1'
								: 'w-10 h-6 bg-gray-300 rounded-full p-1'}
							on:click={toggleVisibility}
						>
							<span
								class="bg-white w-4 h-4 rounded-full block shadow-md transform transition-transform"
								class:translate-x-full={isToggleActive}
							/>
						</button>
					</div>
				</div>
			</Card.Header>
			<Card.Content>
				<div>
					{#if isToggleActive}
						<FormRapat on:search={handleSearch}/>
					{/if}
				</div>
			</Card.Content>
		</Card.Root>
	
		<Card.Root>
			<div class="space-y-4">
				<Card.Content>
					<DataTable searchData={searchData} />
				</Card.Content>
			</div>
		</Card.Root>
	</div>
</div>