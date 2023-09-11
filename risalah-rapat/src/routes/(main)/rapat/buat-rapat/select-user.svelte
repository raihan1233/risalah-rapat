<script lang="ts">
  import * as Select from "$lib/components/ui/select";
</script>

<Select.Root>
  <Select.Trigger class="w-[180px]">
    <Select.Value placeholder="Pilih user" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="user-1">User 1</Select.Item>
    <Select.Item value="user-2">User 2</Select.Item>
    <Select.Item value="user-3">User 3</Select.Item>
    <Select.Item value="user-4">User 4</Select.Item>
    <Select.Item value="user-5">User 5</Select.Item>
  </Select.Content>
</Select.Root>