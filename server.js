const express = require('express');
const testRoutes = require('./Routes/testRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const messageRoutes = require('./Routes/messageRoutes');
const userRoutes = require('./Routes/userRoutes');
const companyRoutes = require('./Routes/companyRoutes');
const taskRoutes = require('./Routes/taskRouter');
const financeRoutes=require('./Routes/financialRouter')
const leaveRoutes=require('./Routes/leaveRoutes');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Allow credentials and specify allowed origins
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Token verification middleware
const verifyToken = (req, res, next) => {
  if (
    req.path === '/user/login' ||
    req.path === '/user/register' ||
    req.path === '/company/'
  ) {
    return next();
  }

  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

app.use(verifyToken);

// Routes
app.use('/tests', testRoutes);
app.use('/events', eventRoutes);
app.use('/messages', messageRoutes);
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/task', taskRoutes);
app.use('/finance', financeRoutes);
app.use('/leaves', leaveRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
