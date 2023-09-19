<script>
    import DeleteChecker from "./delete-checker.svelte";
    import { Button } from "$lib/components/ui/button";
  import { Download } from "lucide-svelte";
</script>

<div class="flex space-x-4">
  <DeleteChecker />

  <Button class="bg-sky-500 hover:bg-sky-700">
    <a href="download.pdf" download="download.pdf"><Download class="h-4 w-4" /></a>
  </Button>
</div>