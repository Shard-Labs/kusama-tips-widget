<script>
  export let items = [];
  export let selectedIndex = 0;

  const handleClick = (index) => () => (selectedIndex = index);
</script>

<ul class="ksm-flex ksm-mb-4">
  {#each items as item, i}
    {#if item.enabled}
      <li
      class="ksm-bg-white ksm-flex-1 ksm-text-dark ksm-border-b-2"
      class:ksm-border-accent={i == selectedIndex}>
      <span
        class="ksm-text-center ksm-block ksm-px-4 ksm-py-2 ksm-cursor-pointer"
        on:click={handleClick(i)}>
        {item.label}
      </span>
    </li>
    {:else}
      <li
      class="ksm-bg-white ksm-flex-1 ksm-text-light ksm-border-b-2"
      class:ksm-border-accent={i == selectedIndex}>
      <span
        class="ksm-text-center ksm-block ksm-px-4 ksm-py-2">
        {item.label}
      </span>
    </li>
    {/if}  
  {/each}
</ul>

<svelte:component this={items[selectedIndex].component} />
