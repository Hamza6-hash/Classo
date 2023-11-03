<script>
  export let data;
  export let form;

  import { enhance } from "$app/forms";
  import Alert from "../../../components/Alert.svelte";
  import RoomForm from "../../../components/RoomForm.svelte";
  import { goto } from "$app/navigation";

  let showForm = false; // this will show the create room form
  let alert = false; // message alert for unexpected form behaviour

  console.log(alert);

  if (form?.missing) {
    // will trigger if there is no data provided to the form
    alert = true;
    console.log(alert);
  }

  // user logout function and removing session
  async function userLogout() {
    try {
      const res = await fetch("http://localhost:5173/api", {
        method: "DELETE",
      });
      if (res.status === 200) goto("/login");
    } catch (error) {
      console.error(error);
    }
  }
</script>

<svelte:head>
  {#if data.user}
    <title>Classo | Home {data.user.teacher_name.toUpperCase()}</title>
  {/if}
</svelte:head>

<!-- Navbar -->
<nav class={`flex justify-between p-8 ${showForm ? "blur-sm" : ""}`}>
  <button>Home</button>
  <div class="flex gap-4">
    <button
      class="hover:underline hover:text-orange-500"
      on:click={() => (showForm = true)}>Create Room</button
    >
    <button class="hover:underline hover:text-red-500" on:click={userLogout}
      >Logout</button
    >
  </div>
</nav>

<!-- UI -->
<div class="text-black">
  {#if data.user}
    <div class={`${showForm ? "blur-sm h-32" : ""}`}>
      <div class="px-10 py-4">
        {#each data.user.classroom as classroom (classroom._id)}
          <div class="classCard mt-10 inline-block mr-6">
            <a href={`/classrooms/${data.user._id}/classroom/${classroom._id}`}>
              <h1 class="text-2xl font-medium">
                Classroom {classroom.classroom_name} -
                {#if classroom.isActive}
                  Active
                {:else}
                  In Active
                {/if}
              </h1>
            </a>
            <hr />
            <hr />

            <!-- Delete room form -->
            <div class="flex justify-center items-center space-x-4 mt-4">
              <form
                class="py-2"
                action="?/deleteRoom"
                method="post"
                use:enhance
              >
                <input
                  type="text"
                  name="classroomId"
                  hidden
                  value={classroom._id}
                />

                <button
                  formaction="?/deleteRoom"
                  class="rounded-md bg-cyan-900 h-10 w-20 text-white hover:bg-red-700"
                >
                  Delete
                </button>
                <a
                  class="rounded-md bg-blue-900 px-2 py-2 text-white hover:bg-cyan-700"
                  href={`/upload-test/${classroom._id}`}
                >
                  Upload Test
                </a>
              </form>

              <!-- Share button -->
              <button
                class="rounded-md bg-cyan-600 h-10 w-20 text-white hover:bg-cyan-700"
                on:click={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Join classroom ${classroom.classroom_name}`,
                      url: `/classrooms/${data.user._id}/classroom/${classroom._id}`,
                    });
                  }
                }}
              >
                Share
              </button>

              <a
                class="rounded-md bg-purple-800 px-4 py-2 text-white hover:bg-purple-900"
                href={`/students-result/${classroom._id}`}
              >
                Result
              </a>

              <!-- Activating and deactivating the classroom -->
              <form action="?/activeClass" method="post" use:enhance>
                <input
                  type="text"
                  value={classroom._id}
                  hidden
                  name="classroomId"
                />
                <button
                  formaction="?/activeClass"
                  class={`rounded-md  ${
                    classroom.isActive
                      ? "w-18 h-10 px-1 bg-red-700 hover:bg-red-800"
                      : "w-18 h-10 px-3 bg-green-700 hover:bg-green-800"
                  } text-white `}
                >
                  {classroom.isActive ? "In Active" : "Active"}
                </button>
              </form>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Form for creating classroom -->
    {#if showForm}
      <RoomForm bind:showForm />
    {/if}
  {/if}

  <!-- will show if there is no classroom -->
  {#if data.user.classroom <= 0}
    <div class="text-center">
      <h1 class="text-3xl font-medium text-white">
        Looks like you don't have any Classroom create one! You can create
        maximum of 5 classes
      </h1>
      <button
        class="bg-pink-600 h-10 w-32 text-white mt-6"
        on:click={() => (showForm = true)}>Create Room</button
      >
    </div>
  {/if}
</div>

{#if alert}
  <Alert bind:alert />
{/if}

<style>
  .classCard {
    width: 500px;
    padding: 20px;
    background-color: rgba(40, 40, 40, 0.8);
    color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .classCard:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
</style>
