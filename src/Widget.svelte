<script>
  import "./main.css";
  import { createApiProvider, createMultistep } from "./components/store";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import Connect from "./components/modals/Connect.svelte";
  import SelectAccount from "./components/modals/SelectAccount.svelte";
  import Tipping from "./components/modals/Tipping.svelte";
  import Confirmation from "./components/modals/Confirmation.svelte";
  import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
  import { ORIGIN_NAME } from "./utils/constants";

  /**
   * Props
   */
  export let beneficiary;
  export let element;
  export let allowProposing = true;
  export let buttonText = "Kusama Tips";

  let showModal = false;

  /**
   * Creates multistep store
   */
  let multistep = createMultistep();

  /**
   * Sets global context to be used across the widget
  */
  let context = {
    beneficiary,
    multistep,
    allowProposing,
    accounts: writable([]),
    selectedAccount: writable(null),
    provider: createApiProvider(),
  };
  setContext("global", context);

  /**
   * Hide the modal and reset the multistep handler
   */
  function handleClose() {
    showModal = false;
    multistep.reset();
  }

  /**
   * Modals
   */
  let modals = [
    { component: Connect },
    { component: SelectAccount },
    { component: Tipping },
    { component: Confirmation },
  ];

  let selected;
  multistep.subscribe(({ index }) => (selected = modals[index]));

  const onClickHandler = async function() {
    const extensions = await web3Enable(ORIGIN_NAME);
    if (extensions.length > 0) {
      context.accounts.set(await web3Accounts());
      context.multistep.nextStep();
    }
    showModal = true;
  }

  /**
   * Register onclick handler if element prop is provided
  */
  if (element) {
    element.onclick = onClickHandler;
  }
</script>

<div id="kusama-tips-wrapper">
  {#if !element}
    <button
      on:click={onClickHandler}
      class="ksm-inline-block ksm-bg-accent ksm-py-2 ksm-px-6 ksm-m-auto
        ksm-text-white ksm-rounded">
      {buttonText}
    </button>
  {/if}
  {#if showModal}
    <svelte:component this={selected.component} on:close={handleClose} />
  {/if}
</div>
