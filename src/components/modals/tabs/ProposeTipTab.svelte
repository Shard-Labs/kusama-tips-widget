<script>
  import { getContext, onMount } from "svelte";

  let context = getContext("global");
  let selectedAccount = context.selectedAccount;
  let provider = context.provider;

  let balance;
  let tokenSymbol;

  let amount;
  let reason;

  onMount(async () => {
    let account = await $provider.query.system.account(
      $selectedAccount.address
    );
    balance = account.data.free.toHuman();
    let properties = await $provider.rpc.system.properties();
    tokenSymbol = properties.tokenSymbol;
  });

  const onSubmit = async (e) => {
    // for council members: $provider.tx.treasury.tipNew
    let tx = await $provider.tx.treasury.reportAwesome(
      reason,
      context.beneficiary
    );
    console.log(tx);
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <div class="flex justify-between mt-2 leading-loose">
    <span class="text-xs text-gray-500">Amount {tokenSymbol ? `(${tokenSymbol})` : ''}</span>
    <span class="text-xs text-gray-500" class:invisible={!balance}>Available: {balance}</span>
  </div>
  <input
    type="number"
    class="bg-white focus:bg-gray-100 border border-solid border-gray-400
      focus:border-blue-500 rounded w-full p-2 mb-2"
    bind:value={amount} />
  <div class="text-xs text-gray-500 leading-loose">Reason:</div>
  <input
    type="text"
    class="bg-white focus:bg-gray-100 border border-solid border-gray-400
      rounded block w-full p-2"
    bind:value={reason} />
  <button
    class="block bg-accent py-2 px-6 mx-auto mt-4 text-gray-100 rounded text-sm">
    Propose Tip
  </button>
</form>
