// 'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const app = express();
const router = express.Router()
app.use(bodyParser.json());
const port = 5000;


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// TODO: Add API versioning, and change "SDK" React client side

  
// list all available rotues
app.get('/', (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const results = [];
    // https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express/14934933
    app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
            results.push({ 
              path: r.route.path, 
              url: url.resolve(fullUrl, r.route.path),
              methods: r.route.methods 
            })
        }
      })
    res.json({response: results})
})

// Routes
require('./routes/projects.js')(app);
require('./routes/paperedits.js')(app);
require('./routes/transcripts.js')(app);
require('./routes/labels.js')(app);
require('./routes/annotations.js')(app);
require('./routes/users.js')(app);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  