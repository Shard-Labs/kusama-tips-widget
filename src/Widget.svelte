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

  let showModal = false;
  let multistep = createMultistep();

  setContext("global", {
    beneficiary,
    multistep,
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
      class="inline-block bg-accent py-2 px-6 m-auto text-gray-100 rounded">
      Kusama Tips
    </button>
  {/if}
  {#if showModal}
    <svelte:component this={selected.component} on:close={handleClose} />
    <div
      id="widget"
      class="fixed inset-0 flex overflow-hidden w-screen h-screen z-10 bg-black
        bg-opacity-50 transition-opacity duration-200" />
  {/if}
</div>
