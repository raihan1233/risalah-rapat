<script lang="ts">
  import type { PageData } from "./$types";
	import ProfileForm from "./form-rapat.svelte";
	export let data: PageData;

  let isSwitchOn = true;

  // Function to programmatically toggle the switch
  function toggleSwitch() {
    isSwitchOn = !isSwitchOn;
  }
</script>

<div class="container mx-auto py-10 space-y-4">
  <div class="flex items-center justify-between">
    <h2 class="text-3xl font-bold tracking-tight">Buat Rapat</h2>
    <div class="flex items-center">
      <button
        class={isSwitchOn ? "bg-blue-500 w-10 h-6 rounded-full p-1" : "w-10 h-6 bg-gray-300 rounded-full p-1"}
        on:click={toggleSwitch}
      >
        <span
          class="bg-white w-4 h-4 rounded-full block shadow-md transform transition-transform"
          class:translate-x-full={isSwitchOn}
        ></span>
      </button>
    </div>
  </div>
  {#if isSwitchOn}
    <ProfileForm data={data.form} />
  {/if}
</div>