<script>
	import { onMount } from 'svelte';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/light.css';
	import Tags from 'svelte-tags-input';

	let tags = [];

	// let saveData = {
	// 	perihal: '',
	// 	periode: '',
	// 	tempat: '',
	// 	template: '',
	// 	download: '',
	// 	updateTemp: ''
	// };

	// let templateOptions = [
	// 	{ value: 'first.pdf', label: 'Template One', downloadLink: '/files/template1.pdf' },
	// 	{ value: 'second.pdf', label: 'Template Two', downloadLink: '/files/template2.pdf' },
	// 	{ value: 'three.pdf', label: 'Template Three', downloadLink: '/files/template3.pdf' }
	// ]; // Store template options fetched from API

	// const updateDownloadLink = () => {
	// 	const selectedOption = templateOptions.find((option) => option.label === saveData.template);
	// 	saveData.download = selectedOption ? selectedOption.downloadLink : '';
	// };

	// // Update the download link whenever the template value changes
	// $: {
	// 	updateDownloadLink();
	// }

	// const handleTemplateChange = (event) => {
	// 	saveData.template = event.target.value;
	// 	updateDownloadLink();
	// };

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
		<!-- <div class="border-b border-gray-900/10 pb-12"> -->
			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="col-span-full">
					<label for="periode-waktu" class="block text-sm font-medium leading-6 text-gray-900">Periode Waktu</label>
					<div class="mt-2">
						<input
							placeholder="Masukkan tanggal"
							type="date"
							name="periode-waktu"
							id="periode-waktu"
							class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="status" class="block text-sm font-medium leading-6 text-gray-900">Status</label>
					<div class="mt-2">
						<select
							id="status"
							name="status"
							class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						>
							<option>Belum Approve</option>
							<option>Terkirim</option>
							<option>Publish</option>
						</select>
					</div>
				</div>

				<div class="col-span-full">
					<label for="tipe" class="block text-sm font-medium leading-6 text-gray-900">Tipe</label>
					<div class="mt-2">
						<select
							id="tipe"
							name="tipe"
							class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						>
							<option>Checker</option>
							<option>Approver</option>
							<option>Tembusan</option>
						</select>
					</div>
				</div>

				<div class="col-span-full">
					<label for="perihal" class="block text-sm font-medium leading-6 text-gray-900">Perihal</label>
					<div class="mt-2">
						<input
							placeholder="Masukkan perihal"
							type="text"
							name="perihal"
							id="perihal"
							class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="tempat" class="block text-sm font-medium leading-6 text-gray-900">Tempat</label>
					<div class="mt-2">
						<input
							placeholder="Masukkan tempat"
							type="text"
							name="tempat"
							id="tempat"
							class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="agenda" class="block text-sm font-medium leading-6 text-gray-900">Agenda</label>
					<div class="mt-2 agenda-input">
						<Tags bind:tags addKeys={[13]} removeKeys={[8]} placeholder={'Masukkan agenda'} />
					</div>
				</div>
			</div>
			<div class="mt-6">
				<button type="submit" class="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cari</button>
			</div>
		<!-- </div> -->
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