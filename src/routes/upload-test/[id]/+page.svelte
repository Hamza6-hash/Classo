<script>
  export let data;

  import { enhance } from "$app/forms";
  import TestTimeForm from "../../../components/TestTimeForm.svelte";
  import UploadMcqsForm from "../../../components/UploadMcqsForm.svelte";
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
      <!-- <form
        use:enhance
        action="?/uploadMcqs"
        method="post"
        class="flex w-full text-white flex-col gap-4 z-40"
      >
        Uploaded Mcqs: {data.user.mcqs.length}
        <input
          type="text"
          placeholder="Write your question here?"
          class="border-b text-white bg-gray-800 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
          name="question"
        />
        <div>
          A.
          <input
            type="text"
            class="border-b text-white bg-gray-800 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
            name="a"
          />
          B.
          <input
            type="text"
            name="b"
            class="border-b text-white bg-gray-800 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
          />
          C.
          <input
            type="text"
            name="c"
            class="border-b text-white bg-gray-800 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
          />
          Correct Value.
          <input
            type="text"
            class="border-b bg-gray-800 h-8 p-2 w-36 focus:outline-none border-red-600"
            name="correctValue"
          />
          <input type="text" placeholder="" />
        </div>

        <button
          class="bg-purple-500 p-2 rounded-md hover:bg-purple-600"
          formaction="?/uploadMcqs">Upload</button
        >
      </form> -->
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
