<script>
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";
  import Tab1 from "./tabs/TipTab.svelte";
  import Tab2 from "./tabs/DonateTab.svelte";
  import Tabs from "./tabs/Tabs.svelte";

  let context = getContext("global");
  let selected = context.multistep;
  let selectedAccount = context.selectedAccount;

  context.multistep.subscribe((n) => (selected = n));

  let items = [
    { label: "Tip", component: Tab1 },
    { label: "Donate", component: Tab2 },
  ];
</script>

<Modal index={2} on:close {selected}>
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
    <Tabs {items} />
  </div>
</Modal>
