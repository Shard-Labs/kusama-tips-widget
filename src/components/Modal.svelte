<script>
  import { createEventDispatcher, onDestroy } from "svelte";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");

  let modal;

	const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {      
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}

  export let index;
  export let selected;
</script>

 <svelte:window on:keydown={handle_keydown} />

{#if index === selected}
<div class="relative">
  <div
    id="modal"
    role="dialog"
    aria-modal="true"
    class="absolute w-1/3 inset-x-0 mx-auto rounded shadow-md bg-gray-100
    bg-opacity-100 z-50 ">
    <div id="header" class="px-8 py-6 flex justify-between items-baseline bg-white">
      <slot name="header" />
      <button on:click={close} id="button-close" class=""><i class="fas fa-times"></i></button>
    </div>
    <hr />
    <div id="content">
      <slot name="content" />
    </div>
    <div id="footer" class="px-8 py-6 flex justify-between items-baseline">
      <slot name="footer" />
    </div>
  </div>
</div>
{/if}
