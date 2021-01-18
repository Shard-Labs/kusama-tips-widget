<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");

  /**
   * Close modal on Escape
   * @param e
   */
  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="ksm-fixed ksm-w-screen ksm-h-screen ksm-inset-0 ksm-flex
    ksm-items-center ksm-justify-center ksm-bg-black ksm-bg-opacity-50 ksm-p-0
    ksm-m-0"
  style="z-index: 999">
  <div
    role="dialog"
    aria-modal="true"
    class="ksm-h-full ksm-w-full md:ksm-h-auto md:ksm-max-w-xl ksm-rounded
      ksm-shadow-md ksm-bg-background">
    <div
      class="ksm-px-8 ksm-py-6 ksm-flex ksm-justify-between ksm-items-center
        ksm-bg-white">
      <div class="ksm-flex ksm-items-center">
        <img
          class="ksm-w-6 ksm-h-6 ksm-mr-2 ksm-rounded-full"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDEgNDQxIj48ZGVmcz48c3R5bGU+LmNscy0xe3N0cm9rZTojMDAwO3N0cm9rZS1taXRlcmxpbWl0OjEwfS5jbHMtMntmaWxsOiNmZmZ9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmt1c2FtYS1rc20tbG9nbzwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0uNS41aDQ0MHY0NDBILjV6Ii8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzczLjYgMTI3LjRjLTUuMi00LjEtMTEuNC05LjctMjIuNy0xMS4xLTEwLjYtMS40LTIxLjQgNS43LTI4LjcgMTAuNHMtMjEuMSAxOC41LTI2LjggMjIuNy0yMC4zIDguMS00My44IDIyLjItMTE1LjcgNzMuMy0xMTUuNyA3My4zbDI0IC4zLTEwNyA1NS4xSDYzLjZMNDguMiAzMTJzMTMuNiAzLjYgMjUtMy42djMuM3MxMjcuNC01MC4yIDE1Mi0zNy4ybC0xNSA0LjRjMS4zLjAgMjUuNSAxLjYgMjUuNSAxLjZhMzQuMzQgMzQuMzQuMCAwIDAgMTUuNCAyNC44YzE0LjYgOS42IDE0LjkgMTQuOSAxNC45IDE0LjlzLTcuNiAzLjEtNy42IDdjMCAwIDExLjItMy40IDIxLjYtMy4xYTgyLjY0IDgyLjY0LjAgMCAxIDE5LjUgMy4xcy0uOC00LjItMTAuOS03LTIwLjEtMTMuOC0yNS0xOS44YTI4IDI4IDAgMCAxLTQuMS0yNy40YzMuNS05LjEgMTUuNy0xNC4xIDQwLjktMjcuMSAyOS43LTE1LjQgMzYuNS0yNi44IDQwLjctMzUuN3MxMC40LTI2LjYgMTMuOS0zNC45YzQuNC0xMC43IDkuOC0xNi40IDE0LjMtMTkuOHMyNC41LTEwLjkgMjQuNS0xMC45UzM3OC41IDEzMS4zIDM3My42IDEyNy40eiIvPjwvZz48L2c+PC9zdmc+"
          alt="" />
        <slot name="header" />
      </div>
      <button on:click={close}>
        <svg
          class="ksm-w-8 ksm-h-8 ksm-h-wull ksm-fill-current ksm-text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"><g data-name="Layer 2">
            <path
              d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 000 1.42 1 1 0 001.42 0l4.29-4.3 4.29 4.3a1 1 0 001.42 0 1 1 0 000-1.42z"
              data-name="close" />
          </g></svg>
      </button>
    </div>
    <hr />
    <div id="content" class="ksm-p-8">
      <slot name="content" />
    </div>
  </div>
</div>
