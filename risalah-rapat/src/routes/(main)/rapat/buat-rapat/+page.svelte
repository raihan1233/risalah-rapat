<script>
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
	import BatalButton from './batal-button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import AddRelationDocument from './add-relation-document.svelte';

	const sendData = () => {
		Swal.fire({
			icon: 'success',
			title: 'Data berhasil dikirim',
			showConfirmButton: false,
			timer: 1500
		});
	};

	const saveDraft = async () => {
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

	function openPDF() {
		let urlPDF = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
		window.open(urlPDF, '_blank');
	}

	let tags = [];

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
			No_Urut: nextNo,
			Pilih_User: '',
			Nama_Jabatan: 'New Jabatan',
			Role: 'New Role'
		};
		tableData = [...tableData, newRow];
		updateButtonVisibility();
	};

	const data = [
		{
			No_Urut: 1,
			Pilih_User: 'Mbak Rere',
			Nama_Jabatan: 'Sekretaris',
			Role: 'Checker'
		},
		{
			Pilih_User: 'Mas Bagus',
			Nama_Jabatan: 'Manajer TI'
		},
		{
			Pilih_User: 'Mas Angga',
			Nama_Jabatan: 'Vice President TI'
		}
	];

	// Add the default values from the 'data' array to the first row
	const defaultValues = data[0];
	const firstRow = { No_Urut: 1, ...defaultValues };
	tableData.push(firstRow);

	const selectUserOptions = data.map((user) => user.Pilih_User);

	let userData = selectUserOptions[0]; // Default value

	const moveRowUp = (index) => {
		if (index === 1) {
			// Swap the current row with the previous row
			const currentRow = tableData[index];
			const previousRow = tableData[index - 1];
			tableData[index] = previousRow;
			tableData[index - 1] = currentRow;
		} else if (index >= 2) {
			// Swap the current row with the previous row
			const currentRow = tableData[index];
			const previousRow = tableData[index - 1];
			tableData[index] = previousRow;
			tableData[index - 1] = currentRow;
		}

		// Update the No Urut values based on the final order
		tableData.forEach((row, i) => {
			row.No_Urut = i + 1;
		});

		updateButtonVisibility();
	};

	const moveRowDown = (index) => {
		if (index < tableData.length - 1) {
			// Swap the current row with the next row
			const currentRow = tableData[index];
			const nextRow = tableData[index + 1];
			tableData[index] = nextRow;
			tableData[index + 1] = currentRow;

			// Update the No Urut values based on the final order
			tableData.forEach((row, i) => {
				row.No_Urut = i + 1;
			});

			updateButtonVisibility();
		}
	};

	const handleUserSelectionChange = (event, rowIndex) => {
		const selectedValue = event.target.value;
		const namaJabatan = data.find((user) => user.Pilih_User === selectedValue)?.Nama_Jabatan || '';
		tableData[rowIndex].Nama_Jabatan = namaJabatan;
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
	const saveDocumenRelasi = () => {
		Swal.fire({
			icon: 'success',
			title: 'Data berhasil ditambahkan',
			showConfirmButton: false,
			timer: 1500
		});
	};

	// relasi data table
	let relasiData = [];

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/relation-documents'); // Replace with your API endpoint
			if (response.ok) {
				relasiData = await response.json();
				console.log(relasiData);
			} else {
				console.error('Failed to fetch data from the API');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});

	const handleRelationDataSaved = (event) => {
		// Append the new data to the existing data array
		relasiData = [...relasiData, event.detail];
	};

	let searchRelasi = '';
	$: filteredRelasi = relasiData.filter((item) => {
		const lowerSearchTerm = searchRelasi.toLowerCase();
		return Object.values(item).some(
			(value) => typeof value === 'string' && value.toLowerCase().includes(lowerSearchTerm)
		);
	});

	async function deleteDocument(documentId) {
		try {
			const response = await fetch(`http://localhost:3000/relation-documents/${documentId}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				// Hapus data dari tampilan setelah berhasil dihapus dari server
				relasiData = relasiData.filter((item) => item.id !== documentId);
			} else {
				console.error('Gagal menghapus dokumen relasi');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<div class="py-10 space-y-8">
	<Card.Root>
		<Card.Header>
			<h2 class="text-3xl font-bold tracking-tight">Buat Risalah</h2>
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
								<label for="periode-rapat" class="block text-sm font-medium leading-6 text-gray-900"
									>Periode Rapat</label
								>
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
								<label for="pilih-tempat" class="block text-sm font-medium leading-6 text-gray-900"
									>Pilih Tempat</label
								>
								<div class="mt-2">
									<select
										id="pilih-tempat"
										name="pilih-tempat"
										bind:value={saveData.tempat}
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
					<Tabs.List class="grid w-full grid-cols-2 bg-cyan-500 text-white">
						<Tabs.Trigger value="Checker">Checker</Tabs.Trigger>
						<Tabs.Trigger value="Dokumen Relasi">Dokumen Relasi</Tabs.Trigger>
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
											<TableHeadCell class="!p-4">Pilih User</TableHeadCell>
											<TableHeadCell class="!p-4">Nama Jabatan</TableHeadCell>
											<TableHeadCell class="!p-4">Role</TableHeadCell>
											<TableHeadCell class="!p-4">Aksi</TableHeadCell>
											<!-- </tr> -->
										</TableHead>
										<TableBody class="divide-y">
											{#each filteredTableData as row, index (row.No_Urut)}
												<TableBodyRow>
													<TableBodyCell class="!p-4">{row.No_Urut}</TableBodyCell>
													<TableBodyCell class="!p-4">
														<select
															class="p-1.5 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 m-1.5"
															bind:value={row.Pilih_User}
															on:change={() => handleUserSelectionChange(event, index)}
														>
															{#each selectUserOptions as option}
																<option value={option}>{option}</option>
															{/each}
														</select>
													</TableBodyCell>
													<TableBodyCell class="!p-4">{row.Nama_Jabatan}</TableBodyCell>
													<TableBodyCell class="!p-4">
														<select
															class="p-1.5 text-gray-900 border-0 rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-3 m-1"
															bind:value={row.Role}
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
								<!-- <Dialog.Root>
									<Dialog.Trigger
										class={buttonVariants({
											variant: 'defalut',
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
												<Input id="unggah-lampiran" type="file" class="cursor-pointer" />
											</div>
											<div class="grid w-full max-w-sm items-center gap-x-1.5 space-y-4">
												<Label for="nama-lampiran">Nama Lampiran</Label>
												<Input id="nama-lampiran" placeholder="masukkan nama lampiran" />
											</div>
										</div>
										<Dialog.Footer>
											<Button type="submit" class="w-full" on:click={saveDocumenRelasi}
												>Simpan</Button
											>
										</Dialog.Footer>
									</Dialog.Content>
								</Dialog.Root> -->

								<div class="space-y-4">
									<AddRelationDocument on:dataSaved={handleRelationDataSaved} {data} />
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
										<TableBody class="divide-y">
											{#each filteredRelasi as row, index}
												<TableBodyRow>
													<TableBodyCell class="!p-4">{row.name}</TableBodyCell>
													<TableBodyCell class="!p-4 space-x-2">
														<Button
															class="bg-red-500 hover:bg-red-700 text-white"
															variant="default"
															on:click={() => deleteDocument(row.id)}
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
		<BatalButton />
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
