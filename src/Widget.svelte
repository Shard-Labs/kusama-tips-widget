<script>
  import Modal from "./components/Modal.svelte";
  import "./main.css";

  let showModal = false;

</script>

<div id="wrapper">


  <button
    on:click={() => (showModal = true)}
    id="btnOverlay"
    class="inline-block bg-blue-500 py-2 px-6 m-auto text-gray-100 uppercase
      text-lg rounded">Tip me
  </button>


  {#if showModal}
    <Modal on:close={() => (showModal = false)} />
    <div
      id="widget"
      class="fixed inset-0 flex overflow-hidden w-screen h-screen z-10 bg-black
        bg-opacity-50 transition-opacity duration-200" />
  {/if}
</div>
