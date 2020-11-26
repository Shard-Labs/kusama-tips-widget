<script>
  import { getContext, onMount } from "svelte";
  import BN from "bn.js";

  let context = getContext("global");
  let selectedAccount = context.selectedAccount;
  let provider = context.provider;
  let balance;
  let amount;

  onMount(async () => {
    let account = await $provider.query.system.account(
      $selectedAccount.address
    );
    balance = account.data.free.toHuman();
  });

  const onSubmit = async (e) => {
    // 200000000000 -> 200 mWND
    let tx = $provider.tx.balances.transfer(
      context.beneficiary,
      new BN(amount, 10)
    );
    tx.signAndSend($selectedAccount.address, (status) => {
      console.log(status);
      // todo: add success/error handling
    });
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <div class="flex justify between mt-2 leading-loose">
    <span class="text-xs text-gray-500">Amount</span>
    <span
      class="text-xs text-gray-500 ml-auto"
      class:invisible={!balance}>Available: {balance}</span>
  </div>
  <input
    type="number"
    class="bg-white focus:bg-gray-100 border border-solid border-gray-400
      rounded block w-full p-2"
    bind:value={amount} />

  <button
    class="block bg-accent py-2 px-6 mx-auto mt-4 text-gray-100 rounded text-sm">
    Donate
  </button>
</form>
