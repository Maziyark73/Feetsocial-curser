import { create } from 'zustand';
import { Video, User, Comment, FeedState, AuthState } from '../types';

interface AppState {
  // Feed state
  feed: FeedState;
  setFeed: (feed: Partial<FeedState>) => void;
  addVideos: (videos: Video[]) => void;
  nextVideo: () => void;
  prevVideo: () => void;
  
  // Auth state
  auth: AuthState;
  setAuth: (auth: Partial<AuthState>) => void;
  login: (user: User) => void;
  logout: () => void;
  
  // Video interactions
  likeVideo: (videoId: string) => void;
  unlikeVideo: (videoId: string) => void;
  shareVideo: (videoId: string) => void;
  addComment: (videoId: string, comment: Comment) => void;
  
  // UI state
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Feed state
  feed: {
    videos: [],
    currentIndex: 0,
    isLoading: false,
    hasMore: true,
  },
  
  setFeed: (feed) => set((state) => ({ feed: { ...state.feed, ...feed } })),
  
  addVideos: (videos) => set((state) => ({
    feed: {
      ...state.feed,
      videos: [...state.feed.videos, ...videos],
    },
  })),
  
  nextVideo: () => set((state) => ({
    feed: {
      ...state.feed,
      currentIndex: Math.min(state.feed.currentIndex + 1, state.feed.videos.length - 1),
    },
  })),
  
  prevVideo: () => set((state) => ({
    feed: {
      ...state.feed,
      currentIndex: Math.max(state.feed.currentIndex - 1, 0),
    },
  })),
  
  // Auth state
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  },
  
  setAuth: (auth) => set((state) => ({ auth: { ...state.auth, ...auth } })),
  
  login: (user) => set((state) => ({
    auth: {
      ...state.auth,
      user,
      isAuthenticated: true,
    },
  })),
  
  logout: () => set((state) => ({
    auth: {
      ...state.auth,
      user: null,
      isAuthenticated: false,
    },
  })),
  
  // Video interactions
  likeVideo: (videoId) => set((state) => ({
    feed: {
      ...state.feed,
      videos: state.feed.videos.map((video) =>
        video.id === videoId
          ? { ...video, likes: video.likes + 1 }
          : video
      ),
    },
  })),
  
  unlikeVideo: (videoId) => set((state) => ({
    feed: {
      ...state.feed,
      videos: state.feed.videos.map((video) =>
        video.id === videoId
          ? { ...video, likes: Math.max(0, video.likes - 1) }
          : video
      ),
    },
  })),
  
  shareVideo: (videoId) => set((state) => ({
    feed: {
      ...state.feed,
      videos: state.feed.videos.map((video) =>
        video.id === videoId
          ? { ...video, shares: video.shares + 1 }
          : video
      ),
    },
  })),
  
  addComment: (videoId, comment) => set((state) => ({
    feed: {
      ...state.feed,
      videos: state.feed.videos.map((video) =>
        video.id === videoId
          ? { ...video, comments: video.comments + 1 }
          : video
      ),
    },
  })),
  
  // UI state
  isPlaying: true,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  
  volume: 1,
  setVolume: (volume) => set({ volume }),
}));
