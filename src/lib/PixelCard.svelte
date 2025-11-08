<script lang="ts">
  export let className: string = '';
  export let glow: boolean = false;
  export let pulse: boolean = false;
</script>

<div 
  class="bg-pixel-dark border-4 border-pixel-orange rounded-none shadow-pixel transition-all duration-300 hover:shadow-pixel-glow {className}"
  class:animate-pixel-pulse={pulse}
  class:shadow-pixel-glow={glow}
>
  <slot />
</div>

<style>
  /* Custom pixel-style border effect */
  div {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
</style>