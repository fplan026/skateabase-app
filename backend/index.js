let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./db/database');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)
// Setting up express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
// Api root
const renterRoute = require('./routes/renter.route')
const skateRoute = require('./routes/skate.route')
app.use('/api', renterRoute)
app.use('/api', skateRoute)
// Create port
const port = process.env.PORT || 4000;
// Conectting port
const server = app.listen(port, () => {
    console.log('Port connected to: ' + port)
})
// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});
// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});
// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
// Static build location
app.use(express.static(path.join(__dirname, 'dist')));

// const express = require('express');
// const cors = require('cors');
// const createError = require('http-errors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// // Connect mongoDB
// mongoose
//   .connect('mongodb://127.0.0.1:27017/skateabase')
//   .then((x) => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch((err) => {
//     console.error('Error connecting to mongo', err.reason)
//   })
// const rentalAPI = require('./routes/renter.route', './routes/skate.route')
// const app = express()
// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   }),
// )
// app.use(cors())
// // API
// app.use('/api', rentalAPI)
// // Create port
// const port = process.env.PORT || 4000
// const server = app.listen(port, () => {
//   console.log('Connected to port ' + port)
// })
// // Find 404
// app.use((req, res, next) => {
//   next(createError(404))
// })
// // error handler
// app.use(function (err, req, res, next) {
//   console.error(err.message)
//   if (!err.statusCode) err.statusCode = 500
//   res.status(err.statusCode).send(err.message)
// })