import React from 'react';
import VideoPlayer from './VideoPlayer';
import VideoActions from './VideoActions';
import VideoInfo from './VideoInfo';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onVideoEnd?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isActive, onVideoEnd }) => {
  return (
    <div className="relative w-full h-screen snap-start">
      <VideoPlayer
        video={video}
        isActive={isActive}
        onVideoEnd={onVideoEnd}
      />
      <VideoActions video={video} />
      <VideoInfo video={video} />
    </div>
  );
};

export default VideoCard;
