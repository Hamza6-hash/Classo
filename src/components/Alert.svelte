<!-- Alert messages for unexpected behaviour -->
<script>
  export let alert;

  export let alertRollExist, alertforKey, alertForMissingField;
</script>

<!-- Alert for room creation form  -->
{#if alert}
  <div
    class="fixed bottom-2 flex gap-2 items-center rounded-lg left-1/2 transform -translate-x-1/2 p-2 bg-red-800 text-white"
  >
    Fill both fields
    <svg
      class="hover:cursor-pointer"
      tabindex="0"
      role="button"
      on:click={() => {
        if (alert === true) {
          alert = false;
        }
      }}
      on:keydown={(event) => {
        // if (event.key === "Enter" || event.key === "") {
        alert = false;
        // }
      }}
      style="fill:#d3d7de;"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 384 512"
      ><path
        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
      /></svg
    >
  </div>
{/if}

<!-- Alerts for submiting test form  -->
{#if alertRollExist || alertforKey || alertForMissingField}
  <div
    class="fixed bottom-2 flex gap-2 items-center rounded-lg left-1/2 transform -translate-x-1/2 p-2 bg-red-800 text-white"
  >
    {alertRollExist
      ? "Roll number already exists"
      : alertForMissingField
      ? "Please fill up all fields"
      : "Invalid secret key provided"}
    <svg
      role="button"
      on:keydown={(event) => {
        if (event.key === "Enter" || event.key === "") {
          console.log("Key event");
        }
      }}
      on:click={() => {
        if (alertRollExist === true) {
          alertRollExist = false;
        } else if (alertforKey === true) {
          alertforKey = false;
        } else {
          alertForMissingField = false;
        }
      }}
      tabindex="0"
      class="hover:cursor-pointer"
      style="fill:#d3d7de;"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 384 512"
      ><path
        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
      /></svg
    >
  </div>
{/if}
