export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  followers: number;
  following: number;
  likes: number;
  verified: boolean;
  bio?: string;
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description?: string;
  duration: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  user: User;
  hashtags: string[];
  music?: {
    title: string;
    artist: string;
    cover: string;
  };
}

export interface Comment {
  id: string;
  text: string;
  user: User;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface FeedState {
  videos: Video[];
  currentIndex: number;
  isLoading: boolean;
  hasMore: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
