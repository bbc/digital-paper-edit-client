// Dummy data to mock the server 
const sampleProjects = require('../sample-data/projects.sample.json');
const sampleTranscripts = require('../sample-data/transcripts.sample.json');
const sampleTranscript = require('../sample-data/transcript.sample.json');
const samplePaperEdits = require('../sample-data/paper-edits.sample.json');
const sampleLabels = require('../sample-data/labels.sample.json');
const sampleAnnotations = require('../sample-data/annotations.sample.json');
/**
 * annotations
 */
module.exports = (app) => {
     // New 
     app.post(`/api/projects/:projectId/transcripts/:transcriptId/annotations`, (req,res) => {
        // TODO: save to db 
        console.log('req ',req.projectId)
        // TODO: send project ID?     
        res.status(201).json({status:"ok"})
        console.log(`/api/projects/:projectId/transcripts/:transcriptId/annotations`);
    });
     //index - list annotations
    app.get(`/api/projects/:projectId/transcripts/:transcriptId/annotations`, (req,res) => {
        const projectId =  req.params.projectId;
        const transcriptId = req.params.transcriptId;
        console.log('labels','get',`/api/projects/${projectId}/transcripts/${transcriptId}/annotations`);
        
        const response = { 
            projectTitle: 'Sample Project Title',
            projectDescription: 'sampleProjectDescription',
            annotations: sampleAnnotations,
            // TODO: Annotations returns transcript as well?
            transcript: sampleTranscript,
            transcriptTitle: 'Ted Talk Kate',
            url: 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4', 
            labels: sampleLabels
        };
        res.status(200).json(response)
    })

    // show 
    // TODO: this route might not be needed not necessary? get individual annotations?
    app.get(`/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationsId`, (req,res) => {
        const projectId =  req.params.projectId;
        const transcriptId = req.params.transcriptId;
        const annotationsId  = req.params.annotationsId
        console.log('labels','get',`/api/projects/${projectId}}/transcripts/${transcriptId}/annotations/${annotationsId}`);
        const response = { annotations: sampleAnnotations[1] };
        res.status(200).json(response)
    })

    // edit 
    app.put(`/api/projects/:projectId/transcripts/:transcriptId/annotations`, (req,res) => {
        const projectId = req.params.projectId;
        const transcriptId = req.params.transcriptId;
        const annotationId = req.params.annotationId;
        console.log('deleted', projectId, transcriptId, annotationId)
        console.log(`/api/projects/${projectId}/transcripts/:transcriptId/annotations`);
        res.status(200).json({status:"ok"})
    });

     // delete 
     app.delete(`/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId`, function (req, res) {
        const projectId = req.params.projectId;
        const transcriptId = req.params.transcriptId;
        const annotationId = req.params.annotationId;
        console.log('deleted', projectId, transcriptId, annotationId)
        res.status(200).json({status:"ok"})
    }) 
}