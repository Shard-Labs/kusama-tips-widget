<script>
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";
  import { encodeAddress } from "@polkadot/util-crypto";

  let context = getContext("global");
  let accounts = context.accounts;
</script>

<Modal on:close>
  <h2 slot="header" class="ksm-text-lg ksm-text-gray-900">Select Polkadot Account</h2>
  <ul
    slot="content"
    class="ksm--m-2 ksm-p-2 ksm-overflow-y-scroll"
    style="ksm-max-height: 360px">
    {#each $accounts as account}
      <li
        class="ksm-text-sm ksm-text-medium ksm-rounded ksm-shadow ksm-p-4 ksm-mb-4 ksm-bg-white ksm-truncate
          ksm-cursor-pointer hover:ksm-bg-gray-100"
        on:click={async () => {
          context.selectedAccount.set(account);
          context.multistep.nextStep();
        }}>
        <div class="ksm-font-semibold">{account.meta.name}</div>
        <div class="ksm-text-medium ksm-truncate">
          {encodeAddress(account.address, 2)}
        </div>
      </li>
    {/each}
  </ul>
</Modal>
