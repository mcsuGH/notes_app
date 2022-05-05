class NotesApi {

  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then((data) => {
        callback(data);
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
      console.log('Success:', callback(data));
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  };
}

module.exports = NotesApi;

