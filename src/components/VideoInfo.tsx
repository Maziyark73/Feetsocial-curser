import React from 'react';
import { Music, Hash } from 'lucide-react';
import { Video } from '../types';

interface VideoInfoProps {
  video: Video;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <div className="flex justify-between items-end">
        <div className="flex-1 pr-20">
          {/* User Info */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-white font-semibold">@{video.user.username}</span>
            {video.user.verified && (
              <span className="text-primary-500 text-sm">✓</span>
            )}
          </div>

          {/* Video Title */}
          <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">
            {video.title}
          </h3>

          {/* Description */}
          {video.description && (
            <p className="text-gray-300 text-sm mb-2 line-clamp-2">
              {video.description}
            </p>
          )}

          {/* Hashtags */}
          {video.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {video.hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="text-primary-400 text-sm font-medium"
                >
                  #{hashtag}
                </span>
              ))}
            </div>
          )}

          {/* Music Info */}
          {video.music && (
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Music size={16} />
              <span className="truncate">
                {video.music.title} - {video.music.artist}
              </span>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
            <span>{video.views.toLocaleString()} views</span>
            <span>•</span>
            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
