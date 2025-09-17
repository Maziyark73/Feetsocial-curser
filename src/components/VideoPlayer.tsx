import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Video } from '../types';
import { useStore } from '../store/useStore';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  onVideoEnd?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isActive, onVideoEnd }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isPlaying, setIsPlaying, volume, setVolume } = useStore();

  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
    }
  }, [isActive, setIsPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeToggle = () => {
    setVolume(volume > 0 ? 0 : 1);
  };

  const handleVideoEnd = () => {
    onVideoEnd?.();
  };

  return (
    <div 
      className="relative w-full h-screen bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={video.url}
        width="100%"
        height="100%"
        playing={isActive && isPlaying}
        volume={volume}
        onEnded={handleVideoEnd}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload nofullscreen noremoteplayback',
              disablePictureInPicture: true,
            },
          },
        }}
      />
      
      {/* Video Overlay Controls */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={handlePlayPause}
          className={`action-button bg-black/50 text-white transition-opacity duration-200 ${
            isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {isPlaying ? (
            <Pause size={48} />
          ) : (
            <Play size={48} />
          )}
        </button>
      </div>

      {/* Volume Control */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleVolumeToggle}
          className="action-button bg-black/50 text-white"
        >
          {volume > 0 ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      {/* Video Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-between items-end">
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">
              {video.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>{video.views.toLocaleString()} views</span>
              <span>•</span>
              <span>{new Date(video.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
