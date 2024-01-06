require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log('Hello World');

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// })

app.use((req, res, next) => {
  const message = `${req.method} ${req.path} - ${req.ip}`;
  console.log(message);
  next();
});

app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

absolutePath = __dirname + '/views/index.html';
middlewarePath = __dirname + '/public';

app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

app.use('/public', express.static(middlewarePath));

app.get('/json', (req, res) => {
  let response = 'Hello json';

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ message: response.toUpperCase() });
  } else {
    res.json({ message: response });
  }
});

app.get('/:word/echo', (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});

app
  .route('/name')
  .get((req, res) => {
    const { first, last } = req.query;
    const fullName = `${first} ${last}`;
    res.json({ name: fullName });
  })
  .post((req, res) => {
    const fullName = `${req.body.first} ${req.body.last}`;
    res.json({ name: fullName });
  });

module.exports = app;
