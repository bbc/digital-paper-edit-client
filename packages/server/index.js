// const express = require('express');
// const graphqlHTTP = require('express-graphql');

// const {schema} = require('./schema.js');
// const {root} = require('./root.js');

// const app = express();

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));

// app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
///////////////////////////////////////////////////////////////////////////////


const express = require('express');
const url = require('url');
const app = express()
const port = 5000;

// Dummy data to mock the server 
const  kaldiTranscript = require('./sample-data/kaldi-transcript.json')
const sampleProjects = require('./sample-data/projects.sample.json');
const sampleTranscripts = require('./sample-data/projects.sample.json');
const samplePaperEdits = require('./sample-data/projects.sample.json');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
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

// An api endpoint that returns a short list of items
// app.get(`/api/getList`, (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

/**
 * Projects
 */

 // get projects
app.get(`/api/projects`, (req,res) => {
    res.json(sampleProjects);
    console.log('/api/projects');
});

// get individual project
app.get(`/api/projects/1`, (req,res) => {
//    TODO: add id param
    // res.json();
    console.log('/api/projects/1');
});

// Create a new project
app.post(`/api/projects`, (req,res) => {
    // TODO: send project ID?     
    res.status(200).json({status:"ok"})
    console.log('/api/projects - post');
});

// edit 
app.put(`/api/projects/1/edit`, (req,res) => {
    //    TODO: add id param
    // res.json();
    console.log('/api/projects/1/edit');
});

 /**
 * Users
 */


/**
 * Transcripts
 */
// TODO: add projectId 
app.get(`/api/projects/1/transcripts`, (req,res) => {
   
    res.json(sampleTranscripts);
    console.log('Sent list of Transcripts');
});

app.get(`/api/projects/1/transcripts/1`, (req,res) => {
   
    res.json({title: 'Ted Talk Kate', 
        description: 'some optional description', 
        transcript: kaldiTranscript,
        url: 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4'
    });
    console.log('Sent list of items');
});

app.get(`/api/projects/1/transcripts/1/annotations`, (req,res) => {
   
    res.json({title: 'Ted Talk Kate', 
        description: 'some optional description', 
        transcript: kaldiTranscript,
        url: 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4',
        annotations: []
    });
    console.log('Sent list of items');
});
/**
 * Paper-edits
 */
// TODO: id of project 
app.get(`/api/projects/1/paperedits`, (req,res) => {
   
    res.json(samplePaperEdits);
    console.log('Sent list of Paperedits');
});

// TODO: id of project and paper edit
app.get(`/api/projects/1/paperedits/1`, (req,res) => {
    res.json({
            id: 1,
            title: 'Paperedit title One',
            description: 'Paperedit one description', 
            paperEditJson: {papercuts:[{}]}
        });
    console.log('Sent One of Paperedit');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))