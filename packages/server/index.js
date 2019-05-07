// 'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const app = express();
const router = express.Router();

// https://stackoverflow.com/questions/24543847/req-body-empty-on-posts
// https://github.com/expressjs/body-parser#limit
// > Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'.
app.use(bodyParser.json( { limit: '50MB' } ));

app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 5000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
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
// TODO: status should probably not always return ok?
// eg if server is failing/crashed should return something else
// so that the instance can be terminated? or is not necessary to do this explicitly?
require('./routes/status.js')(app);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  