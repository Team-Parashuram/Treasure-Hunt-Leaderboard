<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
</script>

<div class="flex items-center justify-center p-8">
  <div class="relative">
    <div class="{sizeClasses[size]} border-4 border-pixel-orange border-t-transparent rounded-full animate-spin"></div>
    <div class="absolute inset-0 {sizeClasses[size]} border-4 border-transparent border-r-pixel-green rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 0.75s;"></div>
  </div>
  <span class="ml-3 text-pixel-orange font-pixel">Loading leaderboard...</span>
</div>