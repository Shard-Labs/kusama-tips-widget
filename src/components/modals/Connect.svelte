<script>
  import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";

  let context = getContext("global");
  let selected = context.multistep;

  context.multistep.subscribe((n) => (selected = n));

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

<Modal index={0} on:close {selected}>
  <h2 slot="header" class="text-xl text-gray-900 leading 8">Connect to Polkadot</h2>

  <div slot="content" class="bg-white rounded shadow p-4 m-8">
    <p class="text-sm text-gray-500">
      In order to use a Tip or Donate button you must have Polkadot Wallet
      installed and funded with KSM tokens.
    </p>
    <div class="text-base text-gray-700 ">
      <p class="pt-4">Installation:</p>
      <ul>
        <li>On Chrome, install via <a
        href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd"
        target=" _blank"
        rel="noopener noreferrer"
        class="underline">Chrome web store</a></li>
        <li>On Firefox, install via <a
        href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/"
        target=" _blank"
        rel="noopener noreferrer"
        class="underline">Firefox add-ons</a></li>
      </ul>
    </div>
  </div>
  <button
    slot="footer"
    on:click={connect}
    class="inline-block bg-blue-500 py-2 px-6 m-auto text-gray-100 uppercase
    text-lg rounded">Connect</button>
</Modal>
