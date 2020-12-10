<script>
  export let items = [];
  export let selectedIndex = 0;

  const handleClick = (index) => () => (selectedIndex = index);
</script>

<ul class="flex mb-4">
  {#each items as item, i}
    <li
      class="bg-white flex-1 text-dark border-b-2"
      class:border-accent={i == selectedIndex}>
      <span
        class="text-center block px-4 py-2 cursor-pointer"
        on:click={handleClick(i)}>
        {item.label}
      </span>
    </li>
  {/each}
</ul>

<svelte:component this={items[selectedIndex].component} />
