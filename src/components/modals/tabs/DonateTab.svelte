<script>
  import BN from "bn.js";
  import { getContext, onMount } from "svelte";

  let context = getContext("global");
  let selectedAccount = context.selectedAccount;
  let provider = context.provider;
  let balance;
  let amount;
  let submitting = false;
  let tokenSymbol;

  let timer;
  let extrinsic;
  let estimatedFee;
  let message;

  const debounce = (value) => {
    clearTimeout(timer);
    extrinsic = null;

    timer = setTimeout(async () => {
      amount = value;
      extrinsic = $provider.tx.balances.transfer(
        context.beneficiary,
        new BN(1e12, 10).muln(parseFloat(value))
      );
      let queryInfo = await $provider.rpc.payment.queryInfo(extrinsic.toHex());
      estimatedFee = queryInfo.partialFee.toHuman();
    }, 300);
  };

  const updateBalance = async () => {
    let account = await $provider.query.system.account(
      $selectedAccount.address
    );
    balance = account.data.free;
  };

  onMount(async () => {
    updateBalance();
    let properties = await $provider.rpc.system.properties();
    tokenSymbol = properties.tokenSymbol;
  });

  const onSubmit = async (e) => {
    submitting = true;
    extrinsic.signAndSend($selectedAccount.address, (response) => {
      console.log(response);
      if (!response.isFinalized) {
        return;
      }

      submitting = false;
      updateBalance();

      (response.events || [])
        .filter((record) => !!record.event)
        .map(({ event: { data, method, section } }) => {
          if (section === "system" && method === "ExtrinsicFailed") {
            const [dispatchError] = data;
            if (dispatchError.isModule) {
              try {
                const mod = dispatchError.asModule;
                const error = mod.registry.findMetaError(mod);

                message = {
                  type: "error",
                  data: `${error.section}.${error.name}: ${error.documentation}`,
                };
                return;
              } catch (error) {
                // swallow
              }
            }
            message = {
              type: "error",
              data: `${section}.${method}`,
            };
          } else if (section === "system" && method === "ExtrinsicSuccess") {
            message = {
              type: "success",
              data: `Successfully donated ${amount} ${tokenSymbol}`,
            };
          }
        });
    });
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <div class="flex justify between mt-2 leading-loose">
    <span class="text-xs text-gray-500">Amount {tokenSymbol ? `(${tokenSymbol})` : ''}</span>
    <span
      class="text-xs text-gray-500 ml-auto"
      class:invisible={!balance}>Available: {balance && balance.toHuman()}</span>
  </div>
  <input
    type="text"
    class="bg-white focus:bg-gray-100 border border-solid border-gray-400
      rounded block w-full p-2"
    on:keyup={({ target: { value } }) => debounce(value)}
    required />
  <div class="text-xs text-gray-500 leading-loose" class:hidden={!estimatedFee}>
    Estimated fee: {estimatedFee}
  </div>
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
    <span class="inline-block"> {submitting ? 'Processing...' : 'Donate'}</span>
  </button>
  <div
    class="block mt-4 px-4 py-2 rounded text-white text-sm"
    class:bg-accent={message && message.type == 'success'}
    class:bg-red-500={message && message.type == 'error'}
    class:hidden={!message}
    on:click={() => (message = null)}>
    {message && message.data}
  </div>
</form>
