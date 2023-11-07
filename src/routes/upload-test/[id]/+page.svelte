<script>
  export let data;

  import { enhance } from "$app/forms";
  import TestTimeForm from "./TestTimeForm.svelte";
  import UploadMcqsForm from "./UploadMcqsForm.svelte";
</script>

<svelte:head>
  <title>Upload test | {data.user.classroom_name}</title>
</svelte:head>

<div class="p-20">
  <h1 class="text-2xl font-medium">
    Upload Test for Classroom {data.user.classroom_name}
  </h1>

  <div class="flex flex-col items-center text-lg justify-center w-full">
    {#if !data.user.testStartDate}
      <TestTimeForm />
    {:else}
      <UploadMcqsForm mcqsLength={data.user.mcqs.length} />
      <form action="?/deletePrevMcqs" method="post" use:enhance>
        <button
          formaction="?/deletePrevMcqs"
          class="mt-10 bg-red-700 p-2 text-white rounded-md hover:bg-red-800"
          >Delete Previous Test</button
        >
      </form>
      <!-- <a href={`/classrooms/${data.id}`}>
        <button class="mt-10 bg-purple-500 p-2 rounded-md hover:bg-purple-600"
          >Go Back</button
        >
      </a> -->
    {/if}
  </div>
</div>

<footer class="grid place-content-center absolute right-16 bottom-4">
  <center class="card">
    <h1>Tips:</h1>
    <h1>Don't worry about your options it will be shuffled automatically!</h1>
    <h1>Upload only one question at a time</h1>
  </center>
</footer>

<style>
  .card {
    width: 100%;
    color: whitesmoke;
    padding: 20px;
    background-color: teal;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
</style>
