export interface PathCompletion {
  path: string;
  points: number;
  completedAt: Date;
}

export interface Winner {
  _id?: string;
  name: string;
  email: string;
  completedPaths: PathCompletion[];
  totalPoints: number;
  createdAt: Date;
  lastUpdated: Date;
}

export interface LeaderboardStats {
  totalParticipants: number;
  highestScore: number;
  mostPaths: number;
}