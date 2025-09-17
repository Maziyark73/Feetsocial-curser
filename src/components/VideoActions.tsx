import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { Video } from '../types';
import { useStore } from '../store/useStore';
import CommentsModal from './CommentsModal';
import toast from 'react-hot-toast';

interface VideoActionsProps {
  video: Video;
}

const VideoActions: React.FC<VideoActionsProps> = ({ video }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { likeVideo, unlikeVideo, shareVideo } = useStore();

  const handleLike = () => {
    if (isLiked) {
      // Unlike - decrease like count
      unlikeVideo(video.id);
      setIsLiked(false);
      toast.success('Unliked!');
    } else {
      // Like - increase like count
      likeVideo(video.id);
      setIsLiked(true);
      toast.success('Liked!');
    }
  };

  const handleShare = () => {
    shareVideo(video.id);
    
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  return (
    <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
      {/* User Avatar */}
      <div className="relative">
        <img
          src={video.user.avatar}
          alt={video.user.username}
          className="w-12 h-12 rounded-full border-2 border-white object-cover"
        />
        {video.user.verified && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>

      {/* Like Button */}
      <button
        onClick={handleLike}
        className={`action-button ${isLiked ? 'text-primary-500' : 'text-white'}`}
      >
        <Heart size={32} fill={isLiked ? 'currentColor' : 'none'} />
        <span className="text-sm font-semibold">
          {video.likes.toLocaleString()}
        </span>
      </button>

      {/* Comment Button */}
      <button 
        onClick={() => setShowComments(true)}
        className="action-button text-white"
      >
        <MessageCircle size={32} />
        <span className="text-sm font-semibold">
          {video.comments.toLocaleString()}
        </span>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="action-button text-white"
      >
        <Share size={32} />
        <span className="text-sm font-semibold">
          {video.shares.toLocaleString()}
        </span>
      </button>

      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className={`action-button ${isBookmarked ? 'text-yellow-500' : 'text-white'}`}
      >
        <Bookmark size={32} fill={isBookmarked ? 'currentColor' : 'none'} />
      </button>

      {/* More Options */}
      <button className="action-button text-white">
        <MoreHorizontal size={32} />
      </button>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        video={video}
      />
    </div>
  );
};

export default VideoActions;
