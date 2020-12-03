import Widget from "./Widget.svelte";

export const bind = (target, props) => new Widget({ target, props });
