<script>
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";
  import { encodeAddress } from "@polkadot/util-crypto";
  import { WsProvider } from "@polkadot/api";

  let context = getContext("global");
  let accounts = context.accounts;
</script>

<Modal on:close>
  <h2 slot="header" class="text-lg text-gray-900">Select Polkadot Account</h2>
  <ul
    slot="content"
    class="-m-2 p-2 overflow-y-scroll"
    style="max-height: 360px">
    {#each $accounts as account}
      <li
        class="text-sm text-medium rounded shadow p-4 mb-4 bg-white truncate
          cursor-pointer hover:bg-gray-100"
        on:click={async () => {
          context.selectedAccount.set(account);
          context.multistep.nextStep();
        }}>
        <div class="font-semibold">{account.meta.name}</div>
        <div class="text-medium truncate">
          {encodeAddress(account.address, 2)}
        </div>
      </li>
    {/each}
  </ul>
</Modal>
