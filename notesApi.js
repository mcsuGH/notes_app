class NotesApi {

  loadData(callback) {
    fetch('localhost:3000/notes').then((response) => {
      return response.json();
    }).then((data) => {
      callback(data);
    })
  }

}

module.exports = NotesApi;