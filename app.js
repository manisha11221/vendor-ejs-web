

// server.js

const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const vendorRoutes = require('./routes/vendorRoutes')
const techRoutes = require('./routes/techRoutes')
const devroutes = require('./routes/developerRoutes')

const app = express();
const port = 3000;

// Connect to MongoDB
const connectDB = require('./db/conn');

app.use(bodyParser.json()); // Make sure this line is present

// Use admin routes
app.use('/admin', adminRoutes);

// Use vendor routes
app.use('/vendor', vendorRoutes);

//Use Tech routes
app.use('/technology', techRoutes)

//Use developer routes
app.use('/developer',devroutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
