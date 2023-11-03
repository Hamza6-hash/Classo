<script>
  import AddStudentMarks from "../../../components/AddStudentMarks.svelte";

  export let data;
  let showForm = false;
</script>

<svelte:head>
  <title>Students Result</title>
</svelte:head>

<!-- Table to diaplay students test record -->
<center class={`mt-6 ${showForm ? "blur-sm" : ""}`}>
  <h1 class="text-3xl font-semibold">Students result</h1>
  <hr class="w-48" />
  <hr class="w-48" />
  <div class="container mx-auto p-8">
    <table class="min-w-full border bg-white">
      <thead>
        <tr class="bg-gray-200">
          <th
            class="px-6 py-4 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider"
            >Name</th
          >
          <th
            class="px-6 py-4 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider"
            >Enrollment Number</th
          >
          <th
            class="px-6 py-4 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider"
            >Obtained Marks</th
          >
          <th
            class="px-6 py-4 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider"
            >Total Marks</th
          >
          <th
            class="px-6 py-4 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider"
            >Actions</th
          >
        </tr>
      </thead>
      <tbody>
        {#each data.studentsResult.students as result}
          <tr class="hover:bg-gray-100">
            <td
              class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
              >{result.student_name}</td
            >
            <td
              class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
              >{result.enroll_no}</td
            >
            <td
              class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
              >{result.obtained_marks}</td
            >
            <td
              class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
              >{result.totalMarks}</td
            >
            <td
              class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
            >
              <button class="text-blue-600 hover:text-blue-800">Edit</button>
              <button class="text-red-600 hover:text-red-800">Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</center>

<!-- Pen icon for adding student marks -->
<svg
  width="32"
  height="32"
  class="hover:cursor-pointer fixed bottom-8 right-10 z-50"
  on:keydown={() => {
    showForm = true;
  }}
  role="button"
  tabindex="0"
  on:click={() => (showForm = true)}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  /><g id="SVGRepo_iconCarrier">
    <path
      d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z"
      stroke="#fdf2f2"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g></svg
>

<!-- Form for adding students test record -->
{#if showForm}
  <AddStudentMarks bind:showForm />
{/if}
