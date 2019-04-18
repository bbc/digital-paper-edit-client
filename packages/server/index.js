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


const express = require('express')
const app = express()
const port = 5000;

const  kaldiTranscript = require('./sample-data/kaldi-transcript.json')


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
app.get('/', (req, res) => res.json({response:'Hello World!'}))


// An api endpoint that returns a short list of items
app.get(`/api/getList`, (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});




/**
 * Projects
 */
app.get(`/api/projects`, (req,res) => {
    
    res.json({
        projects:[
            {
                id: 1,
                title: 'Project title One',
                description: 'Project one description'
            },
            {
                id: 2,
                title: 'Project title Two',
                description: 'Project Two description brexit'
            },
            {
                id: 3,
                title: 'Project title 3',
                description: 'Project 3 description brexit'
            },
            {
                id: 4,
                title: 'Project title 4',
                description: 'Project four description'
            },
            {
                id: 5,
                title: 'Project title 5',
                description: 'Project 5 description'
            },
            {
                id: 6,
                title: 'Project title 6',
                description: 'Project 6 description'
            },
            {
                id: 7,
                title: 'Project title 7',
                description: 'Project 7 description'
            },
            {
                id: 8,
                title: 'Project title 8',
                description: 'Project 8 description'
            }
        ]
    });
    console.log('/api/projects');
});

app.get(`/api/projects/1`, (req,res) => {
//    TODO: add id param
    res.json(kaldiTranscript);
    console.log('/api/projects/1');
});

app.post(`/api/projects/1/new`, (req,res) => {
    // TODO:     
    res.json({kaldiTranscript});
    console.log('/api/projects/1/new');
});

 /**
 * Users
 */


/**
 * Transcripts
 */
// TODO: add projectId 
app.get(`/api/projects/1/transcripts`, (req,res) => {
   
    res.json({
        transcripts:[ 
        {
            id: 1,
            title: 'Transcript title One',
            description: 'Transcript one description'
        },
        {
            id: 2,
            title: 'Transcript title Two',
            description: 'Transcript Two description brexit'
        },
        {
            id: 3,
            title: 'Transcript title 3',
            description: 'Transcript 3 description brexit'
        }
    ]});
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
   
    res.json({
        paperedits:[ 
        {
            id: 1,
            title: 'Paperedit title One',
            description: 'Paperedit one description'
        },
        {
            id: 2,
            title: 'Paperedit title Two',
            description: 'Paperedit Two description brexit'
        },
        {
            id: 3,
            title: 'Paperedit title 3',
            description: 'Paperedit 3 description brexit'
        },
        {
            id: 4,
            title: 'Paperedit title 4',
            description: 'Paperedit 4 description'
        },
        {
            id: 5,
            title: 'Paperedit title 5',
            description: 'Paperedit 5 description '
        },
        {
            id: 6,
            title: 'Paperedit title 6',
            description: 'Paperedit 6 description '
        }
    ]});
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