import React, { useState } from 'react';
import { User, Settings, Edit3, Heart, MessageCircle, Share } from 'lucide-react';
import { useStore } from '../store/useStore';

const Profile: React.FC = () => {
  const { auth } = useStore();
  const [activeTab, setActiveTab] = useState<'videos' | 'liked'>('videos');

  // Mock user data
  const user = auth.user || {
    id: '1',
    username: 'demo_user',
    displayName: 'Demo User',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI3NSIgY3k9Ijc1IiByPSI3NSIgZmlsbD0iI2VmNDQ0NCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RFU8L3RleHQ+PC9zdmc+',
    followers: 125000,
    following: 500,
    likes: 2500000,
    verified: true,
    bio: 'Content creator sharing amazing moments!'
  };

  const mockVideos = [
    {
      id: '1',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5WaWRlbzE8L3RleHQ+PC9zdmc+',
      title: 'My latest creation',
      views: 50000,
      likes: 2500,
      duration: '0:30'
    },
    {
      id: '2',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjM2I4MmY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5WaWRlbzI8L3RleHQ+PC9zdmc+',
      title: 'Behind the scenes',
      views: 35000,
      likes: 1800,
      duration: '0:45'
    },
    {
      id: '3',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5WaWRlbzM8L3RleHQ+PC9zdmc+',
      title: 'Tutorial time!',
      views: 75000,
      likes: 4200,
      duration: '1:20'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <div className="sticky top-0 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700 z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Profile</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-dark-800 transition-colors">
              <Settings size={24} />
            </button>
            <button className="p-2 rounded-full hover:bg-dark-800 transition-colors">
              <Edit3 size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex items-start space-x-6 mb-6">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-24 h-24 rounded-full border-4 border-primary-500 object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-2xl font-bold">{user.displayName}</h2>
              {user.verified && (
                <span className="text-primary-500 text-xl">✓</span>
              )}
            </div>
            <p className="text-gray-400 mb-2">@{user.username}</p>
            {user.bio && (
              <p className="text-gray-300 mb-4">{user.bio}</p>
            )}
            
            {/* Stats */}
            <div className="flex space-x-6 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold">{user.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Following</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{user.following.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{user.likes.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Likes</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Edit Profile
              </button>
              <button className="p-2 border border-gray-600 rounded-lg hover:bg-dark-800 transition-colors">
                <Share size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dark-700 mb-6">
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'videos'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'liked'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Liked
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mockVideos.map((video) => (
            <div key={video.id} className="relative group cursor-pointer">
              <div className="aspect-[9/16] bg-dark-800 rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white text-sm font-semibold mb-1">
                      {video.duration}
                    </div>
                    <div className="flex items-center space-x-4 text-white text-sm">
                      <div className="flex items-center space-x-1">
                        <Heart size={16} />
                        <span>{video.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle size={16} />
                        <span>{video.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-semibold mt-2 line-clamp-2">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
