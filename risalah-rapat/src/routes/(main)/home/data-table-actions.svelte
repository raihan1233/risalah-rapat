<script>
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	export let id;
	const directToDetailRapat = () => {
		goto(`/rapat/detail-rapat/`);
	}
</script>

<div class="flex space-x-4">
		

		<Button
			class="bg-emerald-500 hover:bg-emerald-700"
			on:click={directToDetailRapat}>Detail</Button
		>
		<!-- <a href="/rapat/detail-rapat/{rapatId}" class="btn bg-emerald-500 hover:bg-emerald-700">Details</a> -->
</div>
