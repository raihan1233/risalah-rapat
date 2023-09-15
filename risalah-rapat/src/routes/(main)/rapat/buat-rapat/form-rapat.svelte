<script>
	import { onMount } from 'svelte';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/light.css';
	import Tags from 'svelte-tags-input';

	let tags = [];

	let saveData = {
		perihal: '',
		periode: '',
		tempat: '',
		template: '',
		download: '',
		updateTemp: ''
	};

	let templateOptions = [
		{ value: 'first.pdf', label: 'Template One', downloadLink: '/files/template1.pdf' },
		{ value: 'second.pdf', label: 'Template Two', downloadLink: '/files/template2.pdf' },
		{ value: 'three.pdf', label: 'Template Three', downloadLink: '/files/template3.pdf' }
	]; // Store template options fetched from API

	const updateDownloadLink = () => {
		const selectedOption = templateOptions.find((option) => option.label === saveData.template);
		saveData.download = selectedOption ? selectedOption.downloadLink : '';
	};

	// Update the download link whenever the template value changes
	$: {
		updateDownloadLink();
	}

	const handleTemplateChange = (event) => {
		saveData.template = event.target.value;
		updateDownloadLink();
	};

	onMount(() => {
		flatpickr('#periode-rapat', {
			mode: 'range',
			allowInput: true,
			clickOpens: true,
			time_24hr: true,
			enableTime: true,
			dateFormat: 'Y-m-d H:i',
			theme: 'light'
		});
	});
</script>

<form>
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="col-span-full">
					<label for="perihal" class="block text-sm font-medium leading-6 text-gray-900">Perihal</label>
					<div class="mt-2">
						<input
							bind:value={saveData.perihal}
							placeholder="Perihal pemindahan jadwal rapat"
							type="text"
							name="perihal"
							id="perihal"
							class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="periode-rapat" class="block text-sm font-medium leading-6 text-gray-900">Periode Rapat</label>
					<div class="mt-2">
						<input
							id="periode-rapat"
							placeholder="Masukkan periode waktu"
							bind:value={saveData.periode}
							type="date"
							name="periode-rapat"
							class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="pilih-tempat" class="block text-sm font-medium leading-6 text-gray-900">Pilih Tempat</label>
					<div class="mt-2">
						<select
							id="pilih-tempat"
							name="pilih-tempat"
							class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						>
							<option>Ruang Lambelu</option>
							<option>Ruang IT</option>
							<option>Ruang Lanala</option>
						</select>
					</div>
				</div>

				<div class="col-span-full">
					<label for="pilih-template" class="block text-sm font-medium leading-6 text-gray-900">Pilih Template</label>
					<div class="mt-2">
						<select
							id="pilih-template"
							name="pilih-template"
							class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							bind:value={saveData.template}
							on:change={handleTemplateChange}
						>
							{#each templateOptions as option (option.value)}
								<option value={option.label}>{option.label}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="col-span-full">
					<label for="agenda" class="block text-sm font-medium leading-6 text-gray-900">Agenda</label>
					<div class="mt-2 agenda-input">
						<Tags bind:tags addKeys={[13]} removeKeys={[8]} placeholder={'Masukkan agenda'} />
					</div>
				</div>

				<div class="col-span-full">
					<label for="download" class="block text-sm font-medium leading-6 text-gray-900">Download</label>
					<div class="mt-2">
						{#if saveData.download}
							<a href={saveData.download} id="downloadLink" download={saveData.template}>{saveData.template}</a>
						{:else}
							<p>No template selected</p>
						{/if}
					</div>
				</div>

				<div class="col-span-full">
					<label for="upload-template" class="block text-sm font-medium leading-6 text-gray-900">Upload Template</label>
					<div class="mt-2">
						<input
							type="file"
							name="upload-template"
							bind:value={saveData.updateTemp}
							id="upload-template"
							class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>

<style>
	.agenda-input :global(.svelte-tags-input-layout) {
		border: 1px solid #e2e8f0 !important;
		border-radius: 6px;
		height: 40px !important;
	}

	.agenda-input :global(.svelte-tags-input-tag) {
		background: #0ea5e9 !important;
	}
</style>
