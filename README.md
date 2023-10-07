kendala
	1. direct to detail-rapat masih undefined
	2. fungsi search di halaman daftar rapat masih blm bisa
	3. 	tabs checker -> done
 		button up & down masih blm berfungsi
	4. ketika memilih template, masih blm men-generate value download
	5. column file pada halaman master template masih blm berbentuk link
	6. halaman tambah user blm ada field konfirmasi password
	6. ketika memilih user pada tabs checker, masih blm otomatis generated jabatan
	7. tombol hapus pada tabs checker masih blm menghapus baris 
	8. tambah pada tabs chcker masih blm menambah baris 	
	9. pada button di halaman buat rapat & detail rapat masih blm menampilkan pop up
	10. blm ada icon eye untuk field password -> done

revisi
	bg -> sama portal -> done
	logo -> yg ada tagline -> done
	field tempat -> input teks + select2
	login -> username aja jgn email -> done
	buat rapat -> hapus toggle -> done
	nama ->  setelah user
	lihat output pdf -> jadi lihat pdf -> done
	icon toggle -> diganti icon-filter

	buat rapat -> buat risalah -> done
	daftar rapat -> daftar risalah -> done
	
	SLA -> waktu dokumen diterima sampai dikirim (durasi)
	status -> jika belum approve berwarna abu, jika sudah approve/ publish berwarna hijau dan ada waktu dan tgl serta jam (durasi dihitung dari waktu kerja user terkait buat menggunakan log), jika blm warna abu dan blm approve
		
	status ganti jadi 1.belum approve(abu") 2.approve(hijau) 3.terkirim (biru) -> ditambahkan timestamp untuk approve dan terkirim(tgl awal saat kirim tidak menghitung tgl revisi)
	
	pencarian daftar rapat -> waktu mulai & selesai diganti periode waktu -> layout dibagi 2 -> hanya sampai tgl
	pencarian daftar rapat -> tambahkan agenda
	
	buat risalah rapat -> tambahkan input multi row pengisian kolom agenda (dibawah tempat field)
	buat risalah rapat -> waktu mulai & selesai diganti periode waktu -> layout dibagi 2 -> sampai menit
	
	template  risalah rapat -> tambahkan kolum variabel agenda
	
	modul buat risalah -> tambahkan dokumen relasi (dibuat tabs)  -> done
	
	modul buat risalah & detail risalah -> detail tracker no 1 dibuat default nama user drafter -> jabatan otomatis -> tanpa aksi
	
	modul detail risalah -> detail tracker ditambahkan informasi waktu approve (berupa kolom baru)
	
	modul buat risalah & detail risalah -> saaat drafter mengirim risalah rapat, tracker yg memiliki role checker dan approver akan menerima detail daftar risalah tersebut dengan status blm approve, dengan catatan tracker setelah drafter dapat mengubah isi risalah tersebut(tombol simpan, lihat pdf, kirim, revisi, batal), selain tracker itu hanya dapat meilhat(hanya ada tombol kembali)
	
	jika terjadi revisi tracker/approver yang sudah kirim tetap bisa melihat detail notulen
	
	notifikasi dihitung hanya risalah rapat yang memerlukan aksi approve oleh tracker yang sedang login 
	
	catatan relasi sertakan badge untuk jumlah revisi
	
	notifikasi di daftar rapat, dan baris rapat yang perlu direvisi, serta di icon bell



home, daftar, detail -> bisa diakses oleh checker dan approver
home, risalah, master -> bisa diakses oleh drafter
daftar risalah -> bisa diakses oleh tembusan jika statusnya bernilai publish

