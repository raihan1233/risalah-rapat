<script lang="ts">
	import * as Select from '$lib/components/ui/select';
</script>

<Select.Root>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Pilih role" />
	</Select.Trigger>
	<Select.Content>
		<Select.Item value="checker">Checker</Select.Item>
		<Select.Item value="tanda-tangan">Tanda Tangan</Select.Item>
		<Select.Item value="peserta">Peserta</Select.Item>
		<Select.Item value="tembusan">Tembusan</Select.Item>
	</Select.Content>
</Select.Root>
