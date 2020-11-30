<script>
  import { getContext, onDestroy } from "svelte";
  import Modal from "../Modal.svelte";
  import ProposeTipTab from "./tabs/ProposeTipTab.svelte";
  import DonateTab from "./tabs/DonateTab.svelte";
  import Tabs from "./tabs/Tabs.svelte";
  import Loader from "../common/SyncLoader.svelte";
  import { web3FromAddress } from "@polkadot/extension-dapp";

  let context = getContext("global");
  let selectedAccount = context.selectedAccount;
  let provider = context.provider;

  let items = [
    { label: "Donate", component: DonateTab },
    { label: "Propose Tip", component: ProposeTipTab },
  ];

  let loading = true;
  let unsub = provider.subscribe(async (api) => {
    if (!api) return;
    const injector = await web3FromAddress($selectedAccount.address);
    api.setSigner(injector.signer);
  });
  provider.connect().then(() => (loading = false));

  onDestroy(() => unsub());
</script>

<Modal on:close>
  <div slot="header" class="flex flex-col">
    <div class="text-xs text-gray-800 truncate">{$selectedAccount.address}</div>
    <span
      class="text-xs text-gray-600 cursor-pointer"
      on:click={() => {
        context.selectedAccount.set(null);
        context.multistep.previousStep();
      }}>
      Change account
    </span>
  </div>
  <div slot="content" class="p-8 bg-white shadow rounded">
    {#if loading}
      <div
        class="flex flex-col justify-center items-center box-border"
        style="height: 273px">
        <Loader />
        <p class="text-sm text-gray-800">Connecting to Kusama...</p>
      </div>
    {:else}
      <Tabs {items} />
    {/if}
  </div>
</Modal>
