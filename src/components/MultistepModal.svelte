<script>
  import { count } from "./stores";
  import Increment from "./Increment.svelte";
  import Decrement from "./Decrement.svelte";

  let count_value;
  count.subscribe((value) => {
    count_value = value;
  });
</script>

{#if count_value == 0}
  <Increment />
{:else if count_value == 5}
  <Decrement />
{:else}
  <Increment />
  <Decrement />
{/if}
