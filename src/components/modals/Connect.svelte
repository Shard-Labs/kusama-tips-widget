<script>
  import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";

  let context = getContext("global");

  const connect = async () => {
    const extensions = await web3Enable("Kusama Tips Widget");

    if (extensions.length === 0) {
      alert("Please install Polkadot extension!");
      context.multistep.reset();
      return;
    }
    context.accounts.set(await web3Accounts());
    context.multistep.nextStep();
  };
</script>

<Modal on:close>
  <h2 slot="header" class="ksm-text-lg ksm-text-dark">Connect to Polkadot</h2>

  <div slot="content">
    <div class="ksm-bg-white ksm-rounded ksm-shadow ksm-p-8 ksm-mb-8">
      <p class="ksm-text-sm ksm-text-dark ksm-mb-4">
        In order to use a Tip or Donate button you must have Polkadot Wallet
        installed and funded with tokens.
      </p>
      <div class="ksm-text-base ksm-text-paragraph">
        <div class="ksm-py-2 ksm-font-semibold">Extensions:</div>
        <ul>
          <li class="ksm-text-sm">
            On Google Chrome, install via <a href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd" target=" _blank" rel="noopener noreferrer" class="ksm-underline"> Chrome
              web store </a>
          </li>
          <li class="ksm-text-sm">
            On Firefox, install via <a href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/" target=" _blank" rel="noopener noreferrer" class="ksm-underline"> Firefox
              add-ons </a>
          </li>
        </ul>
      </div>
    </div>
    <button
      on:click={connect}
      class="ksm-block ksm-bg-accent ksm-py-2 ksm-px-6 ksm-text-white ksm-font-semibold ksm-rounded ksm-mx-auto
        hover:ksm-bg-dark">
      Connect
    </button>
  </div>
</Modal>
