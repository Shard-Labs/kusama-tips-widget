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
  <div slot="header" class="flex flex-col">
    <div class="font-semibold">{$selectedAccount.meta.name}</div>
    <div class="text-xs text-medium truncate">{$selectedAccount.address}</div>
    <span
      class="text-xs text-dark cursor-pointer self-end"
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
