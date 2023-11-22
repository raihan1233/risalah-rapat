<script>
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Separator } from "$lib/components/ui/separator";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import Swal from 'sweetalert2';
  import { Pencil } from "lucide-svelte";
  import { Eye, EyeOff } from "lucide-svelte";
  import { BASE_URL_PRESTD, getUserId, fetchWithToken } from '../../../../utils/network-data';
  import { createEventDispatcher } from 'svelte';

	let user = getUserId();
  let dispatch = createEventDispatcher();	

  export let id; 
	export let userData;

	let	name = userData.name;
  let	username = userData.username;
	let	status = userData.status;
  let password = userData.password;
  let confirmPassword = userData.confirmPassword;
  let jabatan = userData.jabatan;
  let role = userData.role;
  let tipe = userData.tipe;

  let showPassword = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  let showConfirmPassword = false;

  function toggleConfirmPasswordVisibility() {
    showConfirmPassword = !showConfirmPassword;
  }

  let isDialogOpen = false;

  const popupSuccess = () => {
		Swal.fire({
			icon: 'success',
			title: 'Data berhasil disimpan',
			showConfirmButton: false,
			timer: 1500
		}).then(() => {
          // Close the dialog by setting isDialogOpen to false
          isDialogOpen = false;
		});
	};

	const popupError = () => {
		Swal.fire({
			icon: 'error',
      title: 'Gagal menyimpan data',
      text: 'Terjadi kesalahan saat menyimpan data',
		});
		return;
	};

  const handleSubmit = () => {
		if (!password || !confirmPassword) {
			popupError();
		}
		if (password === confirmPassword) {
			popupSuccess();
		}
	};

  const saveData = async () => {
    try {
      const newData = {
			id: id,
			name: name, 
      username: username,
      jabatan: jabatan,
      password: password,
      role: role,
      tipe: tipe,
			status: status, 
  		modified_by: parseInt(user, 10)
		  };

      const response = await fetchWithToken(`${BASE_URL_PRESTD}/_QUERIES/users/patch_user?id=${id}&name=${name}&username=${username}&password=${password}&jabatan=${jabatan}&role=${role}&tipe=${tipe}&status=${status}&modified_by=${user}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const responseData = await response.text();
				console.log(responseData);

				dispatch('dataUpdated', JSON.stringify(newData));
				console.log(newData);

        handleSubmit();
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

</script>

<Dialog.Root bind:open={isDialogOpen}>
  <Dialog.Trigger class={buttonVariants({ variant: "default", className: "bg-sky-500 hover:bg-sky-700" })}>
    <Pencil class="h-4 w-4 mr-2" />Edit
  </Dialog.Trigger>
  <Dialog.Content class="overflow-y-scroll max-h-screen sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Edit User</Dialog.Title>
    </Dialog.Header>
    <Separator />
    <div class="py-4 space-y-4">
      <div class="space-y-4">
        <Label for="nama-lengkap">Nama Lengkap</Label>
        <Input id="nama-lengkap" placeholder="Masukkan nama lengkap" bind:value={name}  />
      </div>
      <div class="space-y-4">
        <Label for="username">Username</Label>
        <Input id="username" placeholder="Masukkan username" bind:value={username} />
      </div>
      <div class="space-y-4">
        <Label for="jabatan">Jabatan</Label>
        <Input id="jabatan" placeholder="Masukkan jabatan" bind:value={jabatan} />
      </div>
            <div class="space-y-4">
        <Label for="password">Password</Label>
        <div class="relative w-full">
          <Input id="password" placeholder="Masukkan password" type={showPassword ? 'text' : 'password'} bind:value={password} />
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
          <Input id="konfirmasi-password" placeholder="Masukkan ulang password" type={showConfirmPassword ? 'text' : 'password'} bind:value={confirmPassword}  />
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
        <RadioGroup.Root class="flex space-x-4" bind:value={role}>
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
				<Label>Tipe</Label>
				<RadioGroup.Root class="flex space-x-4" bind:value={tipe}>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="internal" id="internal" />
						<Label for="internal">Internal</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="eksternal" id="eksternal" />
						<Label for="eksternal">Eksternal</Label>
					</div>
				</RadioGroup.Root>
			</div>
      <div class="space-y-4">
        <Label>Status</Label>
        <RadioGroup.Root class="flex space-x-3.5" bind:value={status}>
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