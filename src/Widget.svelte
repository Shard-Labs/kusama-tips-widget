<script lang="typescript">
  import "./main.css";
  import {
    web3Enable,
    web3Accounts,
    isWeb3Injected,
  } from "@polkadot/extension-dapp";
  import { ApiPromise, WsProvider } from "@polkadot/api";

  async function main() {
    await web3Enable("Kusama Tips Widget");

    if (isWeb3Injected) {
      let accounts = await web3Accounts();
      const provider = new WsProvider("wss://kusama-rpc.polkadot.io/");
      const api = await ApiPromise.create({ provider });

      if (accounts.length > 0) {
        let result = await api.derive.balances.account(accounts[0].address);
        console.log(result);
      }
    }
  }
</script>

<div
  id="widget"
  class="fixed inset-0 flex overflow-hidden w-screen h-screen z-50 bg-black
    bg-opacity-50">
  <button
    on:click={main}
    class="inline-block bg-blue-500 py-2 px-6 m-auto text-gray-100 uppercase
      text-lg rounded">Connect</button>
</div>
