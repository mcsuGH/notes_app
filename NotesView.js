const notesModel = require('./notesModel');
const notesApi = require('./notesApi');

class NotesView {
  constructor(model = new notesModel, api = new notesApi) {
    this.model = model;
    this.api = api;
    this.mainContainerEl = document.querySelector('#main-container');
    this.NoteTitleSubmitEl = document.querySelector('#note-title-submit');
    this.noteTitleInputEl = document.querySelector('#note-title-input');

    this.NoteTitleSubmitEl.addEventListener('click', () => {
      this.addNotes(this.noteTitleInputEl.value);
      this.noteTitleInputEl.value = '';
    })
  }

  addNotes(titleText) {
    this.model.addNote(titleText);
    const newNote = {
      "content": titleText
    }
    this.api.createNote(newNote, this.displayNotes());
  }

  displayNotes() {
    const oldNotes = document.querySelectorAll('div.note');
    oldNotes.forEach((note) => {
      note.remove();
    })
    let notes = this.model.getNotes();
    for (let i = 0; i < notes.length; i++) {
      let newElement = document.createElement('div');
      newElement.classList.add('note')
      newElement.innerText = `${notes[i]}`;
      this.mainContainerEl.append(newElement);
    };
  };

  displayNotesFromApi() {
    this.api.loadNotes((presetNotes) => {
      this.model.setNotes(presetNotes);
      let errorElement = document.createElement('div')
      errorElement.className = 'error'
      errorElement.innerText = "Oops, something went wrong"
      this.mainContainerEl.append(errorElement);
      this.displayNotes();
    })
  }

  displayError() {
    console.log('7')
    this.api.loadNotes((callback, error) => {
      console.log('1')
      let errorElement = document.createElement('div')
      console.log('2')
      errorElement.className = 'error'
      console.log('3')
      errorElement.innerText = "Oops, something went wrong"
      this.mainContainerEl.append(errorElement);
    })
  }

}

module.exports = NotesView;
