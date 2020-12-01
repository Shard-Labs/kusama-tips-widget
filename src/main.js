import Widget from "./Widget.svelte";

export const bind = ({ target, beneficiary }) => {
  return new Widget({ target, props: { beneficiary } });
};
