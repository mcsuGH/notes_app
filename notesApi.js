class NotesApi {

  loadNotes(callback, errorCallback) {
    // console.log('Hi')
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        callback(data);
      })
      .catch(() => {
        console.error('Error');
        errorCallback();
        // console.log('Catch Error Test')
      })
  }

  createNote(noteText, callback) {
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(noteText)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', (data));
    })
    .catch((error) => {
      console.error('Error:', error);
      callback();
    })
  };
}

module.exports = NotesApi;

