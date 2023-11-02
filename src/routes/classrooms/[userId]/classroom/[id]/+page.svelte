<script>
  // import { onMount, onDestroy } from "svelte";
  // import Cookies from "universal-cookie";
  import { enhance } from "$app/forms";
  import Alert from "../../../../../components/Alert.svelte";
  import StudentFillForm from "../../../../../components/StudentFillForm.svelte";

  export let data;
  export let form;

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

  // const limitTime = data.classroom?.testTo;
  // let remainingTime = limitTime;
  // console.log(limitTime);
  // const countdownInterval = setInterval(() => {
  //   if (remainingTime == 0) {
  //     remainingTime -= -1;
  //     console.log("Remainging Time: ", remainingTime);
  //   } else {
  //     clearInterval(countdownInterval);
  //     data.classroom.isActive = false;
  //   }
  // }, 1000);
  const newTestToDate = new Date(data.classroom?.testTo);
  let remainingTime = Math.floor(newTestToDate - new Date() / 1000);

  function updateRemainingTime() {
    remainingTime = Math.floor((newTestToDate - new Date()) / 1000);
  }

  const countdownInterval = setInterval(updateRemainingTime, 1000);
  // if (countdownInterval === 0) {
  //   data.classroom.isActive = false;
  // }

  // let disablePage = false;
  // let elapsedTime = 0;

  // const cookies = new Cookies();
  // const cookieName = "elapsedTime";

  // Check if there is a stored elapsed time cookie
  // const storedElapsedTime = cookies.get(cookieName);
  // if (storedElapsedTime) {
  //   elapsedTime = parseFloat(storedElapsedTime);
  // }

  // onMount(() => {
  //   const startTime = new Date().getTime() - elapsedTime * 1000;

  //   const timer = setInterval(() => {
  //     elapsedTime = (new Date().getTime() - startTime) / 1000;
  //     cookies.set(cookieName, elapsedTime.toString(), { maxAge: 10 }); // 5 seconds

  //     if (elapsedTime >= 10) {
  //       clearInterval(timer);
  //       disablePage = true;
  //     }
  //   }, 1000);
  // });

  // onDestroy(() => {
  //   cookies.remove(cookieName);
  // });

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

<StudentFillForm />

{#if new Date() == newTestToDate}
  <h1 class="text-lg font-medium">Time up your page has been disabled</h1>
{:else if data.classroom.isActive}
  <!-- {:else if data.classroom.} -->
  <div class="p-10 text-black text-xl">
    <div class="card flex flex-col gap-4">
      <h1 class="text-2xl font-bold">
        Class {data?.classroom?.classroom_name}
      </h1>
      <h1 class="text-2xl font-bold">
        <!-- {#if remainingTime > 0} -->
        Class {Math.floor(remainingTime / 60)}:{remainingTime % 60}
        <!-- {:else}
          Time's up!
        {/if} -->
      </h1>
      <!-- <h1 class="text-2xl font-bold">
        Class {Math.floor(remainingTime / 60)}:{remainingTime % 60}
      </h1> -->
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
  .card {
    width: 99%;
    padding: 20px;
    /* background-color: rgba(40, 40, 40, 0.8);
    color: #ffffff; */
    /* background-color: rgba(40, 40, 40, 0.8); */
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
    /* margin: 50%; */
    padding: 50%;
  }
</style>
