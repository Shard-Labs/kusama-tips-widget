<script>
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";

  let context = getContext("global");
  let selected = context.multistep;

  context.multistep.subscribe((n) => (selected = n));
  let accounts = context.accounts;
</script>

<Modal index={1} on:close {selected}>
  <h2 slot="header" class="text-lg text-dark">Select Polkadot Account</h2>
  <ul slot="content" style="max-height: 350px; overflow-y: scroll;">
    {#each $accounts as account}
      <li
        class="text-sm text-medium rounded shadow p-4 mb-4 bg-white truncate
        cursor-pointer hover:bg-light"
        on:click={() => {
          context.selectedAccount.set(account);
          context.multistep.nextStep();
        }}>
        <div class="font-semibold">{account.meta.name}</div>
        <div class="text-medium truncate">{account.address}</div>
      </li>
    {/each}
  </ul>
</Modal>
