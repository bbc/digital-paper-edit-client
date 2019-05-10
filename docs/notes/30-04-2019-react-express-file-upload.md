# React-express file upload
Some notes on how form upload between react client and express server works

## React 

On the client side in react using [`react-strap` form](https://react-bootstrap.github.io/components/forms/#forms-validation-native)

### Fle upload input element

```js
<Form.Control
    required
    type="file"
    label="Upload"
    accept="audio/*,video/*"
    onChange={ this.handleFileUpload }
    />
<Form.Text className="text-muted">
<Form.Text className="text-muted">
    Select an audio or video file to upload
</Form.Text>
<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
<Form.Control.Feedback type="invalid">
    Please chose a audio or video file to upload
</Form.Control.Feedback>
</Form.Group>
```

or without `react-bootstrap`
```js
<input
    type="file"
    label="Upload"
    accept="audio/*,video/*"
    onChange={ this.handleFileUpload }
/>
```

`accept` filters out non vide or audio files from selection options.

`handleFileUpload` function is a listener on the on change event for the `input` element

### file upload event handler 

```js
  handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.setState({ 
        mediaFileSelected: true, 
        // adding form data to state because we are not ready to upload yet
        formData: formData 
    });

    // optimization trick, if there is no title defined in the form
    // using file name as one to remove friction in filling in the form
    if (this.state.title === '') {
      this.setState({ title: file.name });
    }
  }
```


### submitting the form 

```js
...
<Form
    noValidate
    validated={validated}
    onSubmit={e => this.handleSubmit(e)}
>
```


```js
  handleSubmit(event) {
    const form = event.currentTarget;
    // react-bootstrap form validation
    if (!form.checkValidity()) {
      this.setState({ validated: true });
    }
    // if everything is fine
    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      // then send request
      this.sendRequest();
    }
  }
```

sending the request using fetch
```js
  sendRequest = () => {
    this.setState({ uploading: true });

    const formData = this.state.formData;
    // adding other info to the form
    // to save transcript server side 
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);

    // Move to API.js
    fetch(`http://localhost:5000/api/projects/${ this.state.projectId }/transcripts`, {
      method: 'POST',
      body: this.state.formData
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          uploading: false,
          uploadCompleted: true,
          redirect: true,
          newTranscriptId: response.transcriptId
        });
      })
      .catch((e) => {console.error('error submitting:::', e);});
  }
  ```

### Redirecting
Redirecting to another page 

```js
<Container>
    {this.renderRedirect()}
    ...
```

```js
import { Redirect } from 'react-router-dom';
...

 renderRedirect = () => {
    if (this.state.redirect
      && this.state.newTranscriptId
      && this.state.uploadCompleted) {
      return <Redirect to={ `/projects/${ this.state.projectId }/transcripts/${ this.state.newTranscriptId }` } />;
    }
  }
```

## Progress bar 
To display progress bar for upload in React, I've used [progressBarFetch](https://www.npmjs.com/package/react-fetch-progressbar), readme instructions pretty straightforward. 

XHR request have a straight forward way to listen to form upload progress, fetch doesn't seem to have one, hence this workaround


## Express
on the server using [`formidable`](https://www.npmjs.com/package/formidable)

```js
const IncomingForm = require('formidable').IncomingForm;

app.post(`/api/projects/:projectId/transcripts`, (req,res) => {

    const form = new IncomingForm();
    // form.encoding = 'utf-8';
    form.uploadDir = __dirname;
    // If you want the files written to form.uploadDir to include the extensions of the original files, set this property to true.
    form.keepExtensions = true;
    // https://github.com/felixge/node-formidable/pull/488
    // TODO: this `keepFilenames` does not seem to work, flag in that issue?
    form.keepFilenames = true;
    // Either 'multipart' or 'urlencoded' depending on the incoming request.
    form.type= 'multipart';
    // Limits the size of uploaded file. If this value is exceeded, an 'error' event is emitted. The default size is 200MB.
    form.maxFileSize = 200 * 1024 * 1024;
    // If you want checksums calculated for incoming files, set this to either 'sha1' or 'md5' otherwise to false.
    // form.hash = false;

     // Workaround for `form.keepFilenames` not working
    // Issue, is if file with same name already in `form.uploadDir` 
    // then it returns error
    // https://stackoverflow.com/questions/8359902/how-to-rename-files-parsed-by-formidable
    form.on('fileBegin', function(name, file){
        // rename the incoming file to the file's name
        // TODO: escape file names? 
        // Or let formidable rename with has, and save in db, with name of original as well?
        file.path = path.join(form.uploadDir, file.name);
    })
    .on('error', function(err) {
        // TODO: res with appropriate code
        console.error('error:err:: ',err)
    })
    .on('aborted', function(err) {
        // TODO: res with appropriate code
        console.error('aborted:err:: ', err)
    })

    // if receiving multiples files, `file` would be `files` as an array
    form.parse(req, function(err, fields, file) {
        console.log('fields::',fields);
        sampleTranscripts.transcripts.push({
            title: fields.title, 
            description: fields.description,
            id: newTranscriptId
        })
        // TODO: Save To DB
        console.log('transcripts','new',`/api/projects/${projectId}/transcripts`, newTranscriptId);
        // Once file uploaded send response to client
        res.status(201).json({status:"ok", transcriptId: newTranscriptId })
    });
...
```


## References
- [Creating a File Upload Component with React](https://malcoded.com/posts/react-file-upload/)
- [Simple Image Upload with React](https://codeburst.io/react-image-upload-with-kittens-cc96430eaece)
- [Ridiculously simple Ajax uploads with FormData](https://thoughtbot.com/blog/ridiculously-simple-ajax-uploads-with-formdata)
- [MDN - formData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)
- [Redirecting in React](https://medium.com/@anneeb/redirecting-in-react-4de5e517354a)
- [Introduction to fetch()](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)