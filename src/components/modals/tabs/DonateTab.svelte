<script>
  import { formatBalance } from "@polkadot/util";
  import { getContext, onMount } from "svelte";
  import { parseInput, transactionHandler } from "../../../utils/index.js";
  import { encodeAddress } from "@polkadot/util-crypto";

  let context = getContext("global");
  let selectedAccount = context.selectedAccount;
  let multistep = context.multistep;
  let provider = context.provider;
  let balance;
  let input;
  let submitting = false;
  let tokenSymbol;

  let timer;
  let extrinsic;
  let estimatedFee;
  let insufficientBalance = false;
  let message;

  const debounce = (value) => {
    input = value;
    extrinsic = null;
    estimatedFee = null;
    insufficientBalance = false;

    if (!value) return;
    
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const amount = parseInput(value, $provider.registry.chainDecimals); // parse input to BN
      
      // create a "transfer" extrinsic
      const localExtrinsic = $provider.tx.balances.transfer(
        context.beneficiary,
        amount
      );

      // get the payment info to display the fee
      let paymentInfo = await localExtrinsic.paymentInfo($selectedAccount.address);
      let amountWithFee = amount.add(paymentInfo.partialFee);

      // check for insufficient balance
      if (amountWithFee.cmp(balance) > 0) {
        insufficientBalance = true;
        return;
      }

      extrinsic = localExtrinsic;
      estimatedFee = formatBalance(paymentInfo.partialFee, {
        withSi: true,
        decimals: $provider.registry.chainDecimals,
        withUnit: $provider.registry.chainToken,
      });
    }, 300);
  };

  /**
   * Update balance of the selected account
   */
  const updateBalance = async () => {
    let account = await $provider.query.system.account(
      $selectedAccount.address
    );
    balance = account.data.free;
  };

  onMount(async () => {
    updateBalance(); // set the initial balance
    let properties = await $provider.rpc.system.properties();
    tokenSymbol = properties.tokenSymbol; // get the token symbol
  });

  /**
   * Handle form submission
   */
  const onSubmit = async () => {
    submitting = true;
    extrinsic
      .signAndSend($selectedAccount.address, async (response) => {
        if (!response.isFinalized) return;
        try {
          await transactionHandler(response);
          // if transaction is successful, move to the confirmation step
          multistep.nextStep({
            type: "donate",
            message: `Successfully donated ${input} ${tokenSymbol}`,
            address: encodeAddress($selectedAccount.address, 2), // encode address with SS58 index of 2 (Kusama)
          });
        } catch (err) {
          message = err.message;
        }
        submitting = false;
        updateBalance(); // update balance once transaction is finalized
      })
      .catch(() => (submitting = false));
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <div class="ksm-flex ksm-justify-between ksm-mt-2 ksm-leading-loose">
    <span class="ksm-text-xs ksm-text-paragraph">Amount {tokenSymbol ? `(${tokenSymbol})` : ''}</span>
    <span
      class="ksm-text-xs ksm-text-paragraph ksm-ml-auto"
      class:ksm-invisible={!balance}>Available: {balance && balance.toHuman()}</span>
  </div>
  <input
    type="text"
    class="ksm-bg-white focus:ksm-bg-background ksm-border ksm-border-solid
      ksm-border-opacity-50 ksm-border-light ksm-rounded ksm-block ksm-w-full
      ksm-p-2"
    on:keyup={({ target: { value } }) => debounce(value)}
    required />
  <div
    class="ksm-text-xs ksm-text-paragraph ksm-leading-loose ksm-mb-2"
    class:ksm-hidden={!estimatedFee}>
    Fees of {estimatedFee} will be applied to the transaction.
  </div>
  <div
    class="ksm-text-xs ksm-text-paragraph ksm-leading-loose ksm-mb-2"
    class:ksm-hidden={!insufficientBalance}>
    Please enter an amount smaller than your available balance.
  </div>
  <button
    class="ksm-flex ksm-py-2 ksm-px-6 ksm-mx-auto ksm-mt-4 ksm-text-white
      ksm-rounded ksm-text-sm"
    class:ksm-bg-gray-500={!extrinsic || submitting}
    class:ksm-bg-accent={extrinsic}
    disabled={!extrinsic || submitting}>
    {#if submitting}
      <svg
        class="ksm-animate-spin ksm--ml-2 ksm-mr-3 ksm-h-5 ksm-w-5
          ksm-text-white"
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
      {submitting ? 'Processing...' : 'Donate'}</span>
  </button>
  <div
    class="ksm-block ksm-mt-4 ksm-px-4 ksm-py-2 ksm-rounded ksm-text-white
      ksm-text-sm ksm-bg-red-500"
    class:ksm-hidden={!message}
    on:click={() => (message = null)}>
    {message}
  </div>
</form>
