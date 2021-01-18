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
  let allowProposing = context.allowProposing;

  let loading = true;
  let items = [
    { label: "Donate", component: DonateTab },
    { label: "Propose Tip", component: ProposeTipTab },
  ];

  /**
   * Subscribe to the api provider writable and set the signer for the selected account
   */
  let unsub = provider.subscribe(async (api) => {
    if (!api) return;
    const injector = await web3FromAddress($selectedAccount.address);
    api.setSigner(injector.signer);
  });
  provider.connect().then(() => (loading = false));

  /**
   * Remove subscribtion once component is destroyed
  */
  onDestroy(() => unsub());
</script>

<Modal on:close>
  <div slot="header" class="ksm-flex ksm-flex-col">
    <div class="ksm-flex ksm-justify-between">
      <div class="ksm-font-semibold">{$selectedAccount.meta.name}</div>
      <span
        class="ksm-text-xs ksm-text-accent ksm-cursor-pointer ksm-self-end"
        on:click={() => {
          context.selectedAccount.set(null);
          context.multistep.previousStep();
        }}>
        Change account
      </span>
    </div>

    <div class="ksm-text-xs ksm-text-paragraph ksm-truncate">
      {$selectedAccount.address}
    </div>
  </div>
  <div slot="content" class="ksm-p-8 ksm-bg-white ksm-shadow ksm-rounded">
    {#if loading}
      <div
        class="ksm-flex ksm-flex-col ksm-justify-center ksm-items-center
          ksm-box-border"
        style="height: 273px">
        <Loader />
        <p class="ksm-text-sm ksm-text-paragraph">Connecting to Kusama...</p>
      </div>
    {:else if allowProposing}
      <Tabs {items} />
    {:else}
      <DonateTab />
    {/if}
  </div>
</Modal>
