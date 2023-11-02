<script>
  let email = "";
  let password = "";
  import { goto } from "$app/navigation";
  import "../../app.css";

  let userNotExistMsg = false;

  async function loginUser() {
    try {
      const res = await fetch("http://localhost:5173/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) goto(`/classrooms/${data._id}`);
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
      >Login</button
    >
  </form>
</div>

{#if userNotExistMsg}
  <div
    class="fixed top-2 flex gap-2 items-center rounded-lg left-1/2 transform -translate-x-1/2 p-2 bg-red-800 text-white"
  >
    User not exists
    <svg
      role="button"
      on:keydown={(event) => {
        if (event.key === "Enter" || event.key === "") {
          console.log("Key event");
        }
      }}
      on:click={() => {
        if (userNotExistMsg === true) {
          userNotExistMsg = false;
        }
      }}
      tabindex="0"
      class="hover:cursor-pointer"
      style="fill:#d3d7de;"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 384 512"
      ><path
        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
      /></svg
    >
  </div>
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
