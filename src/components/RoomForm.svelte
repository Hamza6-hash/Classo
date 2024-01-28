<script>
  export let showForm;
</script>

<div class="flex justify-center items-center">
  <div
    class="flex card fixed top-32 flex-col items-center justify-center w-full"
  >
    <svg
      on:keydown={() => {
        showForm = false;
      }}
      role="button"
      tabindex="0"
      on:click={() => (showForm = false)}
      class="hover:cursor-pointer relative top-2 left-44 z-50 icon max-sm:left-32"
      viewBox="0 0 32 32"
      version="1.1"
      width="28"
      height="28"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
      fill="#100909"
      stroke="#100909"
      ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><g id="SVGRepo_iconCarrier">
        <title>cross-circle</title> <desc>Created with Sketch Beta.</desc>
        <defs />
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <!-- sketch:type="MSPage" -->
          <!-- sketch:type="MSLayerGroup" -->
          <g
            id="Icon-Set-Filled"
            transform="translate(-570.000000, -1089.000000)"
            fill="#faf5f5"
          >
            <path
              d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z"
              id="cross-circle"
            />
            <!-- sketch:type="MSShapeGroup" -->
          </g>
        </g>
      </g></svg
    >
    <form
      action="?/createRoom"
      method="post"
      class="flex flex-col w-96 gap-4 card z-40 max-sm:w-52"
    >
      <h1>Create a classroom</h1>
      <input
        type="text"
        class="border-b-2 bg-black h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
        placeholder="Add name without classroom keyword"
        name="classroomName"
      />
      <input
        type="text"
        class="border-b-2 bg-black h-8 p-2 focus:outline-none border-red-600 focus:border-green-500"
        placeholder="Secret Key"
        name="key"
      />

      <button
        class="bg-purple-500 p-2 rounded-md hover:bg-purple-600"
        formaction="?/createRoom"
        on:click={() => {
          setTimeout(() => {
            showForm = false;
          }, 100);
        }}
      >
        Create
      </button>
    </form>
  </div>
</div>

<style>
  .card {
    background-color: #b2a6b6;
    max-width: 400px;
    min-height: 185px;
    border-radius: 8px;
    padding: 0px 0px 4px 4px;
  }
  @media (max-width: 425px) {
    .card {
      max-width: 300px;
    }
  }
</style>
