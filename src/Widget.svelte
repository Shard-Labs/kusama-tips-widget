<script>
  import "./main.css";
  import { createApiProvider, createMultistep } from "./components/store";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import Connect from "./components/modals/Connect.svelte";
  import SelectAccount from "./components/modals/SelectAccount.svelte";
  import Tipping from "./components/modals/Tipping.svelte";
  import Confirmation from "./components/modals/Confirmation.svelte";

  export let beneficiary;
  export let element;
  export let allowProposing = true;
  export let buttonText = "Kusama Tips";

  let showModal = false;
  let multistep = createMultistep();

  setContext("global", {
    beneficiary,
    multistep,
    allowProposing,
    accounts: writable([]),
    selectedAccount: writable(null),
    provider: createApiProvider(),
  });

  function handleClose() {
    showModal = false;
    multistep.reset();
  }

  let modals = [
    { component: Connect },
    { component: SelectAccount },
    { component: Tipping },
    { component: Confirmation },
  ];

  let selected;
  multistep.subscribe(({ index }) => (selected = modals[index]));

  if (element) {
    element.onclick = function () {
      showModal = true;
    };
  }
</script>

<div id="kusama-tips-wrapper">
  {#if !element}
    <button
      on:click={() => (showModal = true)}
      class="ksm-inline-block ksm-bg-accent ksm-py-2 ksm-px-6 ksm-m-auto
        ksm-text-white ksm-rounded">
      {buttonText}
    </button>
  {/if}
  {#if showModal}
    <svelte:component this={selected.component} on:close={handleClose} />
  {/if}
</div>
