const notesModel = require('./notesModel');
const NotesView = require('./NotesView');
const notesApi = require('./notesApi')

const model = new notesModel();
const api = new notesApi();
const notesview = new NotesView(model, api)

api.loadNotes((note) => {
  model.setNotes(note);
  notesview.displayNotes();
}, () => {
  notesview.displayError();
});

console.log('The notes app is running');

console.log(model.getNotes());

console.log(notesview.displayNotes());

console.log(api.convertToEmoji('test :fire:'));

// // api.convertToEmoji("test :fire:", (message) => {
// //   console.log('1:', message)
// //   api.createNote(message)
// // });

// api.convertToEmoji("test :fire:").then((message) => {
//   console.log('1:', message)
//   api.createNote(message)
// });



