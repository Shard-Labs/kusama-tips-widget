<script>
  import "./main.css";

  let btn = document.getElementById("btnOverlay");
  let overlay = document.getElementById("widget");

  function toggleOverlay() {
    btn.addEventListener("click", function () {
      overlay.style.display = "block";
    });
    overlay.addEventListener("click", function () {
      overlay.style.display = "none";
    });
  }

window.onload = toggleOverlay;
  
</script>

<section>
  <div>
    <button
      on:click={toggleOverlay}
      id="btnOverlay"
      class="inline-block bg-blue-500 py-2 px-6 m-auto text-gray-100 uppercase
        text-lg rounded">tip me</button>
  </div>

  <div
    id="widget"
    class="fixed inset-0 flex hidden overflow-hidden w-screen h-screen z-50 bg-black
      bg-opacity-50 transition-opacity duration-200" />
</section>
