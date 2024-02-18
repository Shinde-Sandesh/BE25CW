const express = require('express');
const app = express();

const carsRouter = require('./cars.router');

app.use(express.json());

const loggerMiddleware = (req, res, next) => {
  console.log('Incoming request at:', new Date().toISOString());
  next(); // Call next to move to the next middleware or route handler
};

app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use('/cars', carsRouter);

function checkAuthentication(req) {
  return req.headers.authorization === 'Bearer validAuthToken'
}

// Route-specific middleware for authentication
const authenticateMiddleware = (req, res, next) => {
  const isAuthenticated = checkAuthentication(req); // Implement your authentication logic

  if (isAuthenticated) {
    next() // Proceed to the next middleware or route handler
  } else {
    res.status(401).json({ error: 'Unauthorized' }) // Return unauthorized error
  }
}

// Applying middleware to a specific route
app.post('/secure-action', authenticateMiddleware, (req, res) => {
  res.json({ message: 'Secure action executed successfully' })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});