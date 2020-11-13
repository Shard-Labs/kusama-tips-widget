<script>
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul class="flex mx-auto">
  {#each items as item}
    <li class="-mb-px bg-white active:bg-blue-500 w-6/12">
      <span
        class="text-center text-gray-900 active:text-white uppercase border border-solid rounded
        block px-4 py-2 cursor-pointer hover:border-gray-400"
        on:click={handleClick(item.value)}>
        {item.label}
      </span>
    </li>
  {/each}
</ul>
{#each items as item}
  {#if activeTabValue == item.value}
    <div>
      <svelte:component this={item.component} />
    </div>
  {/if}
{/each}
