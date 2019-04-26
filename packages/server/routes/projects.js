// 'use strict';
// HTTP Verbs https://www.restapitutorial.com/lessons/httpmethods.html
// Error codes https://codeburst.io/know-your-http-status-a-cheat-sheet-for-http-status-codes-5fb43863e589

// Dummy data to mock the server 
const kaldiTranscript = require('../sample-data/kaldi-transcript.json')
const sampleProjects = require('../sample-data/projects.sample.json');
const sampleTranscripts = require('../sample-data/transcripts.sample.json');
const samplePaperEdits = require('../sample-data/paper-edits.sample.json');

/**
 * Projects
 */
module.exports = (app) => {
    // New - Create a new project
    app.post(`/api/projects`, (req,res) => {
        // TODO: save to db 
        console.log('req',req.body)
        // TODO: send project ID?     
        console.log('projects','post','/api/projects ');
        res.status(201).json({status:"ok", projectId: 2 })
        
    });

    // index -get projects
    app.get(`/api/projects`, (req,res) => {
        // TODO: db
        console.log('projects','get','/api/projects');
        res.status(200).json(sampleProjects)
       
    });

    // show - get individual project
    // https://expressjs.com/en/api.html#req
    app.get('/api/projects/:projectId', (req,res) => {
        // TODO: db
        const tmpProject ={}
        tmpProject.project = sampleProjects.projects[parseInt(req.params.projectId)];
        console.log('projects','get',`/api/projects/${req.params.projectId}`);
        res.status(200).json(tmpProject)
    });

    // edit 
    app.put(`/api/projects/:projectId/edit`, (req,res) => {
        // TODO: db
        console.log('projects','put',`/api/projects/${req.params.projectId}/edit`);
        res.status(200).json({status: "ok"});
    });

    // delete 
    app.delete(`/api/projects/:projectId/`, function (req, res) {
        const projectId = req.params.projectId;
        // TODO: db
        // TODO: filter sampleProjects for those that don't match ?
        console.log('projects','deleted', `/api/projects/${projectId}`)
        res.status(200).json({status:"ok"})
    })
};