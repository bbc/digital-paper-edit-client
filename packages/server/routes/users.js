// Dummy data to mock the server 
const sampleProjects = require('../sample-data/projects.sample.json');
const sampleTranscripts = require('../sample-data/transcripts.sample.json');
const samplePaperEdits = require('../sample-data/paper-edits.sample.json');

/**
 * Users
 */
module.exports = (app) => {

    // TODO: add an end point to do search from users list
    // OR
    // Index - all available users that can be added to a project?
    app.get('/api/users', (req,res) => {
        const projectId = req.params.projectId;
        // TODO: Call to get user emails
        console.log(`/api/projects/${projectId}/users`);
        res.status(200).json({usersList: [{email: 'some.user@email.com'},{email: 'some.user2@email.com'}]});
        
    });
   
    // Index - all users belonging to a project
    app.get('/api/projects/:projectId/users', (req,res) => {
        const projectId = req.params.projectId;
        console.log(`/api/projects/${projectId}/users`);
        res.status(200).json({usersList: [{email: 'some.user@email.com'}]});
    });

    // - adding a user to a project
    app.put('/api/projects/:projectId/users', (req,res) => {
        const projectId = req.params.projectId;
        console.log(`/api/projects/${projectId}/users`);
        res.status(200).json({status:"ok"});
    });

    // Get  a single user
    // TODO: this route might not be needed?
    app.get('/api/projects/:projectId/users/:userId', (req,res) => {
        const projectId = req.params.projectId;
        const userId = req.params.userId;
        console.log(`/api/projects/${projectId}/users/${userId}`);
        res.status(200).json({user: {email: 'some.user@email.com'}});
    });

     // remove  a single user from the project
    app.delete('/api/projects/:projectId/users/:userId', (req,res) => {
        const projectId = req.params.projectId;
        const userId = req.params.userId;
        console.log(`/api/projects/${projectId}/users/${userId}`);
        res.status(200).json({status:"ok"});
    });
}