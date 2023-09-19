<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Separator } from "$lib/components/ui/separator";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import Swal from 'sweetalert2';
  import { Eye, EyeOff } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  
  export let data;
  
  const dispatch = createEventDispatcher();

  // const saveData = () => {
  //   const newNo = data.length + 1;
  //   const newData = {
  //     no: newNo, // Generate a new number based on the current data length
  //     nama_lengkap: inputData.fullname, // Example value, replace with actual input data
  //     username: inputData.username,
  //     jabatan: inputData.jabatan,
  //     role: inputData.role,
  //     status: 'Aktif', // Example value, replace with actual input data
  //   };

  //   // Emit an event with the new data
  //   dispatch('dataSaved', newData);

	// 	Swal.fire({
	// 		icon: 'success',
	// 		title: 'Data berhasil ditambahkan',
	// 		showConfirmButton: false,
	// 		timer: 1500
	// 	}).then(() => {
  //     // Close the dialog after the Swal popup is closed
      
  //     console.log("closing dialog");
  //     Dialog.close();
  //   });;
	// };

  let inputData = {
    fullname: "",
    username: "",
    position: "",
    role: "",
    password: "",
    confirm_password: "",
    status: ""
  }

  let showPassword = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  let showConfirmPassword = false;

  function toggleConfirmPasswordVisibility() {
    showConfirmPassword = !showConfirmPassword;
  }

  // Add this function inside your <script> tag
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData), // Send the user data as JSON
    });

    if (response.ok) {
      const newData = await response.json(); // Assuming the API responds with the newly added user data
      dispatch('dataSaved', newData); // Emit an event with the new data

      Swal.fire({
        icon: 'success',
        title: 'Data berhasil ditambahkan',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Close the dialog after the Swal popup is closed
        console.log("closing dialog");
        Dialog.close();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Terjadi kesalahan saat menambahkan data',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Terjadi kesalahan saat menambahkan data',
    });
  }
}

// Update your saveData function to call fetchData
const saveData = () => {
  const newNo = data.length + 1;
  const newData = {
    no: newNo,
    nama_lengkap: inputData.fullname,
    username: inputData.username,
    password: inputData.password,
    confirm_password: inputData.password,
    jabatan: inputData.position,
    role: inputData.role,
    status: inputData.status,
  };

  // Call the fetchData function to send the data to the server
  fetchData();
};

</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    Tambah
  </Dialog.Trigger>
  <Dialog.Content class="overflow-y-scroll max-h-screen sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Tambah User</Dialog.Title>
    </Dialog.Header>
    <Separator />
    <div class="py-4 space-y-4">
      <div class="space-y-4">
        <Label for="nama-lengkap">Nama Lengkap</Label>
        <Input id="nama-lengkap" placeholder="Masukkan nama lengkap" bind:value={inputData.fullname} />
      </div>
      <div class="space-y-4">
        <Label for="username">Username</Label>
        <Input id="username" placeholder="Masukkan username" bind:value={inputData.username} />
      </div>
      <div class="space-y-4">
        <Label for="jabatan">Jabatan</Label>
        <Input id="jabatan" placeholder="Masukkan jabatan" bind:value={inputData.position} />
      </div>
      <div class="space-y-4">
        <Label for="password">Password</Label>
        <div class="relative w-full">
          <Input id="password" placeholder="Masukkan password" type={showPassword ? 'text' : 'password'} bind:value={inputData.password} />
          <div class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none" on:click={togglePasswordVisibility}>
							{#if showPassword}
								<!-- Eye icon open -->
									<Eye class="h-4 w-4 cursor-pointer" />
							{:else}
							<!-- Eye icon closed -->
									<EyeOff class="h-4 w-4 cursor-pointer" />
							{/if}
					</div>
        </div>
      </div>
      <div class="space-y-4 ">
        <Label for="konfirmasi-password">Konfirmasi Password</Label>
        <div class="relative w-full">
          <Input id="konfirmasi-password" placeholder="Masukkan ulang password" type={showConfirmPassword ? 'text' : 'password'} bind:value={inputData.confirm_password}  />
          <div class="absolute inset-y-0 right-0 flex items-center p-3 focus:outline-none" on:click={toggleConfirmPasswordVisibility}>
							{#if showConfirmPassword}
								<!-- Eye icon open -->
									<Eye class="h-4 w-4 cursor-pointer" />
							{:else}
							<!-- Eye icon closed -->
									<EyeOff class="h-4 w-4 cursor-pointer" />
							{/if}
					</div>
        </div>
      </div>
      <div class="space-y-4">
        <Label>Role</Label>
        <RadioGroup.Root class="flex space-x-4" bind:value={inputData.role} >
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="user" id="user" />
            <Label for="user">User</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="admin" id="admin" />
            <Label for="admin">Admin</Label>
          </div>
        </RadioGroup.Root>
      </div>
      <div class="space-y-4">
        <Label>Status</Label>
        <RadioGroup.Root class="flex space-x-3.5" bind:value={inputData.status} >
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="Aktif" id="aktif" />
            <Label for="aktif">Aktif</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroup.Item value="Tidak aktif" id="tidak-aktif" />
            <Label for="tidak-aktif">Tidak Aktif</Label>
          </div>
        </RadioGroup.Root>
      </div>
    </div>
    <Dialog.Footer>
      <Button type="submit" class="w-full" on:click={saveData}>Simpan</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>