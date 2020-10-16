<script>
  import Modal from "./components/Modal.svelte";
  import "./main.css";

  let showModal = false;
  
  window.onload = function toggleOverlay() {
  let btn = document.getElementById("btnOverlay");
  let overlay = document.getElementById("widget");
  
    btn.addEventListener("click", function () {
      overlay.style.display = "block";
      btn.style.display = "none";
      showModal = true;
    });
  }
  
</script>

<section>
  <div class="flex place-content-end m-5 p-4">
    <button
      on:click = {toggleOverlay}
      id="btnOverlay"
      class="inline-block bg-blue-500 py-2 px-6 m-auto text-gray-100 uppercase
        text-lg rounded">tip me</button>
  </div>

  {#if showModal}
    <Modal on:close="{() => showModal = false}" />
  {/if}
  <div
    id="widget"
    class="fixed inset-0 flex hidden overflow-hidden w-screen h-screen z-0 bg-black
      bg-opacity-50 transition-opacity duration-200" />
</section>
