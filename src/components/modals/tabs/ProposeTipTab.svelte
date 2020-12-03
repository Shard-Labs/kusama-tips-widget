<script>
  import BN from "bn.js";
  import { formatBalance } from "@polkadot/util";
  import { getContext, onMount } from "svelte";

  let context = getContext("global");
  let selectedAccount = context.selectedAccount;
  let provider = context.provider;
  let isCouncilMember;
  let submitting = false;
  let balance;
  let tokenSymbol;

  let amount;
  let reason;

  let timer;
  let extrinsic;
  let estimatedFee;
  let message;

  const debounce = (value, setter) => {
    setter(value);
    clearTimeout(timer);
    extrinsic = null;

    timer = setTimeout(async () => {
      const method = isCouncilMember ? "tipNew" : "reportAwesome";
      const params = isCouncilMember
        ? [
            reason,
            context.beneficiary,
            new BN(1e12, 10).muln(parseFloat(amount || 0)),
          ]
        : [reason, context.beneficiary];

      extrinsic = $provider.tx.treasury[method](...params);
      let queryInfo = await $provider.rpc.payment.queryInfo(extrinsic.toHex());
      let existentialDeposit = $provider.consts.balances.existentialDeposit;
      let fee = queryInfo.partialFee.add(existentialDeposit);

      estimatedFee = formatBalance(fee, {
        withSi: true,
        decimals: existentialDeposit.registry.chainDecimals,
        withUnit: existentialDeposit.registry.chainToken,
      });
    }, 300);
  };

  const updateBalance = async () => {
    let account = await $provider.query.system.account(
      $selectedAccount.address
    );
    balance = account.data.free;
  };

  onMount(async () => {
    let properties = await $provider.rpc.system.properties();
    tokenSymbol = properties.tokenSymbol;

    if ($provider.query.council) {
      const members = await $provider.query.council.members();
      isCouncilMember = !(members || []).includes($selectedAccount.address);
    }
    updateBalance();
  });

  const onSubmit = async (e) => {
    submitting = true;
    extrinsic.signAndSend($selectedAccount.address, async (response) => {
      if (!response.isFinalized) return;
      try {
        await transactionHandler(response);
        multistep.nextStep(`You successfully proposed a tip!`);
      } catch (err) {
        message = err.message;
      }
      submitting = false;
      updateBalance();
    });
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <div class="flex justify-between mt-2 leading-loose">
    <span class="text-xs text-gray-500">Amount {tokenSymbol ? `(${tokenSymbol})` : ''}</span>
    <span class="text-xs text-gray-500" class:invisible={!balance}>Available: {balance && balance.toHuman()}</span>
  </div>
  <input
    type="text"
    class="bg-white focus:bg-gray-100 border border-solid border-gray-400
      focus:border-blue-500 rounded w-full p-2 mb-2"
    on:keyup={({ target: { value } }) => debounce(value, (value) => (amount = value))}
    class:bg-gray-200={!isCouncilMember}
    disabled={!isCouncilMember}
    required={isCouncilMember} />
  {#if !isCouncilMember}
    <div class="text-xs text-gray-500 leading-loose -mt-2 mb-2">
      Only council members are allowed to specify the amount
    </div>
  {:else}
    <div
      class="text-xs text-gray-500 leading-loose -mt-2 mb-2"
      class:hidden={!estimatedFee}>
      Estimated fee: {estimatedFee}
    </div>
  {/if}
  <div class="text-xs text-gray-500 leading-loose">Reason:</div>
  <input
    type="text"
    class="bg-white focus:bg-gray-100 border border-solid border-gray-400
      rounded block w-full p-2"
    on:keyup={({ target: { value } }) => debounce(value, (value) => (reason = value))}
    required />
  <button
    class="flex py-2 px-6 mx-auto mt-4 text-gray-100 rounded text-sm"
    class:bg-gray-500={!extrinsic || submitting}
    class:bg-accent={extrinsic}
    disabled={!extrinsic || submitting}>
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
  <div
    class="block mt-4 px-4 py-2 rounded text-white text-sm"
    class:bg-red-500={message}
    class:hidden={!message}
    on:click={() => (message = null)}>
    {message}
  </div>
</form>
