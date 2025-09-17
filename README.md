# FeetSocial 🦶

A modern social media platform for sharing short videos, built with React, TypeScript, and Node.js. Inspired by TikTok, this app provides a seamless video-sharing experience with real-time interactions.

![FeetSocial Preview](https://via.placeholder.com/800x400/1e293b/ffffff?text=FeetSocial+Preview)

## ✨ Features

### 🎥 Core Features
- **Video Feed** - TikTok-style vertical scrolling video feed
- **Video Upload** - Drag & drop video upload with preview
- **User Interactions** - Like, comment, share, and bookmark videos
- **Comments System** - Real-time commenting with threaded discussions
- **User Profiles** - Complete user profiles with video galleries
- **Responsive Design** - Beautiful UI that works on all devices

### 🚀 Technical Features
- **Modern Stack** - React 18 + TypeScript + Vite
- **State Management** - Zustand for global state
- **Styling** - Tailwind CSS with custom components
- **Animations** - Framer Motion for smooth transitions
- **Backend API** - Node.js + Express with file upload support
- **Error Handling** - Comprehensive error boundaries and validation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/feetsocial.git
   cd feetsocial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   
   **Terminal 1 - Frontend:**
   ```bash
   npm run dev
   ```
   
   **Terminal 2 - Backend:**
   ```bash
   node server.js
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000 (or 3002 if 3000 is busy)
   - Backend API: http://localhost:3001/api

## 📁 Project Structure

```
feetsocial/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── VideoCard.tsx
│   │   ├── VideoActions.tsx
│   │   ├── CommentsModal.tsx
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Feed.tsx
│   │   ├── Profile.tsx
│   │   └── Upload.tsx
│   ├── store/            # State management
│   │   └── useStore.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   └── api.ts
│   └── App.tsx           # Main app component
├── server.js             # Backend server
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
PORT=3001
NODE_ENV=development
```

### API Endpoints

- `GET /api/videos/feed` - Get video feed
- `GET /api/videos/:id` - Get specific video
- `POST /api/videos/upload` - Upload new video
- `POST /api/videos/:id/like` - Like/unlike video
- `POST /api/videos/:id/comments` - Add comment
- `GET /api/videos/:id/comments` - Get comments

## 🎨 Customization

### Styling
The app uses Tailwind CSS with custom color schemes. You can modify the colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'dark-900': '#0f172a',
        'dark-800': '#1e293b',
        'primary-500': '#ef4444',
      }
    }
  }
}
```

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update the store in `src/store/useStore.ts`
4. Add API endpoints in `server.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by TikTok's user interface
- Built with modern web technologies
- Thanks to the open-source community for amazing tools

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy coding! 🚀**