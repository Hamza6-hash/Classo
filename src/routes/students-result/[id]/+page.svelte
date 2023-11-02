<script>
  export let data;
</script>

<svelte:head>
  <title>Students Result</title>
</svelte:head>

{#if !data.studentsResult}
  <h1>No students result found</h1>
{:else}
  <center class="mt-6">
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
                >2</td
              >
              <td
                class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
              >
                <button class="text-blue-600 hover:text-blue-800">Edit</button>
                <button class="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          {/each}
          <!-- <tr class="hover:bg-gray-100">
            <td
              class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
              >Jane Smith</td
            >
            <td
              class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
              >jane.smith@example.com</td
            >
            <td
              class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
              >User</td
            >
            <td
              class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900"
            >
              <button class="text-blue-600 hover:text-blue-800">Edit</button>
              <button class="text-red-600 hover:text-red-800">Delete</button>
            </td>
          </tr> -->
          <!-- Add more rows as needed -->
        </tbody>
      </table>
    </div>
  </center>
{/if}
