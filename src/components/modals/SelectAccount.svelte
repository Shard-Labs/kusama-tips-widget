<script>
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";

  let context = getContext("global");
  let selected = context.multistep;

  context.multistep.subscribe((n) => (selected = n));
  let accounts = context.accounts;
</script>

<Modal index={1} on:close {selected}>
  <h2 slot="header" class="text-lg text-gray-900">Select Polkadot Account</h2>
  <ul slot="content" style="max-height: 400px">
    {#each $accounts as account}
      <li
        class="text-sm text-gray-700 rounded shadow p-4 mb-4 bg-white truncate
          cursor-pointer"
        on:click={() => {
          context.selectedAccount.set(account);
          context.multistep.nextStep();
        }}>
        <div class="font-semibold">{account.meta.name}</div>
        <div class="text-gray-500 truncate">{account.address}</div>
      </li>
    {/each}
  </ul>
</Modal>
