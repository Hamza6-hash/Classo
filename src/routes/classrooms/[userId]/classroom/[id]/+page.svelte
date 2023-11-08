<script>
  import Alert from "../../../../../components/Alert.svelte";
  import TestForm from "./TestForm.svelte";

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

  // Shuffling the answers
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  data.classroom.mcqs.forEach((question) => {
    const options = [question?.correctAnswer, ...question?.wrongAnswers];
    shuffleArray(options);
    question.shuffledOptions = options;
  });
</script>

<svelte:head>
  <title>Classroom {data?.classroom?.classroom_name}</title>
</svelte:head>

{#if !data.classroom?.testTo}
  <h1>No Test</h1>
{:else if remainingTime <= 0 || !data.classroom.isActive}
  <h1 class="text-lg font-medium">Time up your page has been disabled</h1>
{:else if data.classroom.isActive}
  <!-- {:else if data.classroom.} -->
  <div class="p-10 text-black text-xl">
    <div class="testCard flex flex-col gap-4">
      <h1 class="text-2xl font-bold">
        Class {data?.classroom?.classroom_name}
      </h1>
      <h1 class="text-2xl font-bold">
        Remaining Time {Math.floor(remainingTime / 60)}:{remainingTime % 60}
      </h1>
      <h1>
        {form?.marks
          ? `You have got ${form?.marks} out of ${data?.classroom?.mcqs?.length} marks`
          : ""}
      </h1>
      <TestForm dataProps={data} />
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
</style>
