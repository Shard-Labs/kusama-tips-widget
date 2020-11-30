import { writable } from "svelte/store";
import { ApiPromise, WsProvider } from "@polkadot/api";

export function createMultistep() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    nextStep: () => update((n) => n + 1),
    previousStep: () => update((n) => n - 1),
    reset: () => set(0),
  };
}

export function createApiProvider() {
  const { subscribe, set, update } = writable(null);

  return {
    subscribe,
    update,
    connect: async () => {
      const provider = new WsProvider("wss://kusama-rpc.polkadot.io/");

      let api = new ApiPromise({ provider });
      await api.isReady;

      let [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version(),
      ]);

      console.log(
        `Connected to chain ${chain} using ${nodeName} v${nodeVersion}`
      );

      set(api);
    },
    clear: () => set(null),
  };
}
