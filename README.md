# EventBook - Event Booking System MVP

A full-stack event booking system built with React and Node.js, designed for the Indian market with modern UI and core booking functionality.

## 🚀 Features

### Core Functionality
- **Event Discovery**: Browse and search events by city, category, and keywords
- **User Authentication**: Secure registration and login system
- **Event Booking**: Book tickets with multiple ticket types and quantities
- **My Bookings**: View and manage your event bookings
- **Real-time Updates**: Live seat availability and booking confirmations

### UI/UX Features
- **Modern Design**: Clean, responsive design with Tailwind CSS
- **Mobile-First**: Optimized for mobile devices and tablets
- **Interactive Elements**: Smooth animations and hover effects
- **Indian Market Focus**: ₹ currency, Indian cities, and date formats

### Additional Pages
- **About Us**: Company information and team details
- **Contact**: Contact form and company information

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

## 📁 Project Structure

```
event-booking-mvp/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventCard.js
│   │   │   └── Header.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   ├── EventDetails.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── MyBookings.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-booking-mvp
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install Tailwind CSS**
   ```bash
   npx tailwindcss init -p
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the Frontend Application**
   ```bash
   cd frontend
   npm start
   ```
   The app will run on `http://localhost:3000`

## 📊 Sample Data

The application comes with pre-loaded sample events:

1. **Mumbai Music Festival 2024** - Music event with multiple ticket types
2. **Delhi Comedy Night** - Comedy show with premium seating
3. **Bangalore Tech Conference 2024** - Tech conference with corporate packages

## 🔐 Authentication

### Demo Credentials
For testing purposes, you can register a new account or use these sample credentials:
- **Email**: demo@example.com
- **Password**: password123

## 🎨 Design System

### Colors
- **Primary**: Red shades (#ef4444, #dc2626, #b91c1c)
- **Gray**: Various gray shades for text and backgrounds
- **Accent Colors**: Green for success, Blue for info, Red for errors

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with mobile menu

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full layout with sidebar booking
- **Tablet**: Adapted layout with touch-friendly elements
- **Mobile**: Mobile-first design with collapsible navigation

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Events
- `GET /api/events` - Get all events (with filters)
- `GET /api/events/:id` - Get event by ID
- `GET /api/categories` - Get event categories
- `GET /api/cities` - Get cities

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to:
- **Vercel**: Automatic deployments from Git
- **Netlify**: Static site hosting
- **AWS S3**: With CloudFront CDN

### Backend Deployment
The backend can be deployed to:
- **Heroku**: Easy Node.js deployment
- **Railway**: Modern cloud platform
- **AWS EC2**: Full server control

## 🔮 Future Enhancements

### Phase 2 Features
- **Payment Integration**: Razorpay, Stripe, UPI
- **Email Notifications**: Booking confirmations
- **SMS Integration**: OTP verification
- **Social Login**: Google, Facebook authentication
- **Event Reviews**: User ratings and comments

### Phase 3 Features
- **Admin Dashboard**: Event management portal
- **Analytics**: Booking analytics and reports
- **Multi-language**: Hindi and regional language support
- **PWA**: Progressive Web App capabilities
- **Push Notifications**: Event reminders

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** - High-quality event images
- **Lucide** - Beautiful icon library
- **Tailwind CSS** - Utility-first CSS framework
- **React Community** - For the amazing ecosystem

---

**Built with ❤️ for the Indian event industry**
