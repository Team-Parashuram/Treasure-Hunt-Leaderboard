<script lang="ts">
  import { onMount } from 'svelte';
  import type { Winner, LeaderboardStats } from './lib/types';
  import { LeaderboardAPI } from './lib/api';
  import LeaderboardTable from './lib/LeaderboardTable.svelte';
  import StatsCard from './lib/StatsCard.svelte';
  import PixelButton from './lib/PixelButton.svelte';
  import LoadingSpinner from './lib/LoadingSpinner.svelte';

  let leaders: Winner[] = [];
  let stats: LeaderboardStats = {
    totalParticipants: 0,
    highestScore: 0,
    mostPaths: 0
  };
  let loading = true;
  let error = '';

  async function loadLeaderboard() {
    try {
      loading = true;
      error = '';
      
      const [leaderboardData, statsData] = await Promise.all([
        LeaderboardAPI.getLeaderboard(50),
        LeaderboardAPI.getStats()
      ]);
      
      leaders = leaderboardData;
      stats = statsData;
    } catch (err) {
      error = 'Failed to load leaderboard data';
      console.error('Error loading leaderboard:', err);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadLeaderboard();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadLeaderboard, 30000);
    
    return () => {
      clearInterval(interval);
    };
  });
</script>

<main class="min-h-screen bg-pixel-darker text-white p-8 relative pixel-grid">
  <!-- Scanlines overlay -->
  <div class="fixed inset-0 pointer-events-none pixel-scanlines"></div>
  
  <div class="max-w-6xl mx-auto relative z-10">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 text-pixel-gold font-pixel animate-pixel-glow">
        🏆 Hall of Fame
      </h1>
      <p class="text-gray-300 text-lg font-pixel">
        Top hackers who conquered the treasure hunt
      </p>
      <div class="pixel-divider max-w-md mx-auto mt-6"></div>
    </div>

    {#if loading}
      <LoadingSpinner size="lg" />
    {:else if error}
      <div class="text-center py-12">
        <p class="text-red-400 text-xl font-pixel mb-4">⚠️ {error}</p>
        <PixelButton onclick={loadLeaderboard}>
          Retry Loading
        </PixelButton>
      </div>
    {:else}
      <!-- Leaderboard Table -->
      <div class="mb-8">
        <LeaderboardTable {leaders} />
      </div>

      <!-- Stats Footer -->
      {#if leaders.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            value={stats.totalParticipants}
            label="Total Participants"
            color="gold"
            delay="0s"
          />
          
          <StatsCard 
            value={stats.highestScore}
            label="Highest Score"
            color="green"
            delay="0.2s"
          />
          
          <StatsCard 
            value={stats.mostPaths}
            label="Most Paths"
            color="orange"
            delay="0.4s"
          />
        </div>
      {/if}

      <!-- Action Buttons -->
      <div class="text-center space-x-4">
        <PixelButton onclick={loadLeaderboard}>
          🔄 Refresh
        </PixelButton>
        
        <PixelButton href="/" variant="secondary">
          🏠 Back to Game
        </PixelButton>
      </div>
    {/if}

    <!-- Footer -->
    <footer class="mt-16 text-center text-gray-500 font-pixel">
      <div class="pixel-divider max-w-xs mx-auto mb-4"></div>
      <p>
        🎮 Treasure Hunt Leaderboard • Last updated: {new Date().toLocaleTimeString()}
      </p>
    </footer>
  </div>
</main>
