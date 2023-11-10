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
  <!-- placeholder="Write your question here?" -->
  <label for="qst">Write your question?</label>
  <textarea
    cols="30"
    rows="20"
    placeholder="Write your question here?"
    class="text-white border-2 bg-gray-800 h-32 max-sm:w-56 p-2 focus:outline-none border-red-600 focus:border-green-500 overflow-hidden"
    name="question"
    id="qst"
  />

  <!-- <textare
    type="text"
    class="border-b text-white bg-gray-800 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
    name="question"></textare
  > -->
  <div class="flex-col flex w-56">
    A.
    <input
      type="text"
      class="border-b-2 text-white bg-gray-800 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
      name="a"
    />
    B.
    <input
      type="text"
      name="b"
      class="border-b-2 text-white bg-gray-800 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
    />
    C.
    <input
      type="text"
      name="c"
      class="border-b-2 text-white bg-gray-800 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
    />
    Correct Value.
    <input
      type="text"
      class="border-b-2 bg-gray-800 h-8 p-2 focus:outline-none border-red-600"
      name="correctValue"
    />
  </div>

  <button
    class="bg-purple-500 p-2 rounded-md hover:bg-purple-600"
    formaction="?/uploadMcqs"
    >Upload
  </button>
</form>
