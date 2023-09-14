<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { data } from '$lib/stores/daftar-rapat'

  let status;
  $: status = $data.status;


  function getBadgeColor(status) {
    switch (status) {
      case 'Approve':
        return 'bg-emerald-500 hover:bg-emerald-700';
      case 'Terkirim':
        return 'bg-sky-500 hover:bg-sky-700';
      default:
        return 'bg-gray-500 hover:bg-gray-700';
    }
  }

  $: badgeColor = getBadgeColor(status); 
</script>

<Badge class={badgeColor}>
  {status}
</Badge>
