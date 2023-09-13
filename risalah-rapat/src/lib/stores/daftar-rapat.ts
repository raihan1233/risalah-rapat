import { writable } from 'svelte/store';

type DaftarRapat = {
	no: number;
	periode_waktu: string;
	notulen: string;
	perihal: string;
	tempat: string;
	tipe: string;
	status: 'Belum Approve' | 'Approve' | 'Terkirim';
};

export const data = writable<DaftarRapat[]>([
	{
		no: 1,
		periode_waktu: '2023-09-08 09:00 AM to 2023-09-08 10:30 AM',
		notulen: 'John Doe',
		perihal: 'Project Review',
		tempat: 'Conference Room A',
		tipe: 'Meeting',
		status: 'Approve'
	},
	{
		no: 2,
		periode_waktu: '2023-09-09 02:00 PM to 2023-09-09 03:30 PM',
		notulen: 'Jane Smith',
		perihal: 'Budget Presentation',
		tempat: 'Boardroom',
		tipe: 'Presentation',
		status: 'Approve'
	},
	{
		no: 3,
		periode_waktu: '2023-09-10 10:30 AM to 2023-09-10 12:00 PM',
		notulen: 'Mike Johnson',
		perihal: 'Team Building',
		tempat: 'Outdoor Park',
		tipe: 'Event',
		status: 'Belum Approve'
	},
	{
		no: 4,
		periode_waktu: '2023-09-11 03:00 PM to 2023-09-11 04:30 PM',
		notulen: 'Emily Davis',
		perihal: 'Training Session',
		tempat: 'Training Room B',
		tipe: 'Training',
		status: 'Belum Approve'
	},
	{
		no: 5,
		periode_waktu: '2023-09-12 11:00 AM to 2023-09-12 12:30 PM',
		notulen: 'David Wilson',
		perihal: 'Project Kickoff',
		tempat: 'Conference Room C',
		tipe: 'Meeting',
		status: 'Belum Approve'
	},
	{
		no: 6,
		periode_waktu: '2023-09-12 09:30 AM to 2023-09-12 11:00 AM',
		notulen: 'Sarah Brown',
		perihal: 'Product Demo',
		tempat: 'Demo Area',
		tipe: 'Presentation',
		status: 'Belum Approve'
	},
	{
		no: 7,
		periode_waktu: '2023-09-14 11:00 AM to 2023-09-14 11:30 PM',
		notulen: 'Michael Lee',
		perihal: 'Quarterly Review',
		tempat: 'Boardroom',
		tipe: 'Meeting',
		status: 'Belum Approve'
	},
	{
		no: 8,
		periode_waktu: '2023-09-15 02:30 AM to 2023-09-12 04:00 PM',
		notulen: 'Laura Miller',
		perihal: 'Training Workshop',
		tempat: 'Training Room A',
		tipe: 'Training',
		status: 'Belum Approve'
	},
	{
		no: 9,
		periode_waktu: '2023-09-16 01:00 AM to 2023-09-16 02:30 PM',
		notulen: 'Chris Anderson',
		perihal: 'Marketing Strategy',
		tempat: 'Conference Room D',
		tipe: 'Meeting',
		status: 'Belum Approve'
	}
]);
