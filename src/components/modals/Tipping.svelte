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
    { label: "Tip", value: 1, component: Tab1 },
    { label: "Donate", value: 2, component: Tab2 },
  ];
</script>

<Modal index={2} on:close {selected}>
  <div slot="header" class="flex flex-wrap ">
    <span class="text-xs text-gray-700 truncate">
      {$selectedAccount.address}
    </span>
    <span
      class="text-xs text-blue-500"
      on:click={() => {
        context.selectedAccount.set(null);
        context.multistep.previousStep();
      }}>
      Change account
    </span>
  </div>
  <div slot="content" class="px-20 py-4 bg-white">
    <Tabs {items} />
  </div>
</Modal>
