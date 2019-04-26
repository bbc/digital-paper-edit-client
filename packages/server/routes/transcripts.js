// Dummy data to mock the server 
const kaldiTranscript = require('../sample-data/kaldi-transcript.json')
const sampleProjects = require('../sample-data/projects.sample.json');
const sampleTranscripts = require('../sample-data/transcripts.sample.json');
const sampleTranscript = require('../sample-data/transcript.sample.json');
const samplePaperEdits = require('../sample-data/paper-edits.sample.json');

/**
 * Transcripts
 */
module.exports = (app) => {
      // New - Create a new project
      app.post(`/api/projects/:projectId/transcripts`, (req,res) => {
        // TODO: save to db + return ID
        // TODO: create video and audio preview
        // TODO: get transcription
        const projectId = req.params.projectId;
        console.log('transcripts','new',`/api/projects/${projectId}/transcripts`);
        // TODO: send project ID?     
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202
        res.status(202).json({status:"ok"})
       
    });
    // Index
    app.get(`/api/projects/:projectId/transcripts`, (req,res) => {
        const projectId = req.params.projectId;
        // return project title 
        const response = {
            projectTitle: "Sample Project",
            transcripts: [ 
            {
                id: 0,
                title:'Sample title one',
                description: 'sample description 1'
            },
            {
                id: 1,
                title:'Sample title 2',
                description: 'sample description 2'
            }
            ]
        }

         // 204 - no content if transcript not ready?
        console.log('transcripts','get',`/api/projects/${projectId}/transcripts`);
        res.status(200).json(response)
    });

    // show
    app.get(`/api/projects/:projectId/transcripts/:transcriptId`, (req,res) => {
        const projectId = req.params.projectId;
        const transcriptId = req.params.transcriptId;
       // TODO: change this 
        console.log('transcripts','get',`/api/projects/${projectId}/transcripts/${transcriptId}`);
        res.status(200).json({
            projectTitle: 'Sample Project',
            title: 'Ted Talk Kate', 
            description: 'some optional description', 
            transcript: sampleTranscript,
            url: 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4'
        });
       
    });

     // edit 
     app.put(`/api/projects/:projectId/transcripts/:transcriptId/edit`, (req,res) => {
        const projectId = req.params.projectId;
        const transcriptId = req.params.transcriptId;
        res.status(200).json({status:"ok"})
        console.log('transcripts','edit',`/api/projects/${projectId}/transcripts/${transcriptId}/edit`);
    });

    // delete 
      app.delete(`/api/projects/:projectId/transcripts/:transcriptId`, function (req, res) {
        const projectId = req.params.projectId;
        const transcriptId =req.params.transcriptId;
        // filter sampleProjects for those that don't match 
        console.log('transcripts','deleted',`(/api/projects/${projectId}/transcripts/${transcriptId}`)
        res.status(200).json({status:"ok"})
    })  
}