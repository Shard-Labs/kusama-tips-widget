<script>
  import "./main.css";
  import { ApiPromise, WsProvider } from "@polkadot/api";
  import { Keyring } from "@polkadot/keyring";

  const alice = keyring.addFromUri("//Alice", { name: "Alice default" });
  console.log(
    `${alice.meta.name}: has adress ${alice.address} with public key [${alice.publicKey}]`
  );

  //Alice account
  //const Alice = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

  async function main() {
    //Initialise the provider to conect to westend testnet
    // let wsProvider = new WsProvider("wss://westend-rpc.polkadot.io/");

    //Initialise the provider to conect to local node
    let wsProvider = new WsProvider("ws://127.0.0.1:9944");

    //Create the API and wait untill ready
    let api = new ApiPromise({ provider: wsProvider });
    await api.isReady;

    //Retrieve the chain and node information
    let [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
    ]);

    console.log(
      `Connected to chain ${chain} using ${nodeName} v${nodeVersion}`
    );
  }

  main()
    .catch(console.error)
    .finally(() => process.exit());
</script>

<div
  id="widget"
  class="fixed inset-0 flex overflow-hidden w-screen h-screen z-50 bg-black
    bg-opacity-50">
  <button
    on:click={main}
    class="inline-block bg-blue-500 py-2 px-6 m-auto text-gray-100 uppercase
      text-lg rounded">tip me</button>
</div>
