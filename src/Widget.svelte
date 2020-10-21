<script>
  import Modal from "./components/Modal.svelte";
  import "./main.css";

  let showModal = false; 
  
  window.onload = function openOverlay() {
  let btn = document.getElementById("btnOverlay");
  let overlay = document.getElementById("widget");
    btn.addEventListener("click", function () {
      overlay.style.display = "block";
      btn.style.display = "none";
      showModal = true;
    });
  }

  function closeOverlay() {
    let overlay = document.getElementById("widget");
    showModal = false;
    overlay.style.display = "none";
  }
 
  
</script>

<section>
  <div class="flex place-content-end m-5 p-4">
    <button
      on:click = {openOverlay}
      id="btnOverlay"
      class="inline-block bg-blue-500 py-2 px-6 m-auto text-gray-100 uppercase
        text-lg rounded">tip me
    </button>
  </div>

  {#if showModal}
    <Modal on:close={closeOverlay} />
  {/if}
  
  <div
    id="widget"
    class="fixed inset-0 flex hidden overflow-hidden w-screen h-screen z-10 bg-black
      bg-opacity-50 transition-opacity duration-200" />
</section>
