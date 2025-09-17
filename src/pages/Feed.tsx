import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoCard from '../components/VideoCard';
import { useStore } from '../store/useStore';
import { Video } from '../types';
import toast from 'react-hot-toast';

const Feed: React.FC = () => {
  const { feed, setFeed, nextVideo, prevVideo } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  const mockVideos: Video[] = [
    {
      id: '1',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EYW5jZSBWaWRlbzwvdGV4dD48L3N2Zz4=',
      title: 'Amazing dance moves! 💃',
      description: 'Just learned this new dance routine and had to share it with you all!',
      duration: 30,
      views: 1250000,
      likes: 45000,
      comments: 1200,
      shares: 800,
      createdAt: '2024-01-15T10:30:00Z',
      user: {
        id: 'user1',
        username: 'dancequeen',
        displayName: 'Dance Queen',
        avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2VjNDg5OSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+REQ8L3RleHQ+PC9zdmc+',
        followers: 500000,
        following: 1200,
        likes: 2000000,
        verified: true,
        bio: 'Professional dancer & choreographer'
      },
      hashtags: ['dance', 'tutorial', 'viral', 'fyp'],
      music: {
        title: 'Trending Beat',
        artist: 'DJ Producer',
        cover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiM4YjVjZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk08L3RleHQ+PC9zdmc+'
      }
    },
    {
      id: '2',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjM2I4MmY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Db29raW5nIFZpZGVvPC90ZXh0Pjwvc3ZnPg==',
      title: 'Cooking hack that will blow your mind! 🍳',
      description: 'This simple trick changed my cooking game forever',
      duration: 45,
      views: 890000,
      likes: 67000,
      comments: 2100,
      shares: 1500,
      createdAt: '2024-01-14T15:45:00Z',
      user: {
        id: 'user2',
        username: 'chefmaster',
        displayName: 'Chef Master',
        avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2Y1OWUwYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q008L3RleHQ+PC9zdmc+',
        followers: 300000,
        following: 800,
        likes: 1500000,
        verified: true,
        bio: 'Professional chef sharing cooking tips'
      },
      hashtags: ['cooking', 'hack', 'food', 'kitchen'],
      music: {
        title: 'Kitchen Vibes',
        artist: 'Cooking Beats',
        cover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNmNTllMGIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk08L3RleHQ+PC9zdmc+'
      }
    },
    {
      id: '3',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BcnQgVmlkZW88L3RleHQ+PC9zdmc+',
      title: 'POV: You discover a hidden talent 🎨',
      description: 'Never thought I could paint until I tried this technique',
      duration: 60,
      views: 2100000,
      likes: 120000,
      comments: 3500,
      shares: 2200,
      createdAt: '2024-01-13T09:20:00Z',
      user: {
        id: 'user3',
        username: 'artistic_soul',
        displayName: 'Artistic Soul',
        avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzEwYjk4MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QVM8L3RleHQ+PC9zdmc+',
        followers: 750000,
        following: 2000,
        likes: 5000000,
        verified: true,
        bio: 'Artist | Creator | Dreamer'
      },
      hashtags: ['art', 'painting', 'talent', 'creative'],
      music: {
        title: 'Creative Flow',
        artist: 'Art Music',
        cover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiMxMGI5ODEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk08L3RleHQ+PC9zdmc+'
      }
    }
  ];

  const loadVideos = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // For now, just use mock data to avoid API issues
      setFeed({ videos: mockVideos, isLoading: false });
      console.log('Loaded mock videos');
    } catch (error) {
      console.error('Failed to load videos:', error);
      setFeed({ videos: mockVideos, isLoading: false });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setFeed]);

  useEffect(() => {
    if (feed.videos.length === 0) {
      loadVideos();
    }
  }, [feed.videos.length, loadVideos]);

  const handleVideoEnd = () => {
    nextVideo();
  };

  const handleScroll = useCallback((e: React.WheelEvent) => {
    // Only handle scroll if no modals are open
    const hasOpenModal = document.querySelector('[data-modal="true"]');
    if (hasOpenModal) return;
    
    e.preventDefault();
    if (e.deltaY > 0) {
      nextVideo();
    } else {
      prevVideo();
    }
  }, [nextVideo, prevVideo]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      nextVideo();
    } else if (e.key === 'ArrowUp') {
      prevVideo();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (feed.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden snap-y snap-mandatory"
      onWheel={handleScroll}
    >
      <AnimatePresence>
        {feed.videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="snap-start"
          >
            <VideoCard
              video={video}
              isActive={index === feed.currentIndex}
              onVideoEnd={handleVideoEnd}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
