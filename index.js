const notesModel = require('./notesModel');
const NotesView = require('./NotesView');
const notesApi = require('./notesApi')

const model = new notesModel();
const api = new notesApi();

console.log('The notes app is running');

console.log(model.getNotes());


const notesview = new NotesView(model, api)
notesview.displayNotesFromApi();

console.log(notesview.displayNotes())
