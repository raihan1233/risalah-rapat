<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import {
		PlusCircle,
		ArrowUpCircle,
		ArrowDownCircle,
		Trash2,
		Save,
		FileOutput,
		Send,
		Download
	} from 'lucide-svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	// import Tabs from './tabs.svelte';
	import { onMount } from 'svelte';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/light.css';
	import Tags from 'svelte-tags-input';
	import Swal from 'sweetalert2';
	// import BatalButton from './batal-button.svelte';
	import KonfirmasiBatal from './konfirmasi-batal.svelte';
	import KonfirmasiRevisi from './konfirmasi-revisi.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { PageData } from './$types';
	import { BASE_URL_EXPRESS } from '../../../../../utils/network-data';

	export let data: PageData;
	$: ({ meetingDetail } = data);

	console.log(data);

	const sendData = () => {
		Swal.fire({
			icon: 'success',
			title: 'Data berhasil dikirim',
			showConfirmButton: false,
			timer: 1500
		});
	};

	const saveDraft = () => {
		saveFormRisalah();
		saveCheckerOrder();
		console.log(localRelasiData);
	};

	const saveFormRisalah = async () => {
		try {
			const formData = {
				perihal: saveData.perihal,
				periode: saveData.periode,
				tempat: saveData.tempat,
				template: saveData.template,
				download: saveData.download,
				update_temp: saveData.update_temp,
				agenda: saveData.agenda
			};

			console.log(formData);

			const response = await fetch('http://localhost:3000/meeting', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				Swal.fire({
					icon: 'success',
					title: 'Draft berhasil disimpan',
					showConfirmButton: false,
					timer: 1500
				});
			}
		} catch (error) {
			console.error('An error occured: ', error);
		}
	};

	const saveCheckerOrder = () => {
		const listData = [];

		for (const row of filteredTableData) {
			const rowData = {
				nomor_urut: row.nomor_urut,
				user_internal: row.user_internal,
				user_eksternal: row.user_eksternal,
				jabatan: row.jabatan,
				role: row.role
				// Add other properties from row if needed
			};

			listData.push(rowData);
		}

		console.log(listData);
	};

	function openPDF() {
		let urlPDF = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
		window.open(urlPDF, '_blank');
	}

	// let tags = [];

	let saveData = {
		perihal: '',
		periode: '',
		tempat: '',
		template: '',
		download: '',
		update_temp: '',
		agenda: ''
	};

	let templateOptions = [
		{ value: 'first.pdf', label: 'Template One', downloadLink: '/files/template1.pdf' },
		{ value: 'second.pdf', label: 'Template Two', downloadLink: '/files/template2.pdf' },
		{ value: 'three.pdf', label: 'Template Three', downloadLink: '/files/template3.pdf' }
	]; // Store template options fetched from API

	let tempatOptions = [
		{ value: 'Ruang Lambelu', label: 'Ruang Lambelu' },
		{ value: 'Ruang IT', label: 'Ruang IT' },
		{ value: 'Ruang Kelaud', label: 'Ruang Kelaud' }
	]; // Store tempat options fetched from API

	const updateDownloadLink = () => {
		const selectedOption = templateOptions.find((option) => option.label === saveData.template);
		saveData.download = selectedOption ? selectedOption.downloadLink : '';
	};

	// Update the download link whenever the template value changes
	$: {
		updateDownloadLink();
	}

	const handleTempatChange = (event) => {
		saveData.tempat = event.target.value;
	};

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

	// data table
	const selectRoleOptions = ['Checker', 'Approver', 'Tembusan'];
	let tableData = [];

	const removeRow = (index) => {
		tableData.splice(index, 1);
		updateButtonVisibility();
	};

	const addRow = () => {
		const nextNo = tableData.length + 1;
		const newRow = {
			nomor_urut: nextNo,
			user_internal: '',
			user_eksternal: '',
			jabatan: '',
			role: 'New Role'
		};
		tableData = [...tableData, newRow];
		updateButtonVisibility();
	};

	const userData = [
		{
			nomor_urut: 1,
			user_internal: 'Mbak Rere',
			user_eksternal: '',
			jabatan: 'Sekretaris',
			role: 'Checker'
		},
		{
			user_internal: 'Mas Bagus',
			user_eksternal: '',
			jabatan: 'Manajer TI'
		},
		{
			user_internal: 'Mas Angga',
			user_eksternal: '',
			jabatan: 'Vice President TI'
		}
	];

	// Add the default values from the 'data' array to the first row
	const defaultValues = data[0];
	const firstRow = { No_Urut: 1, ...defaultValues };
	tableData.push(firstRow);

	const selectUserOptions = userData.map((user) => user.user_internal);

	const moveRowUp = (index) => {
		if (index > 1) {
			// Cek apakah baris saat ini memiliki nilai
			if (tableData[index].user_internal) {
				// Lakukan pemindahan baris ke atas
				const currentRow = tableData[index];
				const previousRow = tableData[index - 1];
				tableData[index] = previousRow;
				tableData[index - 1] = currentRow;

				// Update No Urut values based on the final order
				tableData.forEach((row, i) => {
					row.No_Urut = i + 1;
				});
			}
		}

		updateButtonVisibility();
	};

	const moveRowDown = (index) => {
		if (index < tableData.length - 1) {
			// Cek apakah baris saat ini memiliki nilai
			if (tableData[index].user_internal) {
				// Lakukan pemindahan baris ke bawah
				const currentRow = tableData[index];
				const nextRow = tableData[index + 1];
				tableData[index] = nextRow;
				tableData[index + 1] = currentRow;

				// Update No Urut values based on the final order
				tableData.forEach((row, i) => {
					row.No_Urut = i + 1;
				});
			}
		}

		updateButtonVisibility();
	};

	// user internal change
	const handleUserInternalChange = (event, rowIndex) => {
		const selectedValue = event.target.value;
		const jabatan = data.find((user) => user.user_internal === selectedValue)?.jabatan || '';
		tableData[rowIndex].jabatan = jabatan;
	};

	const getAksiOptions = (index) => {
		if (index === 0) {
			return [''];
		} else if (index === tableData.length - 1) {
			return ['Delete', 'Up'];
		} else if (index === 1) {
			return ['Delete', 'Down'];
		} else {
			return ['Delete', 'Up', 'Down'];
		}
	};

	const updateButtonVisibility = () => {
		tableData = tableData.map((row, index) => ({
			...row,
			Aksi: getAksiOptions(index)
		}));
	};
	updateButtonVisibility();

	let searchTerm = '';
	let filteredTableData = [];

	// Function to filter the table data based on search term
	$: filteredTableData = tableData.filter((row) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return Object.values(row).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});

	// dokumen relasi

	// relasi data table

	let relasiData = [];
	let localRelasiData = relasiData;

	$: {
		localRelasiData = relasiData;
	}

	let searchRelasi = '';
	$: filteredRelasi = relasiData.filter((item) => {
		const lowerSearchTerm = searchRelasi.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});

	// add relasi dokumen
	let isDialogOpen = false;

	let inputRelasiData = {
		file: null,
		name: ''
	};

	// // Update your saveData function to call fetchData
	// const saveRelasiData = () => {
	// 	if (inputRelasiData.file && inputRelasiData.name) {
	// 		fetchRelasiData();

	// 		// console.log(inputRelasiData.file);
	// 		// console.log(inputRelasiData.name);
	// 	}
	// };

	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			inputRelasiData.file = file;
		}
	};

	// catatan revisi
	const revisiData = [
		{
			nama: 'John Doe',
			jabatan: 'Manager',
			konten: 'Revisi agenda untuk team building',
			waktu_revisi: '2023-09-10 09:00 AM'
		},
		{
			nama: 'Alice Smith',
			jabatan: 'Manager',
			konten: 'Revisi diskusi strategi marketing',
			waktu_revisi: '2023-09-07 14:30 PM'
		},
		{
			nama: 'Bob Johnson',
			jabatan: 'Manager',
			konten: 'Revisi laporan finansial',
			waktu_revisi: '2023-09-03 10:30 AM'
		},
		{
			nama: 'Sarah Brown',
			jabatan: 'Manager',
			konten: 'Revisi agenda untuk peluncuran produk',
			waktu_revisi: '2023-09-01 11:45 AM'
		}
	];

	let searchRevisi = '';
	$: filteredItems = revisiData.filter((item) => {
		const lowerSearchTerm = searchRevisi.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});

	// const trackers = meetingDetail[0].risalah.trackers;
	// const relation_documents = meetingDetail[0].risalah.relation_documents;
	// const revision_notes = meetingDetail[0].risalah.revision_notes;
</script>

<div class="py-10 space-y-8">
	<Card.Root>
		<Card.Header>
			<h2 class="text-3xl font-bold tracking-tight">Detail Risalah</h2>
		</Card.Header>
		<!-- form rapat starts -->
		<Card.Content>
			<form>
				<div class="space-y-12">
					<div class="border-b border-gray-900/10 pb-12">
						<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div class="col-span-full">
								<label for="perihal" class="block text-sm font-medium leading-6 text-gray-900"
									>Perihal</label
								>
								<div class="mt-2">
									<input
										value={meetingDetail[0].risalah.header.perihal}
										placeholder="Perihal pemindahan jadwal rapat"
										type="text"
										name="perihal"
										id="perihal"
										class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div class="col-span-full">
								<label for="periode-rapat" class="block text-sm font-medium leading-6 text-gray-900"
									>Periode Rapat</label
								>
								<div class="mt-2">
									<input
										id="periode-rapat"
										placeholder="Masukkan periode waktu"
										value={meetingDetail[0].risalah.header.periode}
										type="date"
										name="periode-rapat"
										class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div class="col-span-full">
								<label for="pilih-tempat" class="block text-sm font-medium leading-6 text-gray-900"
									>Pilih Tempat</label
								>
								<div class="mt-2">
									<select
										id="pilih-tempat"
										name="pilih-tempat"
										on:change={handleTempatChange}
										class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									>
										<option selected disabled>pilih tempat</option>
										{#each tempatOptions as option (option.value)}
											<option value={option.label}>{option.label}</option>
										{/each}
									</select>
								</div>
							</div>

							<div class="col-span-full">
								<label
									for="pilih-template"
									class="block text-sm font-medium leading-6 text-gray-900">Pilih Template</label
								>
								<div class="mt-2">
									<select
										id="pilih-template"
										name="pilih-template"
										class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										bind:value={saveData.template}
										on:change={handleTemplateChange}
										placeholder="pilih template"
									>
										<option selected disabled>pilih template</option>
										{#each templateOptions as option (option.value)}
											<option value={option.label}>{option.label}</option>
										{/each}
									</select>
								</div>
							</div>

							<div class="col-span-full">
								<label for="agenda" class="block text-sm font-medium leading-6 text-gray-900"
									>Agenda</label
								>
								<div class="mt-2 agenda-input">
									<Tags
										addKeys={[13]}
										removeKeys={[8]}
										placeholder={'Masukkan agenda'}
										bind:tags={saveData.agenda}
									/>
								</div>
							</div>

							<div class="col-span-full">
								<label for="download" class="block text-sm font-medium leading-6 text-gray-900"
									>Download</label
								>
								<div class="mt-2">
									{#if saveData.download}
										<a href={saveData.download} id="downloadLink" download={saveData.template}
											>{saveData.template}</a
										>
									{:else}
										<p>No template selected</p>
									{/if}
								</div>
							</div>

							<div class="col-span-full">
								<label
									for="upload-template"
									class="block text-sm font-medium leading-6 text-gray-900">Upload Template</label
								>
								<div class="mt-2">
									<input
										type="file"
										name="upload-template"
										bind:value={saveData.update_temp}
										id="upload-template"
										class="block w-full rounded-md px-3 py-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</Card.Content>
		<!-- form rapat ends -->
	</Card.Root>

	<Card.Root>
		<!-- tabs starts -->
		<div class="space-y-4 pt-4">
			<Card.Content>
				<Tabs.Root value="Checker">
					<Tabs.List class="grid w-full grid-cols-3 bg-cyan-500 text-white">
						<Tabs.Trigger value="Checker">Checker</Tabs.Trigger>
						<Tabs.Trigger value="Dokumen Relasi">Dokumen Relasi</Tabs.Trigger>
						<Tabs.Trigger value="Catatan Revisi">Catatan Revisi</Tabs.Trigger>
					</Tabs.List>

					<!-- tabs checker starts -->
					<Tabs.Content value="Checker">
						<Card.Root>
							<Card.Header>
								<Card.Title>Checker</Card.Title>
							</Card.Header>
							<Card.Content class="space-y-2">
								<div class="space-y-4">
									<Button
										class="bg-sky-500 hover:bg-sky-700 text-white"
										on:click={addRow}
										variant="default"
									>
										<PlusCircle class="w-5 h-5 mr-2" />
										Tambah
									</Button>

									<div class="sm:flex sm:justify-end">
										<TableSearch
											placeholder="Cari di sini"
											hoverable={true}
											bind:inputValue={searchTerm}
											classInput="mb-4 px-8 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs"
											classSvgDiv="p-2"
											divClass="shadow-none relative"
										/>
									</div>

									<Table shadow>
										<TableHead class="text-sm">
											<!-- <tr> -->
											<TableHeadCell class="!p-4">No Urut</TableHeadCell>
											<TableHeadCell class="!p-4">User Internal</TableHeadCell>
											<TableHeadCell class="!p-4">User Eksternal</TableHeadCell>
											<TableHeadCell class="!p-4">Nama Jabatan</TableHeadCell>
											<TableHeadCell class="!p-4">Role</TableHeadCell>
											<TableHeadCell class="!p-4">Aksi</TableHeadCell>
											<!-- </tr> -->
										</TableHead>
										<TableBody>
											{#each filteredTableData as row, index (row.nomor_urut)}
												<TableBodyRow>
													<TableBodyCell class="!p-4">{row.nomor_urut}</TableBodyCell>
													<TableBodyCell class="!p-4">
														<select
															class="p-1.5 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 m-1.5"
															bind:value={row.user_internal}
															on:change={() => handleUserInternalChange(event, index)}
														>
															{#each selectUserOptions as option}
																<option value={option}>{option}</option>
															{/each}
														</select>
													</TableBodyCell>
													<TableBodyCell class="!p-4">
														<input
															type="text"
															bind:value={row.user_eksternal}
															class="p-1.5 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 m-1.5"
														/>
													</TableBodyCell>
													<TableBodyCell class="!p-4">
														<input
															type="text"
															class="p-1.5 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 m-1.5"
															bind:value={row.jabatan}
														/>
													</TableBodyCell>
													<TableBodyCell class="!p-4">
														<select
															class="p-1.5 text-gray-900 border-0 rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-3 m-1"
															bind:value={row.role}
														>
															{#each selectRoleOptions as option}
																<option value={option}>{option}</option>
															{/each}
														</select>
													</TableBodyCell>
													<TableBodyCell class="!p-4 space-x-2">
														{#each row.Aksi as aksiOption}
															{#if aksiOption === 'Delete'}
																<Button
																	class="bg-red-500 hover:bg-red-700 text-white"
																	variant="default"
																	on:click={() => removeRow(index)}
																>
																	<Trash2 class="w-4 h-4 mr-2" />
																	Delete
																</Button>
															{/if}
															{#if aksiOption === 'Up'}
																<Button
																	class="bg-emerald-500 hover:bg-emerald-700 text-white"
																	variant="default"
																	on:click={() => moveRowUp(index)}
																>
																	<ArrowUpCircle class="w-4 h-4 mr-2" />
																	Up
																</Button>
															{/if}
															{#if aksiOption === 'Down'}
																<Button
																	class="bg-sky-500 hover:bg-sky-700 text-white"
																	variant="default"
																	on:click={() => moveRowDown(index)}
																>
																	<ArrowDownCircle class="w-4 h-4 mr-2" />
																	Down
																</Button>
															{/if}
														{/each}
													</TableBodyCell>
												</TableBodyRow>
											{/each}
										</TableBody>
									</Table>
								</div>
							</Card.Content>
						</Card.Root>
					</Tabs.Content>
					<!-- tabs checker ends -->

					<!-- tabs doc relasi starts -->
					<Tabs.Content value="Dokumen Relasi">
						<Card.Root>
							<Card.Header>
								<Card.Title>Dokumen Relasi</Card.Title>
							</Card.Header>
							<Card.Content class="space-y-2">
								<div class="space-y-4">
									<Dialog.Root bind:open={isDialogOpen}>
										<Dialog.Trigger
											class={buttonVariants({
												variant: 'default',
												className: 'bg-sky-500 hover:bg-sky-700 text-white'
											})}
										>
											<PlusCircle class="w-5 h-5 mr-2" />
											Tambah
										</Dialog.Trigger>
										<Dialog.Content class="sm:max-w-[425px]">
											<Dialog.Header>
												<Dialog.Title>Tambah Dokumen Relasi</Dialog.Title>
											</Dialog.Header>
											<Separator />
											<div class="py-4 space-y-4">
												<div class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
													<Label for="unggah-lampiran">Unggah Lampiran</Label>
													<Input
														id="unggah-lampiran"
														type="file"
														class="cursor-pointer"
														name="attachment"
														on:change={handleFileInputChange}
													/>
												</div>
												<div class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
													<Label for="nama-lampiran">Nama Lampiran</Label>
													<Input
														id="nama-lampiran"
														placeholder="masukkan nama lampiran"
														bind:value={inputRelasiData.name}
													/>
												</div>
											</div>
											<Dialog.Footer>
												<Button type="submit" class="w-full">Simpan</Button>
											</Dialog.Footer>
										</Dialog.Content>
									</Dialog.Root>

									<div class="sm:flex sm:justify-end">
										<TableSearch
											placeholder="Cari di sini"
											hoverable={true}
											bind:inputValue={searchRelasi}
											classInput="mb-4 px-8 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs"
											classSvgDiv="p-2"
											divClass="shadow-none relative"
										/>
									</div>

									<Table shadow>
										<TableHead class="text-sm">
											<!-- <tr> -->
											<TableHeadCell class="!p-4">Dokumen Relasi</TableHeadCell>
											<TableHeadCell class="!p-4">Aksi</TableHeadCell>
											<!-- </tr> -->
										</TableHead>
										<TableBody>
											{#each filteredRelasi as row, index}
												<TableBodyRow>
													<TableBodyCell class="!p-4">{row.name}</TableBodyCell>
													<TableBodyCell class="!p-4 space-x-2">
														<Button
															class="bg-red-500 hover:bg-red-700 text-white"
															variant="default"
														>
															<Trash2 class="w-4 h-4 mr-2" />
															Delete
														</Button>

														<a href={`http://localhost:3000/relation-documents/${row.id}`} download>
															<Button class="bg-sky-500 hover:bg-sky-700">
																<Download class="h-4 w-4 mr-2" />Download
															</Button>
														</a>
													</TableBodyCell>
												</TableBodyRow>
											{/each}
										</TableBody>
									</Table>
								</div>
							</Card.Content>
						</Card.Root>
					</Tabs.Content>
					<!-- tabs doc relasi ends -->

					<!-- tabs catatan revisi starts -->
					<Tabs.Content value="Catatan Revisi">
						<Card.Root>
							<Card.Header>
								<Card.Title>Catatan Revisi</Card.Title>
							</Card.Header>
							<Card.Content class="space-y-2">
								<div class="space-y-4">
									<!-- <Button class="bg-sky-500 hover:bg-sky-700 text-white" variant="default">
										<PlusCircle class="w-5 h-5 mr-2" />
										Tambah
									</Button> -->
									<div class="sm:flex sm:justify-end">
										<TableSearch
											placeholder="Cari di sini"
											hoverable={true}
											bind:inputValue={searchTerm}
											classInput="mb-4 px-8 py-2 rounded-md border border-gray-300 w-full sm:max-w-xs"
											classSvgDiv="p-2"
											divClass="shadow-none relative"
										/>
									</div>

									<Table shadow>
										<TableHead class="text-sm">
											<!-- <tr> -->
											<TableHeadCell class="!p-4">Nama Lengkap</TableHeadCell>
											<TableHeadCell class="!p-4">Jabatan</TableHeadCell>
											<TableHeadCell class="!p-4">Konten</TableHeadCell>
											<TableHeadCell class="!p-4">Waktu</TableHeadCell>
											<!-- </tr> -->
										</TableHead>
										<TableBody>
											{#each filteredItems as row, index}
												<TableBodyRow>
													<TableBodyCell class="!p-4">{row.nama}</TableBodyCell>
													<TableBodyCell class="!p-4">{row.jabatan}</TableBodyCell>
													<TableBodyCell class="!p-4">{row.konten}</TableBodyCell>
													<TableBodyCell class="!p-4">{row.waktu_revisi}</TableBodyCell>
												</TableBodyRow>
											{/each}
										</TableBody>
									</Table>
								</div>
							</Card.Content>
						</Card.Root>
					</Tabs.Content>
					<!-- tabs catatan revisi ends -->
				</Tabs.Root>
			</Card.Content>
		</div>
		<!-- tabs ends -->
	</Card.Root>

	<!-- button action starts -->
	<div class="sm:flex-row gap-4 flex flex-col">
		<Button class="bg-sky-500 hover:bg-sky-700" on:click={saveDraft}>
			<Save class="mr-2 h-4 w-4" />
			Simpan Draft
		</Button>
		<Button class="bg-cyan-500 hover:bg-cyan-700" on:click={openPDF}>
			<FileOutput class="mr-2 h-4 w-4" />
			Lihat PDF
		</Button>
		<Button class="bg-emerald-500 hover:bg-emerald-700" on:click={sendData}>
			<Send class="mr-2 h-4 w-4" />
			Kirim
		</Button>
		<KonfirmasiRevisi />
		<KonfirmasiBatal />
	</div>
	<!-- button action ends -->
</div>

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
