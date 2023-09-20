<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Separator } from "$lib/components/ui/separator";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import Swal from 'sweetalert2';
  import { Pencil } from "lucide-svelte";
  import { Eye, EyeOff } from "lucide-svelte";

  export let user; // Receive the user data from data-table.page
  export let updateData; // Receive the updateData function from data-table.page

  // const saveData = () => {
  //   user.nama_lengkap = "New Name"; // Update with the new name
  //   user.status = "Aktif";

  //   updateData(user);
  //   console.log("update user data: ", user);
    
	// 	Swal.fire({
	// 		icon: 'success',
	// 		title: 'Data berhasil disimpan',
	// 		showConfirmButton: false,
	// 		timer: 1500
	// 	});
	// };

  let showPassword = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  let showConfirmPassword = false;

  function toggleConfirmPasswordVisibility() {
    showConfirmPassword = !showConfirmPassword;
  }

    let editedUser = { ...user }; // Create a copy of the user data for editing

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    editedUser[id] = value;
  };

  // Function to update user data and show success message
  const saveData = async () => {
    try {
      // Make a PUT request to update the user data
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        // Update the user data in the parent component
        updateData(editedUser);

        Swal.fire({
          icon: 'success',
          title: 'Data berhasil disimpan',
          showConfirmButton: false,
          timer: 1500
        });

        closeDialog();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal menyimpan data',
          text: 'Terjadi kesalahan saat menyimpan data',
        });
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  let isDialogOpen = false;

  const openDialog = () => {
    isDialogOpen = true;
    fetchUserData(); // Fetch user data when the dialog is opened
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`);
      if (response.ok) {
        const userData = await response.json();
        editedUser = { ...userData }; // Populate form fields with fetched user data
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal mengambil data user',
          text: 'Terjadi kesalahan saat mengambil data user',
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Close the dialog when it's closed
  const closeDialog = () => {
    isDialogOpen = false;
  };



  // Initialize form inputs with user data when the component mounts
  onMount(() => {
    if (user) {
    editedUser = { ...user };
  }
  });

  // Reinitialize form inputs when the user prop changes
  afterUpdate(() => {
    if (user) {
    editedUser = { ...user };
  }
  });

</script>

<Dialog.Root bind:open={isDialogOpen}>
  <Dialog.Trigger class={buttonVariants({ variant: "default", className: "bg-sky-500 hover:bg-sky-700" })} on:click={openDialog}>
    <Pencil class="h-4 w-4" />
  </Dialog.Trigger>
  <Dialog.Content class="overflow-y-scroll max-h-screen sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Edit User</Dialog.Title>
    </Dialog.Header>
    <Separator />
    <div class="py-4 space-y-4">
      <div class="space-y-4">
        <Label for="nama-lengkap">Nama Lengkap</Label>
        <Input id="nama-lengkap" placeholder="Masukkan nama lengkap" bind:value={editedUser.fullname}  />
      </div>
      <div class="space-y-4">
        <Label for="username">Username</Label>
        <Input id="username" placeholder="Masukkan username" bind:value={editedUser.username} />
      </div>
      <div class="space-y-4">
        <Label for="jabatan">Jabatan</Label>
        <Input id="jabatan" placeholder="Masukkan jabatan" bind:value={editedUser.position} />
      </div>
            <div class="space-y-4">
        <Label for="password">Password</Label>
        <div class="relative w-full">
          <Input id="password" placeholder="Masukkan password" type={showPassword ? 'text' : 'password'} bind:value={editedUser.password} />
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
          <Input id="konfirmasi-password" placeholder="Masukkan ulang password" type={showConfirmPassword ? 'text' : 'password'} bind:value={editedUser.confirm_password}  />
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
        <RadioGroup.Root value="role" class="flex space-x-4">
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
        <RadioGroup.Root value="status" class="flex space-x-3.5">
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