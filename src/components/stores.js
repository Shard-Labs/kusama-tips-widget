import { writable } from "svelte/store";

export function createMultistep() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    nextStep: () => update((n) => n + 1),
    previousStep: () => update((n) => n - 1),
    reset: () => set(0)
  };
};



