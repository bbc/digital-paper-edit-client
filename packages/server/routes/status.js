// health check on /status to 200 is needed for cosmos AWS deployment 

// TODO: add some server error handling that if it's having issues
// it does not return 200
module.exports = (app) => {
    app.get('/status', (req, res) => {
        res.sendStatus(200);
    });
}

