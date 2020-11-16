<script>
  import "./main.css";
  import { createMultistep } from "./components/stores";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import Connect from "./components/modals/Connect.svelte";
  import SelectAccount from "./components/modals/SelectAccount.svelte";
  import Tipping from "./components/modals/Tipping.svelte";

  let showModal = true;
  let multistep = createMultistep();

  setContext("global", {
    multistep,
    accounts: writable([]),
    selectedAccount: writable(null),
  });

  function handleClose() {
    showModal = false;
    multistep.reset();
  }
</script>

<div id="wrapper">
  <button
    on:click={() => (showModal = true)}
    id="btnOverlay"
    class="inline-block bg-accent py-2 px-6 m-auto text-gray-100 text-lg rounded">
    Tip me
  </button>

  {#if showModal}
    <Connect on:close={handleClose} />
    <SelectAccount on:close={handleClose} />
    <Tipping on:close={handleClose} />
    <div
      id="widget"
      class="fixed inset-0 flex overflow-hidden w-screen h-screen z-10 bg-black
        bg-opacity-50 transition-opacity duration-200" />
  {/if}
</div>
