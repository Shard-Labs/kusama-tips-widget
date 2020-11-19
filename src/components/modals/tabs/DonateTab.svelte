<script>
  import { getContext } from "svelte";

  let context = getContext("global");
  let selected = context.multistep;
  let selectedAccount = context.selectedAccount;

  context.multistep.subscribe((n) => (selected = n));
</script>

<form>
  <div class="flex justify-between mt-2 leading-loose">
    <span class="text-xs text-medium">Amount</span>
    <span class="text-xs text-medium ml-auto">Available: 5KSM</span>
  </div>
  <input
    type="text"
    class="bg-white focus:bg-light border border-solid border-medium
    rounded block w-full p-2" />

  <span class="text-xs text-medium block leading-loose mb-2">
    Fee: 0.02KSM
  </span>

  <span class="text-xs text-medium block leading-loose">
    Message (Optional):
  </span>
  <input
    type="text"
    class="block bg-white focus:bg-light border border-solid border-medium
    rounded w-full p-2" />

  <button
    class="block bg-accent py-2 px-6 mx-auto mt-4 text-light text-sm rounded
    hover:bg-dark">
    Donate
  </button>
</form>
