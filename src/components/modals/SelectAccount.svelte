<script>
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";

  let context = getContext("global");
  let selected = context.multistep;

  context.multistep.subscribe((n) => (selected = n));
  let accounts = context.accounts;
</script>

<Modal index={1} on:close {selected}>
  <h2 slot="header" class="text-xl text-gray-900 leading 8">
    Select Polkadot Account
  </h2>
  <ul slot="content">
    {#each $accounts as account}
      <li
        class="text-sm text-gray-700 rounded shadow p-4 m-8 bg-white truncate
        hover:bg-gray-100"
        on:click={() => {
          context.selectedAccount.set(account);
          context.multistep.nextStep();
        }}>
        {account.address}
      </li>
    {/each}
  </ul>
</Modal>
