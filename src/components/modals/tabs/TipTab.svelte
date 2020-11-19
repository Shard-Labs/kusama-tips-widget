<script>
  import { getContext, onMount } from "svelte";

  let context = getContext("global");
  let selectedAccount = context.selectedAccount;
  let provider = context.provider;

  let balance = 0;

  onMount(async () => {
    let account = await $provider.query.system.account(
      $selectedAccount.address
    );
    balance = account.data.free.toHuman();
  });
</script>

<form>
  <div class="flex justify-between mt-2 leading-loose">
    <span class="text-xs text-gray-500">Amount</span>
    <span class="text-xs text-gray-500">Available: {balance}</span>
  </div>
  <input
    type="number"
    class="bg-white focus:bg-gray-100 border border-solid border-gray-400
      focus:border-blue-500 rounded w-full p-2" />
  <div class="text-xs text-gray-500 leading-loose mb-2">
    Deposit required: 1 KSM
  </div>
  <div class="text-xs text-gray-500 leading-loose">Tip message:</div>
  <input
    type="text"
    class="bg-white focus:bg-gray-100 border border-solid border-gray-400
      rounded block w-full p-2" />
  <button
    class="block bg-accent py-2 px-6 mx-auto mt-4 text-gray-100 rounded text-sm">
    Propose tip
  </button>
</form>
