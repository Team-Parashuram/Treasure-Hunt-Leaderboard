<script lang="ts">
  import type { Winner } from './types';
  import PixelCard from './PixelCard.svelte';

  export let leaders: Winner[];

  function getRankEmoji(rank: number): string {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  }

  function getRankColor(rank: number): string {
    if (rank === 1) return 'text-pixel-gold font-bold text-2xl animate-pixel-glow';
    if (rank === 2) return 'text-gray-300 font-bold text-xl';
    if (rank === 3) return 'text-pixel-orange font-bold text-xl';
    return 'text-gray-500';
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
</script>

<PixelCard className="overflow-hidden" glow={true}>
  <!-- Table Header -->
  <div class="border-b-4 border-pixel-orange bg-pixel-darker px-6 py-4">
    <div class="grid grid-cols-12 gap-4 font-bold text-xs uppercase tracking-wider font-pixel">
      <div class="col-span-1 text-center">Rank</div>
      <div class="col-span-4">Name</div>
      <div class="col-span-2 text-center">Paths</div>
      <div class="col-span-3 text-center">Points</div>
      <div class="col-span-2 text-center">Date</div>
    </div>
  </div>

  <!-- Table Body -->
  <div class="divide-y divide-gray-700">
    {#if leaders.length === 0}
      <div class="px-6 py-12 text-center text-gray-400">
        <p class="text-xl font-pixel">No one completed yet!</p>
        <p class="mt-2">Be the first! 🚀</p>
      </div>
    {:else}
      {#each leaders as winner, index}
        {@const rank = index + 1}
        <div
          class="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-pixel-dark transition-all border-b border-gray-800 last:border-b-0"
          class:bg-pixel-dark={rank <= 3}
          class:shadow-pixel-glow={rank <= 3}
        >
          <!-- Rank -->
          <div class="col-span-1 text-center {getRankColor(rank)} flex items-center justify-center font-pixel">
            {getRankEmoji(rank)}
          </div>

          <!-- Name -->
          <div class="col-span-4 flex items-center">
            <span class="font-semibold font-pixel" class:text-lg={rank <= 3} class:animate-pixel-glow={rank <= 3}>
              {winner.name}
            </span>
          </div>

          <!-- Paths Completed -->
          <div class="col-span-2 text-center flex items-center justify-center">
            <div class="flex items-center gap-2">
              <span class="text-pixel-orange text-lg font-pixel">
                {winner.completedPaths?.length || 0}
              </span>
              <span class="text-gray-400 text-sm font-pixel">/ 8</span>
            </div>
          </div>

          <!-- Total Points -->
          <div class="col-span-3 text-center flex items-center justify-center">
            <div class="border-2 border-pixel-green bg-pixel-green bg-opacity-20 px-4 py-2 shadow-pixel hover:shadow-pixel-green-glow transition-all">
              <span class="font-bold text-lg text-pixel-green font-pixel">
                {winner.totalPoints || 0}
              </span>
              <span class="text-sm ml-1 text-gray-300 font-pixel">pts</span>
            </div>
          </div>

          <!-- Last Activity -->
          <div class="col-span-2 text-center text-gray-400 text-xs flex items-center justify-center font-pixel">
            {winner.lastUpdated ? formatDate(winner.lastUpdated) : 'N/A'}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</PixelCard>