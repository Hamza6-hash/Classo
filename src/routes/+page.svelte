<script>
  let username = "";
  let email = "";
  let password = "";
  import { goto } from "$app/navigation";

  async function createAcc() {
    try {
      const res = await fetch("http://localhost:5173/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) goto(`/classrooms/${data._id}`);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div
  class="flex flex-col items-center justify-center h-screen w-full max-sm:min-w-min"
>
  <h1 class="text-3xl font-medium text-white">Create an account</h1>
  <form class="flex flex-col gap-4 w-96 mt-3 card">
    <input
      type="text"
      class="input border-b h-8 p-2 outline-none focus:border-green-600 border-red-600"
      placeholder="Name"
      bind:value={username}
    />
    <input
      type="text"
      class="input border-b h-8 p-2 outline-none focus:border-green-600 border-red-600"
      placeholder="Email"
      bind:value={email}
    />
    <input
      type="password"
      class="input border-b h-8 p-2 outline-none focus:border-green-600 border-red-600"
      placeholder="Password"
      bind:value={password}
    />
    <a href="/login" class="text-purple-600 text-right"
      >Already have an account? login here</a
    >
    <button
      on:click={createAcc}
      class="bg-blue-800 text-white p-2 rounded-md hover:bg-blue-900"
      >Register</button
    >
  </form>
</div>

<style>
  .card {
    width: 500px;
    padding: 20px;
    background-color: rgba(40, 40, 40, 0.8);
    /* background-color: #ffffff; */
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    /* transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; */
  }
  .input {
    background-color: rgba(40, 40, 40, 0.8);
  }
</style>
