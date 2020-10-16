<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');

</script>

<div id="modal" role="dialog" aria-modal="true" class="modal absolute w-40 h-40 right-auto left-auto rounded shadow-md bg-white bg-opacity-100 z-50 " >
  <div class="modal-header flex justify-between items-baseline">
    <slot class="modal-title"></slot>
    <button on:click={close} id="close" class="modal-close">close</button>
  </div>
  <hr>
  <div class="modal-body">
    <slot></slot>
  </div>
  <div class="modal-footer flex">
    <slot></slot>
  </div>
</div>