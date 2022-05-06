class NotesApi {

  loadNotes(callback, errorCallback) {
    // console.log('Hi')
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then((data) => {
        console.log('Load', data);
        callback(data);
      })
      .catch(() => {
        console.error('Error');
        errorCallback();
        // console.log('Catch Error Test')
      })
  }

  createNote(noteText, callback) {
    const noteObj = { "content": noteText }
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(noteObj)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', (data));
      callback();
    })
    .catch((error) => {
      console.error('Error:', error);
      callback();
    })
  };

  convertToEmoji(text, callback) {
    fetch('https://makers-emojify.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"text": text})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', (data));
      console.log(data.emojified_text);
      callback(data.emojified_text);
    })
    .catch((error) => {
      console.error('Error:', error);
      callback();
  })
  }
}

module.exports = NotesApi;


