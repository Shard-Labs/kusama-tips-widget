import Widget from "./Widget.svelte";

export const bind = ({ target }) => {
  return new Widget({ target,  });
};