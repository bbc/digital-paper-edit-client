// Dummy data to mock the server 
const sampleProjects = require('../sample-data/projects.sample.json');
const sampleTranscripts = require('../sample-data/transcripts.sample.json');
const samplePaperEdits = require('../sample-data/paper-edits.sample.json');

/**
 * Paper-edits
 */
module.exports = (app) => {
    // TODO: id of project 
    app.get(`/api/projects/:projectId/paperedits`, (req,res) => {
    
        res.json(samplePaperEdits);
        console.log('Sent list of Paperedits');
    });

    // TODO: id of project and paper edit
    app.get(`/api/projects/:projectId/paperedits/1`, (req,res) => {
        res.json({
                projectTitle: "Sample Project",
                id: req.param.projectId,
                title: 'Paperedit title One',
                description: 'Paperedit one description', 
                paperEditJson: {papercuts:[{}]}
            });
        console.log('Sent One of Paperedit');
    });
}