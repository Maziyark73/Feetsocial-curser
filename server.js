import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'), false);
    }
  }
});

// Mock data
let videos = [
  {
    id: '1',
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5WaWRlbzE8L3RleHQ+PC9zdmc+',
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
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjM2I4MmY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5WaWRlbzI8L3RleHQ+PC9zdmc+',
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
  }
];

let users = [
  {
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
  {
    id: 'user2',
    username: 'chefmaster',
    displayName: 'Chef Master',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2Y1OWUwYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q008L3RleHQ+PC9zdmc+',
    followers: 300000,
    following: 800,
    likes: 1500000,
    verified: true,
    bio: 'Professional chef sharing cooking tips'
  }
];

// Comments storage
let comments = {
  '1': [
    {
      id: '1',
      text: 'Amazing video! 🔥',
      user: users[0],
      createdAt: new Date().toISOString(),
      likes: 10
    },
    {
      id: '2',
      text: 'This is so cool! How did you learn this?',
      user: users[1],
      createdAt: new Date().toISOString(),
      likes: 5
    }
  ],
  '2': [
    {
      id: '3',
      text: 'Great cooking tip! 👨‍🍳',
      user: users[1],
      createdAt: new Date().toISOString(),
      likes: 8
    }
  ]
};

// Routes

// Get feed videos
app.get('/api/videos/feed', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedVideos = videos.slice(startIndex, endIndex);
  
  res.json({
    videos: paginatedVideos,
    hasMore: endIndex < videos.length,
    total: videos.length,
    page,
    limit
  });
});

// Get video by ID
app.get('/api/videos/:id', (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }
  res.json(video);
});

// Upload video
app.post('/api/videos/upload', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    const { title, description, hashtags } = req.body;
    
    const newVideo = {
      id: (videos.length + 1).toString(),
      url: `/uploads/${req.file.filename}`,
      thumbnail: `https://via.placeholder.com/400x600/ef4444/ffffff?text=Video+${videos.length + 1}`,
      title: title || 'Untitled Video',
      description: description || '',
      duration: 30, // In real app, you'd extract this from the video
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      user: users[0], // Mock user
      hashtags: hashtags ? hashtags.split(' ').filter(tag => tag.startsWith('#')) : [],
      music: {
        title: 'Default Music',
        artist: 'Unknown Artist',
        cover: 'https://via.placeholder.com/50x50/8b5cf6/ffffff?text=M'
      }
    };

    videos.unshift(newVideo);
    res.json(newVideo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

// Like video
app.post('/api/videos/:id/like', (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }
  
  video.likes += 1;
  res.json({ likes: video.likes });
});

// Share video
app.post('/api/videos/:id/share', (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }
  
  video.shares += 1;
  res.json({ shares: video.shares });
});

// Add comment
app.post('/api/videos/:id/comments', (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }
  
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Comment text is required' });
  }
  
  const newComment = {
    id: Date.now().toString(),
    text: text.trim(),
    user: users[0], // Mock current user
    createdAt: new Date().toISOString(),
    likes: 0
  };
  
  // Initialize comments array for video if it doesn't exist
  if (!comments[req.params.id]) {
    comments[req.params.id] = [];
  }
  
  comments[req.params.id].unshift(newComment);
  video.comments += 1;
  
  res.json({ 
    comment: newComment,
    comments: video.comments 
  });
});

// Get comments
app.get('/api/videos/:id/comments', (req, res) => {
  const videoComments = comments[req.params.id] || [];
  res.json({ comments: videoComments });
});

// User routes
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Mock authentication
  res.json({
    user: users[0],
    token: 'mock-jwt-token'
  });
});

app.post('/api/auth/register', (req, res) => {
  const { username, displayName, email, password } = req.body;
  
  const newUser = {
    id: (users.length + 1).toString(),
    username,
    displayName,
    avatar: 'https://via.placeholder.com/100x100/ef4444/ffffff?text=U',
    followers: 0,
    following: 0,
    likes: 0,
    verified: false,
    bio: ''
  };
  
  users.push(newUser);
  res.json({
    user: newUser,
    token: 'mock-jwt-token'
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json(users[0]);
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
