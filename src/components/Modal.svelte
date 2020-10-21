<script>
  import { createEventDispatcher } from "svelte";
  import MultistepModal from "./MultistepModal.svelte";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
</script>

<div class="modal-continer relative">
  <div
    id="modal"
    role="dialog"
    aria-modal="true"
    class="modal absolute w-1/3 inset-x-0 mx-auto rounded shadow-md bg-white
    bg-opacity-100 z-50 ">
    <div class="modal-header px-8 py-6 flex justify-between items-baseline">
      <slot class="modal-title text-xl text-gray-900 leading 8" />
      <button on:click={close} id="close" class="modal-close ">close</button>
    </div>
    <hr />
    <div class="modal-body px-8 py-6">
      <MultistepModal />
    </div>
    <div class="modal-footer px-8 py-6 flex">
      <slot />
    </div>
  </div>
</div>
