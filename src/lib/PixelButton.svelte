<script lang="ts">
  export let className: string = '';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let variant: 'primary' | 'secondary' | 'success' = 'primary';
  export let href: string | undefined = undefined;
  export let onclick: (() => void) | undefined = undefined;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-pixel-orange border-pixel-orange text-white hover:bg-orange-600',
    secondary: 'bg-pixel-dark border-pixel-orange text-pixel-orange hover:bg-pixel-orange hover:text-white',
    success: 'bg-pixel-green border-pixel-green text-black hover:bg-green-400'
  };

  const baseClasses = 'font-pixel border-4 rounded-none shadow-pixel transition-all duration-300 hover:shadow-pixel-glow hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 active:shadow-none';
</script>

{#if href}
  <a 
    {href}
    class="{baseClasses} {sizeClasses[size]} {variantClasses[variant]} {className} inline-block text-center no-underline"
  >
    <slot />
  </a>
{:else}
  <button 
    class="{baseClasses} {sizeClasses[size]} {variantClasses[variant]} {className}"
    on:click={onclick}
  >
    <slot />
  </button>
{/if}

<style>
  button, a {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
</style>