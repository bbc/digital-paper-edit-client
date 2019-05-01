// Dummy data to mock the server 
const sampleProjects = require('../sample-data/projects.sample.json');
const sampleTranscripts = require('../sample-data/transcripts.sample.json');
const samplePaperEdits = require('../sample-data/paper-edits.sample.json');
const sampleLabels = require('../sample-data/labels.sample.json');
/**
 * annotations
 */
module.exports = (app) => {
     // New 
     app.post(`/api/projects/:projectId/labels`, (req,res) => {
        // TODO: save to db 
        const projectId =  req.params.projectId;
        console.log('labels','post',`/api/projects/${projectId}/labels`);
        // TODO: send project ID?     
        res.status(201).json({status:"ok"})
       
    });
     //index - list labels
    app.get(`/api/projects/:projectId/labels`, (req,res) => {
        // TODO: read from db
        const projectId =  req.params.projectId;
        console.log('labels','get',`/api/projects/${projectId}/labels`);
        // TODO: send project ID?     
        const response = { labels: sampleLabels };
        res.status(200).json(response)
    });
    
    // show 
    // TODO: this route might not be needed not necessary? get individual label?
    app.get(`/api/projects/:projectId/labels/:labelId`, (req,res) => {
        // TODO: read from db
        const projectId =  req.params.projectId;
        const labelId =  req.params.labelId;
        console.log('labels','get',`/api/projects/${projectId}/labels/${labelId}`);
        // TODO: send project ID?     
        const response = { labels: sampleLabels[2] };
        res.status(200).json(response)
    });

    // edit - index
    // TODO: decide if always editing labels in batch or doing /labels/:labeldId 
    // to edit one at a time for consistency
    app.put(`/api/projects/:projectId/labels`, (req,res) => {
        const projectId = req.params.projectId;
        console.log('labels','put', `/api/projects/${projectId}/labels`);
        res.status(200).json({status:"ok"})
    });

    // edit - one
    app.put(`/api/projects/:projectId/labels/:labelId`, (req,res) => {
        const projectId = req.params.projectId;
        console.log('labels','put', `/api/projects/${projectId}/labels/${labelId}`);
        res.status(200).json({status:"ok"})
    });

     // delete 
     app.delete(`/api/projects/:projectId/labels/:labelId`, function (req, res) {
        const projectId = req.params.projectId;
        const labelId = req.params.labelId;
        console.log('labels','delete', `/api/projects/${projectId}/labels/${labelId}`);
        res.status(200).json({status:"ok"})
    }) 
}