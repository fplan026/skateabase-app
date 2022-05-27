let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dbConfig = require('./db/database');

//swagger setup for API documentation
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Skateabase',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from a MongoDB database.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Fran Plancke',
      url: 'https://github.com/fplan026/skateabase-app',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then((x) => {
  console.log(`Database "${x.connections[0].name}" connected`)
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
//API defs
const renterRoute = require('./routes/renter.route')
const skateRoute = require('./routes/skate.route')

app.use('/api', renterRoute)
app.use('/api', skateRoute)
//serve swagger to the /docs endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//create port
const port = process.env.PORT || 4000;
//conect to port
const server = app.listen(port, () => {
  console.log('Port connected to: ' + port)
})
//find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});
//index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint: ');
});
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
// Static build location
app.use(express.static(path.join(__dirname, 'dist')));