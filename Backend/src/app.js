require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(helmet());

 // Configure CORS for both development and production
const allowedOrigins = [
  'http://localhost:5173',  // Development
  'https://craftopia.vercel.app', // Production (replace with your actual domain)
  'https://*.vercel.app' // All Vercel preview deployments
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const pattern = allowedOrigin.replace(/\*/g, '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowedOrigin === origin;
    })) {
      return callback(null, true);
    }
    
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true           
}));



app.use(express.json({ limit: '2mb' }));

// Health check route for Render
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Craftopia API is running' });
});

// Routes - All routes now use /api prefix for Vercel deployment
const authRoute = require('./routes/authRoute');
app.use('/api/auth', authRoute); 

const customerRoute = require('./routes/customerRoute');
app.use('/api/customer', customerRoute);

const artistRoute = require('./routes/artistRoute');
app.use('/api/artist', artistRoute);

const adminRoute = require('./routes/adminRoute');
app.use('/api/admin', adminRoute);

const productRoute = require('./routes/productRoute');
app.use('/api/product', productRoute);

const categoryRoute = require('./routes/categoryRoute');
app.use('/api/category', categoryRoute);

const customizationRequestRoute = require('./routes/customizationRequestRoute');
app.use('/api/customizationRequest', customizationRequestRoute);

const customizationResponseRoute = require('./routes/customizationResponseRoute');
app.use('/api/customizationResponse', customizationResponseRoute);

const auctionRoute = require('./routes/auctionRoute');
app.use('/api/auction', auctionRoute);

const auctionRequestRoute = require('./routes/auctionRequestRoute');
app.use('/api/auctionRequest', auctionRequestRoute);

const bidRoute = require('./routes/bidRoute');
app.use('/api/bid', bidRoute);

const wishlistRoute = require('./routes/WishlistRoute');
app.use('/api/wishlist', wishlistRoute);

const orderRoute = require('./routes/orderRoute');
app.use('/api/order', orderRoute);

const reviewRoute = require('./routes/reviewRoute');
app.use('/api/review', reviewRoute);

const ratingRoute = require('./routes/ratingRoute');
app.use('/api/rating', ratingRoute);

const msg = require('./routes/messageRoute');
app.use('/api/msg', msg);

const paymentRoute = require('./routes/paymentRoute');
app.use('/api/payment', paymentRoute);

const trackRoute = require('./routes/trackRoute');
app.use('/api/trackSales', trackRoute);

const reportRoute = require('./routes/reportRoute');
app.use('/api/report', reportRoute);

const { startAuctionScheduler } = require('./services/auctionScheduler');
startAuctionScheduler();

const cartRoute = require('./routes/cartRoute');
app.use('/api/mycart', cartRoute);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

const socketService = require('./services/socketService');
socketService.initialize(server);

module.exports = app;