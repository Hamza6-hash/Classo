<script>
  export let dataProps;
</script>

<form
  class="flex flex-col gap-2 font-semibold"
  action="?/answers"
  method="post"
>
  <br />
  <label for="studentName">
    Full Name:
    <input
      type="text"
      id="studentName"
      name="student_name"
      class="border-b border-black h-8 p-2 focus:outline-none focus:border-red-600 max-sm:w-44"
    />
  </label>
  <br />
  <label for="key">
    Secret key:
    <input
      type="text"
      id="key"
      name="key"
      class="border-b border-black h-8 p-2 focus:outline-none focus:border-red-600 max-sm:w-44"
    />
  </label>
  <div>
    <div class="flex flex-col gap-4 mt-4 font-medium">
      <center>
        <h1 class="text-lg font-bold">
          Choose the correct options each questions has one marks
        </h1>
      </center>
      {#each dataProps?.classroom?.mcqs as question, questionIndex}
        <!-- {@debug questionIndex} -->
        <input
          type="text"
          hidden
          name="question"
          value={question?.question}
          id={question?._id}
        />
        <label for={question?._id}>
          {question?.question}
        </label>

        <section class="flex gap-4 max-md:flex-col">
          {#each question?.shuffledOptions as option, optionIndex}
            <!-- {@debug optionIndex} -->
            <!-- class="appearance-none hover:cursor-pointer w-6 h-6 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" -->
            <div class="flex max-md:flex items-center gap-4">
              <input
                class="hover:cursor-pointer appearance-none w-6 h-6 border border-gray-300 rounded-full checked:bg-transparent checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="radio"
                id={`answer-${optionIndex.optionIndex}`}
                name={`answer-${questionIndex}`}
                value={option}
              />
              <label class="text-lg" for={`answer-${optionIndex.optionIndex}`}
                >{option}</label
              >
            </div>
          {/each}
        </section>
      {/each}
      <button
        formaction="?/answers"
        class="bg-red-400 h-10 rounded-lg mt-4 hover:bg-red-500">Submit</button
      >
    </div>
  </div>
</form>

<style>
  input[type="radio"]:checked::before {
    content: "";
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    background-color: blue;
    border-radius: 50%;
    padding: 50%;
  }
</style>
