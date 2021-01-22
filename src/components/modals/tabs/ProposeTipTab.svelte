<script>
  import { formatBalance } from "@polkadot/util";
  import { getContext, onMount } from "svelte";
  import { parseInput, sanitizeUrl, transactionHandler } from "../../../utils/index.js";

  let context = getContext("global");
  let selectedAccount = context.selectedAccount;
  let multistep = context.multistep;
  let provider = context.provider;
  let isCouncilMember;
  let submitting = false;
  let balance;
  let tokenSymbol;

  let timer;
  let extrinsic;
  let estimatedFee;
  let message;

  let form = {
    amount: null,
    reason: null,
    validate() { 
      if (isCouncilMember) {
        return !!this.amount && !!this.reason;
      }
      return !!this.reason;
    }, 
  }

  const debounce = (value, setter) => {
    setter(value);
    extrinsic = null;
    estimatedFee = null;

    if (!form.validate())
      return;

    clearTimeout(timer);
    timer = setTimeout(async () => {
      // determine extrinsic depending on if user is a member of the council
      const method = isCouncilMember ? "tipNew" : "reportAwesome";

      // sanitize url (remove utm)
      const url = sanitizeUrl(window.location);

      // create extrinsic parameters
      const params =
        isCouncilMember
          ? [
              `${url} - ${form.reason}`,
              context.beneficiary,
              parseInput(form.amount, $provider.registry.chainDecimals),
            ]
          : [`${url} - ${form.reason}`, context.beneficiary];

      // create the extrinsic from the treasury module
      const localExtrinsic = $provider.tx.treasury[method](...params);

      // get the payment info to display the fee
      let paymentInfo = await localExtrinsic.paymentInfo($selectedAccount.address);

      // check for insufficient balance
      if (paymentInfo.partialFee.cmp(balance) > 0) 
        return;
        
      // format the fee
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
    let properties = await $provider.rpc.system.properties();
    tokenSymbol = properties.tokenSymbol; // get token symbol

    // check if selected account is a member of the council
    if ($provider.query.council) {
      const members = await $provider.query.council.members();
      isCouncilMember = (members || []).includes($selectedAccount.address);
    }
    updateBalance(); // set the initial balance
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
            type: "proposal",
            message: `You successfully proposed a tip!`,
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
  <div
    class="ksm-text-xs ksm-text-paragraph ksm-leading-loose ksm--mt-2 ksm-mb-2">
    <p>Here you can propose a tip from the Kusama Treasury. If you're not a member of the Council, a small bond is required in order to propose a tip. How the final tip amount is calculated, as well as other
    details, can be found <a
      href="https://guide.kusama.network/docs/en/mirror-learn-treasury#tipping"
      target=" _blank"
      rel="noopener noreferrer"
      class="ksm-underline">here</a>.</p>
    <p>The URL of this webpage will be added to your message.</p>
  </div>
  {#if isCouncilMember}
    <div class="ksm-flex ksm-justify-between ksm-mt-2 ksm-leading-loose">
      <span class="ksm-text-xs ksm-text-paragraph">Amount {tokenSymbol ? `(${tokenSymbol})` : ''}</span>
    </div>
    <input
      type="text"
      class="ksm-bg-white focus:ksm-bg-background ksm-border ksm-border-solid
        ksm-border-opacity-50 ksm-border-light focus:ksm-border-cyan ksm-rounded
        ksm-w-full ksm-p-2 ksm-mb-2"
      on:keyup={({ target: { value } }) => debounce(value, (value) => (form.amount = value))} />
  {/if}
  <div class="ksm-text-xs ksm-text-paragraph ksm-leading-loose">Reason:</div>
  <input
    type="text"
    class="ksm-bg-white focus:ksm-bg-background ksm-border ksm-border-solid
      ksm-border-opacity-50 ksm-border-light ksm-rounded ksm-block ksm-w-full
      ksm-p-2"
    on:keyup={({ target: { value } }) => debounce(value, (value) => (form.reason = value))}
    required />
  <div
    class="ksm-text-xs ksm-text-paragraph ksm-leading-loose ksm-mb-2"
    class:ksm-hidden={!estimatedFee}>
    Fees of {estimatedFee} will be applied to the submission
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
      {submitting ? 'Processing...' : 'Propose Tip'}</span>
  </button>
  <div
    class="ksm-block ksm-mt-4 ksm-px-4 ksm-py-2 ksm-rounded ksm-text-white
      ksm-text-sm ksm-bg-red-500"
    class:ksm-hidden={!message}
    on:click={() => (message = null)}>
    {message}
  </div>
</form>
