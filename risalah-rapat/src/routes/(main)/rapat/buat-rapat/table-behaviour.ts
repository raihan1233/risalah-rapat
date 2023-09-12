import { writable } from 'svelte/store';

// Define a writable store for your table data
export const tableData = writable<Checker[]>([
  {
    no: 1,
    user: 'User 1',
    jabatan: 'Manager',
    role: '',
  },
  {
    no: 2,
    user: 'User 2',
    jabatan: 'Manager',
    role: '',
  },
]);

// Function to add a new row to the table data
export function addNewRow() {
  // Retrieve the current data from the store
  const currentData = $tableData;

  // Add a new row with an auto-incremented ID
  const newRow: Checker = {
    no: currentData.length + 1,
    user: 'New User',
    jabatan: 'New Jabatan',
    role: 'New Role',
  };

  // Update the table data store with the new row
  tableData.update((data) => [...data, newRow]);
}

type Checker = {
  no: number;
  user: string;
  jabatan: string;
  role: string;
};
