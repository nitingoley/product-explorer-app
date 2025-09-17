# Interactive Data Explorer

A full-stack web application for browsing, filtering, and viewing product details from the DummyJSON API.

## Features

- **Product Grid**: Responsive grid layout displaying product cards with images, titles, and prices
- **Product Details**: Modal view with comprehensive product information
- **Filtering**: Filter products by category
- **Sorting**: Sort products by price (ascending/descending) and title (A-Z/Z-A)
- **Animations**: GSAP animations for card appearances, hover effects, and modal transitions
- **Caching**: Backend proxy with in-memory caching to reduce API calls
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- GSAP (animations)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- Node Cache (caching)
- CORS

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```bash
   npm run install:all