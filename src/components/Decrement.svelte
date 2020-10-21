<script>
  import { count } from "./stores.js";

  function decrementCount() {
    count.update(n => n - 1);
  }
</script>

<button
  id="decrement"
  class="inline-block bg-blue-500 py-2 px-6 m-auto text-gray-100 uppercase
  text-lg rounded"
  on:click={decrementCount}>
  Previous Screen
</button>
