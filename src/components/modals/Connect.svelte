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
  <h2 slot="header" class="text-lg text-dark">Connect to Polkadot</h2>

  <div slot="content">
    <div class="bg-white rounded shadow p-8 mb-8">
      <p class="text-sm text-light mb-4">
        In order to use a Tip or Donate button you must have Polkadot Wallet
        installed and funded with tokens.
      </p>
      <div class="text-base text-paragraph">
        <div class="py-2 font-semibold">Extensions:</div>
        <ul>
          <li class="text-sm">
            On Google Chrome, install via <a href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd" target=" _blank" rel="noopener noreferrer" class="underline"> Chrome
              web store </a>
          </li>
          <li class="text-sm">
            On Firefox, install via <a href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/" target=" _blank" rel="noopener noreferrer" class="underline"> Firefox
              add-ons </a>
          </li>
        </ul>
      </div>
    </div>
    <button
      on:click={connect}
      class="block bg-accent py-2 px-6 text-white font-semibold rounded mx-auto hover:bg-dark">
      Connect
    </button>
  </div>
</Modal>
