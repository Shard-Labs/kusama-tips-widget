import Widget from "./Widget.svelte";

/**
 * Function used to bind the widget to a given target
 * @param {*} target 
 * @param {*} props 
 */
export const bind = (target, props) => new Widget({ target, props });
