<script lang="ts">
  import PixelCard from './PixelCard.svelte';
  
  export let value: number;
  export let label: string;
  export let color: 'gold' | 'green' | 'orange' = 'gold';
  export let delay: string = '0s';

  const colorClasses = {
    gold: 'text-pixel-gold',
    green: 'text-pixel-green',
    orange: 'text-pixel-orange'
  };
</script>

<PixelCard className="text-center" pulse={true}>
  <div class="pt-6 pb-6" style="animation-delay: {delay}">
    <div class="text-3xl font-bold font-pixel animate-pixel-glow {colorClasses[color]}">
      {value}
    </div>
    <div class="text-gray-400 mt-1 text-sm font-pixel">
      {label}
    </div>
  </div>
</PixelCard>