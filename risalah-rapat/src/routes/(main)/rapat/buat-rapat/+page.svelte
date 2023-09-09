<script lang="ts">
  import type { PageData } from "./$types";
	import FormRapat from "./form-rapat.svelte";
  import DataTable from "./data-table.svelte";
  import * as Card from "$lib/components/ui/card";

	export let data: PageData;

  let isSwitchOn = true;

  // Function to programmatically toggle the switch
  function toggleSwitch() {
    isSwitchOn = !isSwitchOn;
  }
</script>


<div class="container mx-auto py-10 space-y-8">
  <Card.Root>
  <Card.Header>
  <div class="flex items-center justify-between">
    <h2 class="text-3xl font-bold tracking-tight">Buat Rapat</h2>
    <div class="flex items-center">
      <button
        class={isSwitchOn ? "bg-sky-500 w-10 h-6 rounded-full p-1" : "w-10 h-6 bg-gray-300 rounded-full p-1"}
        on:click={toggleSwitch}
      >
        <span
          class="bg-white w-4 h-4 rounded-full block shadow-md transform transition-transform"
          class:translate-x-full={isSwitchOn}
        ></span>
      </button>
    </div>
  </div>
  </Card.Header>
  <Card.Content>
  <div>
    {#if isSwitchOn}
      <FormRapat data={data.form} />
    {/if}
  </div>
  </Card.Content>
  </Card.Root>

  <Card.Root>
  <div class="space-y-4">
    <Card.Header>
      <h2 class="text-3xl font-bold tracking-tight">Checker</h2>
    </Card.Header>
    <Card.Content>
      <DataTable />
    </Card.Content>
  </div>
  </Card.Root>

</div>