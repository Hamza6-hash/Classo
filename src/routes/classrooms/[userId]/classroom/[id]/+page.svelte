<script>
  import Alert from "../../../../../components/Alert.svelte";

  export let data;
  export let form;

  // handle unexpected behaviour of submitted form
  let alertforKey = false;
  let alertRollExist = false;
  let alertForMissingField = false;

  if (form?.notMatch) {
    alertforKey = true;
  }
  if (form?.rollNoExist) {
    alertRollExist = true;
  }
  if (form?.missing) {
    alertForMissingField = true;
  }

  let newTestToDate = new Date(data.classroom?.testTo);
  let remainingTime = Math.floor(newTestToDate - new Date() / 1000);

  // upadte the remaining time for user display (UI)
  function updateRemainingTime() {
    remainingTime = Math.floor((newTestToDate - new Date()) / 1000);
  }

  // funtion to decrement the time
  const countdownInterval = setInterval(() => {
    updateRemainingTime();
    if (remainingTime <= 0) {
      clearInterval(countdownInterval); // Clear the countdownInterval
    }
  }, 1000);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Shuffling the answers
  data.classroom.mcqs.forEach((question) => {
    const options = [question?.correctAnswer, ...question?.wrongAnswers];
    shuffleArray(options);
    question.shuffledOptions = options;
  });
</script>

<svelte:head>
  <title>Classroom {data?.classroom?.classroom_name}</title>
</svelte:head>

{#if remainingTime <= 0 || !data.classroom.isActive}
  <h1 class="text-lg font-medium">Time up your page has been disabled</h1>
{:else if data.classroom.isActive}
  <!-- {:else if data.classroom.} -->
  <div class="p-10 text-black text-xl">
    <div class="testCard flex flex-col gap-4">
      <h1 class="text-2xl font-bold">
        Class {data?.classroom?.classroom_name}
      </h1>
      <h1 class="text-2xl font-bold">
        Class {Math.floor(remainingTime / 60)}:{remainingTime % 60}
      </h1>
      <h1>
        {form?.marks
          ? `You have got ${form?.marks} out of ${data?.classroom?.mcqs?.length} marks`
          : ""}
      </h1>

      <form
        class="flex flex-col gap-2 font-semibold"
        action="?/answers"
        method="post"
      >
        <label for="FirstName">
          Full Name:
          <input
            id="FirstName"
            type="text"
            name="student_name"
            class="border-b-3 border-black h-8 p-2 focus:outline-none"
          />
        </label>
        <br />
        <label for="Enrollment number">
          Enrollment number:
          <input
            type="text"
            id="Enrollment number"
            name="rollNo"
            class="border-b border-black h-8 p-2 focus:outline-none focus:border-red-600"
          />
        </label>
        <br />
        <label for="key">
          Secret key:
          <input
            type="text"
            id="key"
            name="key"
            class="border-b border-black h-8 p-2 focus:outline-none focus:border-red-600"
          />
        </label>
        <div>
          <div class="flex flex-col gap-4 mt-4 font-medium">
            <center>
              <h1 class="text-lg font-bold">
                Choose the correct options each questions carry equals marks
              </h1>
            </center>
            {#each data?.classroom?.mcqs as question, questionIndex}
              <input
                type="text"
                hidden
                name="question"
                value={question?.question}
              />
              <h1>
                {question?.question}
              </h1>

              <!-- <select class="border-b focus:border-none" name="answer"> -->
              <!-- <p value="Choose">Choose right answer</p> -->
              <section class="flex gap-10 max-sm:flex-col">
                {#each question?.shuffledOptions as option, optionIndex}
                  <!-- class="appearance-none hover:cursor-pointer w-6 h-6 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" -->
                  <input
                    class="appearance-none w-6 h-6 border border-gray-300 rounded-full checked:bg-transparent checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="radio"
                    id={`answer-${optionIndex}`}
                    name={`answer-${optionIndex}`}
                    value={option}
                  />
                  <label for={`answer-${optionIndex}`}>{option}</label>
                  <!-- <p >{option}</p> -->
                {/each}
              </section>

              <!-- </select> -->
            {/each}
            <button
              formaction="?/answers"
              class="bg-red-400 h-10 rounded-lg mt-4 hover:bg-red-500"
              >Submit</button
            >
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- Logic for alert messages -->
  {#if alertRollExist || alertforKey || alertForMissingField}
    <Alert bind:alertRollExist bind:alertforKey bind:alertForMissingField />
  {/if}
{/if}

<style>
  .testCard {
    width: 99%;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }

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
