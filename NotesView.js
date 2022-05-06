const notesModel = require('./notesModel');
const notesApi = require('./notesApi');

class NotesView {
  constructor(model = new notesModel, api = new notesApi) {
    this.model = model;
    this.api = api;
    this.mainContainerEl = document.querySelector('#main-container');
    this.NoteTitleSubmitEl = document.querySelector('#note-title-submit');
    this.noteTitleInputEl = document.querySelector('#note-title-input');
    this.resetButtonEl = document.querySelector('#reset-button');

    this.NoteTitleSubmitEl.addEventListener('click', () => {
      this.addNotes(this.noteTitleInputEl.value);
      this.noteTitleInputEl.value = '';
    })

    this.resetButtonEl.addEventListener('click', () => {
      this.api.reset(() => {
        this.displayNotesFromApi();
      });
    })
  }

  // addNotes(titleText) {
  //   this.api.createNote(titleText, () => {
  //     this.displayNotesFromApi()
  //   });
  // };

  addNotes(titleText) {
    this.api.convertToEmoji(titleText, (response) => {
      this.api.createNote(response, () => {
        this.displayNotesFromApi();
      })
    });
  };

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
    this.model.reset();
    this.api.loadNotes((presetNotes) => {
      this.model.setNotes(presetNotes);
      this.displayNotes();
    }, () => {
      this.displayError();
    })
  }

  displayError() {
    const oldErrors = document.querySelectorAll('div.error');
    oldErrors.forEach((error) => {
      error.remove();
    })
    let errorElement = document.createElement('div')
    errorElement.className = 'error'
    errorElement.innerText = "Oops, something went wrong"
    this.mainContainerEl.append(errorElement);
  }

}

module.exports = NotesView;
