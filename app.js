

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const vendorRoutes = require('./routes/vendorRoutes')
const techRoutes = require('./routes/techRoutes')
const devroutes = require('./routes/developerRoutes')
const ejsRoute  =require('./routes/homeEjsRoute')
const cors = require('cors');


const app = express();
const port = 3000;
// Use cors middleware
app.use(cors());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');


// Serve static files from the 'public' directory
app.use(express.static('public'));


// Define a simple route
// app.get('/', (req, res) => {
//   res.render('index', { title: 'Node.js EJS Template' });
// });

// app.get('/admin-login', (req, res) => {
//   res.render('admin-login', { title: 'Node.js EJS Template' });
// });

app.use(ejsRoute.routes);

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
