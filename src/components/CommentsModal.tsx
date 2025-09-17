import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Heart, MoreHorizontal } from 'lucide-react';
import { Video, Comment } from '../types';
import { videoAPI } from '../utils/api';
import toast from 'react-hot-toast';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose, video }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen, video.id]);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const response = await videoAPI.getComments(video.id);
      setComments(response.comments);
    } catch (error) {
      console.error('Failed to load comments:', error);
      // Mock comments for demo
      setComments([
        {
          id: '1',
          text: 'Amazing video! 🔥',
          user: {
            id: 'user1',
            username: 'dancequeen',
            displayName: 'Dance Queen',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNlYzQ4OTkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkREPC90ZXh0Pjwvc3ZnPg==',
            followers: 500000,
            following: 1200,
            likes: 2000000,
            verified: true,
            bio: 'Professional dancer & choreographer'
          },
          createdAt: new Date().toISOString(),
          likes: 10
        },
        {
          id: '2',
          text: 'This is so cool! How did you learn this?',
          user: {
            id: 'user2',
            username: 'artlover',
            displayName: 'Art Lover',
            avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMxMGI5ODEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFMPC90ZXh0Pjwvc3ZnPg==',
            followers: 50000,
            following: 200,
            likes: 100000,
            verified: false,
            bio: 'Art enthusiast'
          },
          createdAt: new Date().toISOString(),
          likes: 5
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await videoAPI.addComment(video.id, newComment);
      
      // Add the new comment to the list
      setComments(prev => [response.comment, ...prev]);
      setNewComment('');
      toast.success('Comment added!');
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center pb-16"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="bg-gray-800 rounded-t-2xl w-full max-w-md h-[70vh] flex flex-col mb-16"
          onClick={(e) => e.stopPropagation()}
          data-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold">
              Comments ({comments.length})
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.username}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm">
                        {comment.user.displayName}
                      </span>
                      {comment.user.verified && (
                        <span className="text-red-500 text-xs">✓</span>
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      {comment.text}
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart size={16} />
                        <span className="text-xs">{comment.likes}</span>
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Comment Input */}
          <div className="p-4 border-t border-gray-700 bg-gray-800 flex-shrink-0">
            <form onSubmit={handleSubmitComment} className="flex space-x-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm text-white placeholder-gray-400"
                disabled={isSubmitting}
                style={{ minHeight: '48px' }}
              />
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white rounded-full transition-colors flex items-center justify-center"
                style={{ minHeight: '48px', minWidth: '48px' }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommentsModal;
