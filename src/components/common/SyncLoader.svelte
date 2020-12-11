<style>
  .loader {
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dot {
    height: 12px;
    width: 12px;
    background-color: #e6007a;
    margin: 2px;
    display: inline-block;
    border-radius: 100%;
    animation: sync 0.6s ease-in-out infinite alternate both running;
  }
  @-webkit-keyframes sync {
    33% {
      -webkit-transform: translateY(10px);
      transform: translateY(10px);
    }
    66% {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  @keyframes sync {
    33% {
      -webkit-transform: translateY(10px);
      transform: translateY(10px);
    }
    66% {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
</style>

<div class="loader">
  {#each Array(3) as _, i}
    <div class="dot" style="animation-delay:  {(i + 1) * 0.07}s;" />
  {/each}
</div>
