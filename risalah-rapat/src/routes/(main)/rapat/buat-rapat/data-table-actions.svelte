<script>
    import DeleteChecker from "./delete-checker.svelte";
    import { Button } from "$lib/components/ui/button";
  import { ArrowUpCircle, ArrowDownCircle } from "lucide-svelte";
</script>

<div class="flex space-x-4">
  <DeleteChecker />

  <Button class="bg-emerald-500 hover:bg-emerald-700">
    <ArrowUpCircle class="mr-2 h-4 w-4" />
    Up
  </Button>

  <Button class="bg-sky-500 hover:bg-sky-700">
    <ArrowDownCircle class="mr-2 h-4 w-4" />
    Down
  </Button>
</div>