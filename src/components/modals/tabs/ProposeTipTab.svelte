<script>
  import { getContext, onMount } from "svelte";

  let context = getContext("global");
  let selectedAccount = context.selectedAccount;
  let provider = context.provider;
  let isCouncilMember;
  let submitting = false;
  let balance;
  let tokenSymbol;
  let loaded = false;

  let amount;
  let reason;

  onMount(async () => {
    let account = await $provider.query.system.account(
      $selectedAccount.address
    );
    balance = account.data.free.toHuman();
    let properties = await $provider.rpc.system.properties();
    tokenSymbol = properties.tokenSymbol;

    if ($provider.query.council) {
      const members = await $provider.query.council.members();
      isCouncilMember = (members || []).includes($selectedAccount.address);
    }
    loaded = true;
  });

  const onSubmit = async (e) => {
    const method = isCouncilMember ? "tipNew" : "reportAwesome";
    const params = isCouncilMember
      ? [reason, context.beneficiary, amount]
      : [reason, context.beneficiary];

    let extrinsic = await $provider.tx.treasury[method](...params);
    // TODO: send transaction and handle errors
    // extrinsic.signAndSend($selectedAccount.address, (response) => {});
    console.log(extrinsic);
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <div class="flex justify-between mt-2 leading-loose">
    <span class="text-xs text-gray-500">Amount {tokenSymbol ? `(${tokenSymbol})` : ''}</span>
    <span class="text-xs text-gray-500" class:invisible={!balance}>Available: {balance}</span>
  </div>
  <input
    type="text"
    class="bg-white focus:bg-gray-100 border border-solid border-gray-400
      focus:border-blue-500 rounded w-full p-2 mb-2"
    bind:value={amount}
    class:bg-gray-200={loaded && !isCouncilMember}
    disabled={!isCouncilMember}
    required={isCouncilMember} />
  {#if loaded && !isCouncilMember}
    <div class="text-xs text-gray-500 leading-loose -mt-2 mb-2">
      Only council members are allowed to specify the amount
    </div>
  {/if}
  <div class="text-xs text-gray-500 leading-loose">Reason:</div>
  <input
    type="text"
    class="bg-white focus:bg-gray-100 border border-solid border-gray-400
      rounded block w-full p-2"
    bind:value={reason}
    required />
  <button
    class="flex py-2 px-6 mx-auto mt-4 text-gray-100 rounded text-sm"
    class:bg-gray-500={submitting}
    class:bg-accent={!submitting}
    disabled={submitting}>
    {#if submitting}
      <svg
        class="animate-spin -ml-2 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    {/if}
    <span class="inline-block">
      {submitting ? 'Processing...' : 'Propose Tip'}</span>
  </button>
</form>
