<script>
  import { enhance } from "$app/forms";
  export let mcqsLength;
</script>

<form
  use:enhance
  action="?/uploadMcqs"
  method="post"
  class="flex w-full text-white flex-col gap-4 z-40"
>
  Uploaded Mcqs: {mcqsLength}
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
  </div>

  <button
    class="bg-purple-500 p-2 rounded-md hover:bg-purple-600"
    formaction="?/uploadMcqs"
    >Upload
  </button>
</form>
