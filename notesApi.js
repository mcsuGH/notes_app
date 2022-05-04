class NotesApi {

  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then((data) => {
        callback(data);
      })
  }

  newestNote(data) {
    return data[data.length - 1];
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

  // loadData(url, callback) {
  //   fetch(url)
  //     .then(response => response.json())
  //     .then((data) => {
  //       callback(data);
  //     })
  // }
}

module.exports = NotesApi;

