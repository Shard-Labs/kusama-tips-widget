<script>
  import { formatBalance } from "@polkadot/util";
  import { getContext, onMount } from "svelte";
  import { parseInput, transactionHandler } from "../../../utils/index.js";

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
            parseInput(amount, $provider.registry.chainDecimals),
          ]
        : [reason, context.beneficiary];

      extrinsic = $provider.tx.treasury[method](...params);
      let queryInfo = await $provider.rpc.payment.queryInfo(extrinsic.toHex());
      let existentialDeposit = $provider.consts.balances.existentialDeposit;
      let fee = queryInfo.partialFee.add(existentialDeposit);

      estimatedFee = formatBalance(fee, {
        withSi: true,
        decimals: $provider.registry.chainDecimals,
        withUnit: $provider.registry.chainToken,
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

  const onSubmit = async () => {
    submitting = true;
    extrinsic.signAndSend($selectedAccount.address, async (response) => {
      if (!response.isFinalized) return;
      try {
        await transactionHandler(response);
        multistep.nextStep({
          type: "proposal",
          message: `You successfully proposed a tip!`,
        });
      } catch (err) {
        message = err.message;
      }
      submitting = false;
      updateBalance();
    });
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <div class="ksm-flex ksm-justify-between ksm-mt-2 ksm-leading-loose">
    <span class="ksm-text-xs ksm-text-paragraph">Amount {tokenSymbol ? `(${tokenSymbol})` : ''}</span>
    <span class="ksm-text-xs ksm-text-paragraph" class:invisible={!balance}>Available: {balance && balance.toHuman()}</span>
  </div>
  <input
    type="text"
    class="ksm-bg-white focus:ksm-bg-background ksm-border ksm-border-solid ksm-border-opacity-50
      ksm-border-light focus:ksm-border-cyan ksm-rounded ksm-w-full ksm-p-2 ksm-mb-2"
    on:keyup={({ target: { value } }) => debounce(value, (value) => (amount = value))}
    class:ksm-bg-gray-200={!isCouncilMember}
    disabled={!isCouncilMember}
    required={isCouncilMember} />
  {#if !isCouncilMember}
    <div class="ksm-text-xs ksm-text-paragraph ksm-leading-loose ksm--mt-2 ksm-mb-2">
      Only council members are allowed to specify the amount
    </div>
  {:else}
    <div
      class="ksm-text-xs ksm-text-paragraph ksm-leading-loose ksm--mt-2 ksm-mb-2"
      class:ksm-hidden={!estimatedFee}>
      Estimated fee: {estimatedFee}
    </div>
  {/if}
  <div class="ksm-text-xs ksm-text-paragraph ksm-leading-loose">Reason:</div>
  <input
    type="text"
    class="ksm-bg-white focus:ksm-bg-background ksm-border ksm-border-solid ksm-border-opacity-50
      ksm-border-light ksm-rounded ksm-block ksm-w-full ksm-p-2"
    on:keyup={({ target: { value } }) => debounce(value, (value) => (reason = value))}
    required />
  <button
    class="ksm-flex ksm-py-2 ksm-px-6 ksm-mx-auto ksm-mt-4 ksm-text-white ksm-rounded ksm-text-sm"
    class:ksm-bg-gray-500={!extrinsic || submitting}
    class:ksm-bg-accent={extrinsic}
    disabled={!extrinsic || submitting}>
    {#if submitting}
      <svg
        class="ksm-animate-spin ksm--ml-2 ksm-mr-3 ksm-h-5 ksm-w-5 ksm-text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle
          class="ksm-opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4" />
        <path
          class="ksm-opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    {/if}
    <span class="ksm-inline-block">
      {submitting ? 'Processing...' : 'Propose Tip'}</span>
  </button>
  <div
    class="ksm-block ksm-mt-4 ksm-px-4 ksm-py-2 ksm-rounded ksm-text-white ksm-text-sm ksm-bg-red-500"
    class:ksm-hidden={!message}
    on:click={() => (message = null)}>
    {message}
  </div>
</form>
