<script>
  import { enhance } from "$app/forms";
</script>

<!-- <div class="flex flex-col"> -->
<form
  class="mt-10 flex flex-col w-72"
  action="?/totalTimeTest"
  method="post"
  use:enhance
>
  <label for="startTime">Date</label>
  <input
    id="startTime"
    class="border-b-2 text-white bg-gray-800 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
    type="date"
    name="startTime"
  />
  <label for="from">From</label>
  <input
    id="from"
    class="border-b-2 text-white bg-gray-800 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
    type="time"
    name="from"
  />
  <label for="to">To</label>
  <input
    id="to"
    class="border-b-2 text-white bg-gray-900 h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
    type="time"
    name="to"
  />
  <br />
  <button class="h-10 bg-red-500 w-32 rounded-md" formaction="?/totalTimeTest"
    >Submit</button
  >
</form>
<!-- </div> -->
