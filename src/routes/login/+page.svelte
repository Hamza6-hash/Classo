<script>
  import { goto } from "$app/navigation";
  import "../../app.css";
  import Alert from "../../components/Alert.svelte";
  import Loading from "../../components/Loading.svelte";

  let email = "";
  let password = "";
  let userNotExistMsg = false;
  let loading = false;
  let className = "absolute right-1/3 bottom-44";

  async function loginUser() {
    try {
      loading = true;
      const res = await fetch("http://localhost:5173/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // loading = false;
        goto(`/classrooms/${data._id}`);
      }
      if (res.status === 404) {
        console.log("hit");
        userNotExistMsg = true;
      }
    } catch (error) {
      console.error(error);
    }
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div
  class="flex flex-col items-center justify-center h-screen w-full max-sm:min-w-min"
>
  <h1 class="text-4xl font-medium text-white">Login</h1>
  <form class="card flex flex-col mt-2 gap-4" action="?/login">
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
    <a href="/" class="text-purple-600 text-right"
      >Don't have an account? register here</a
    >
    <button
      on:click={loginUser}
      class="bg-blue-800 text-white p-2 rounded-md hover:bg-blue-900"
      >Login
      {#if loading}
        <Loading {className} />
      {/if}
    </button>
  </form>
</div>

{#if userNotExistMsg}
  <Alert bind:userNotExistMsg />
{/if}

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
