import type { Winner, LeaderboardStats } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export class LeaderboardAPI {
  static async getLeaderboard(limit: number = 50): Promise<Winner[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leaderboard?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const winners = await response.json();
      
      // Convert date strings back to Date objects
      const processedWinners = winners.map((winner: any) => ({
        ...winner,
        _id: winner._id?.toString() || winner._id,
        createdAt: new Date(winner.createdAt),
        lastUpdated: new Date(winner.lastUpdated),
        completedPaths: winner.completedPaths?.map((path: any) => ({
          ...path,
          completedAt: new Date(path.completedAt)
        })) || []
      }));

      return processedWinners;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Return mock data for development
      return this.getMockData();
    }
  }

  static async getStats(): Promise<LeaderboardStats> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/winners?stats=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const stats = data.statistics;
      
      if (stats) {
        return {
          totalParticipants: stats.totalWinners || 0,
          highestScore: stats.maxPoints || 0,
          mostPaths: stats.maxPaths || 0
        };
      }

      // Fallback: calculate from winners list
      const leaders = await this.getLeaderboard(50);
      return {
        totalParticipants: leaders.length,
        highestScore: Math.max(...leaders.map(l => l.totalPoints || 0), 0),
        mostPaths: Math.max(...leaders.map(l => l.completedPaths?.length || 0), 0)
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        totalParticipants: 0,
        highestScore: 0,
        mostPaths: 0
      };
    }
  }

  private static getMockData(): Winner[] {
    // Mock data for development/fallback
    return [
      {
        _id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        completedPaths: [
          { path: 'path-1', points: 100, completedAt: new Date('2024-11-01') },
          { path: 'path-2', points: 150, completedAt: new Date('2024-11-02') },
          { path: 'path-3', points: 200, completedAt: new Date('2024-11-03') },
        ],
        totalPoints: 450,
        createdAt: new Date('2024-11-01'),
        lastUpdated: new Date('2024-11-03')
      },
      {
        _id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        completedPaths: [
          { path: 'path-1', points: 100, completedAt: new Date('2024-11-01') },
          { path: 'path-2', points: 150, completedAt: new Date('2024-11-02') },
        ],
        totalPoints: 250,
        createdAt: new Date('2024-11-01'),
        lastUpdated: new Date('2024-11-02')
      },
      {
        _id: '3',
        name: 'Carol Davis',
        email: 'carol@example.com',
        completedPaths: [
          { path: 'path-1', points: 100, completedAt: new Date('2024-11-01') },
        ],
        totalPoints: 100,
        createdAt: new Date('2024-11-01'),
        lastUpdated: new Date('2024-11-01')
      }
    ];
  }
}