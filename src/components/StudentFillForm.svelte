<script>
  import { enhance } from "$app/forms";
</script>

<form
  class="flex flex-col gap-2"
  action="?/studentDetails"
  method="post"
  use:enhance
>
  <label for="FirstName">
    Full Name:
    <input
      id="FirstName"
      type="text"
      name="student_name"
      class="border-b border-black h-8 p-2 focus:outline-none focus:border-red-600"
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
  <button
    formaction="?/studentDetails"
    class="bg-green-700 w-72 h-8 hover:bg-green-600">Submit</button
  >
</form>
