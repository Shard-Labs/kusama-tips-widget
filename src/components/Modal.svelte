<script>
  import { createEventDispatcher } from "svelte";
  import MultistepModal from "./MultistepModal.svelte";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
</script>

<div class="relative">
  <div
    id="modal"
    role="dialog"
    aria-modal="true"
    class="absolute w-1/3 inset-x-0 mx-auto rounded shadow-md bg-white
    bg-opacity-100 z-50 ">
    <div id="modal-header" class="px-8 py-6 flex justify-between items-baseline">
      <slot id="modal-title" class="text-xl text-gray-900 leading 8" />
      <button on:click={close} id="button-close" class=""><i class="fas fa-times"></i></button>
    </div>
    <hr />
    <div id="modal-body" class=" px-8 py-6">
      <slot />
    </div>
    <div id="modal-footer" class="px-8 py-6 flex">
      <slot />
    </div>
  </div>
</div>
