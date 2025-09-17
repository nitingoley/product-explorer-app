# Product Explorer App

A modern, full-stack web application that provides an intuitive interface for exploring and managing product data through the DummyJSON API. View the live demo at [Product Explorer](https://product-explorer-app-2yx1.vercel.app/).

## ✨ Key Features

- **Interactive Product Grid**
  - Responsive masonry layout
  - Smooth loading animations
  - Hover effects with GSAP
  - Product cards with image previews

- **Advanced Filtering & Sorting**
  - Category-based filtering
  - Multi-parameter sorting
  - Price range filtering
  - Real-time search functionality

- **Performance Optimizations**
  - Server-side caching
  - Lazy loading images
  - Optimized API requests
  - Client-side data persistence

- **Responsive Design**
  - Mobile-first approach
  - Tablet & desktop layouts
  - Accessible interface
  - Touch-friendly interactions

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- GSAP Animations
- Axios

### Backend
- Node.js
- Express.js
- Node Cache
- CORS middleware

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn package manager
- Git

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/nitingoley/product-explorer-app.git
   cd product-explorer-app
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_API_URL=http://localhost:5000

   # Backend (.env)
   PORT=5000
   ALLOWED_ORIGINS=http://localhost:3000
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server (new terminal)
   cd frontend
   npm run dev
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run test suite

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
