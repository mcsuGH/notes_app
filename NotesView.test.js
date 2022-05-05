/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const NotesView = require('./NotesView');


const mockedModel = {
  getNotes: () => ['This is an example note', 'Another note'],
  addNote: () => undefined,
  setNotes: () => undefined
};

const anotherMockedModel = {
  getNotes: () => ['This is an example note', 'Another note', 'My first note title'],
  addNote: () => 'My first note title'
};

const mockedApi = {
  loadNotes: () => undefined,
  createNote: () => undefined
};

describe('NotesView', () => {
  describe('.displayNotes', () => {
    it("gets the notes from model and displays it as a new div element with class 'note'", () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const notesView = new NotesView(mockedModel, mockedApi);
      notesView.displayNotes();
      expect(document.querySelectorAll('div.note').length).toBe(2);

    })

    it('shows the right number of notes after displayNotes is called again', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const notesView = new NotesView(mockedModel, mockedApi);
      notesView.displayNotes();
      notesView.displayNotes();
      expect(document.querySelectorAll('div.note').length).toBe(2);
    })
  })

  describe('.addNotes', () => {
    it('adds a new note with custom title', () => {
      document.body.innerHTML = fs.readFileSync('./index.html')
      const notesView = new NotesView(anotherMockedModel, mockedApi);
      const noteTitleInputEl = document.querySelector('#note-title-input');
      noteTitleInputEl.value = "My first note title";
      const noteTitleSubmitEl = document.querySelector('#note-title-submit');
      noteTitleSubmitEl.click();
      // expect(notesView.model.addNote('My first note title')).toHaveBeenCalled();
      expect(document.querySelectorAll('div.note').length).toBe(3);
    })

  
    it('clears the text field after submitting a note', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const notesView = new NotesView(anotherMockedModel, mockedApi);
      const noteTitleInputEl = document.querySelector('#note-title-input');
      noteTitleInputEl.value = "My first note title";
      const noteTitleSubmitEl = document.querySelector('#note-title-submit');
      noteTitleSubmitEl.click();
      expect(noteTitleInputEl.value).toBe('');
    })
  })

  describe('.displayNotesFromApi', () => {
    it('loads the notes taken from the api', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const notesModel = require('./notesModel');
      const notesApi = require('./notesApi');
      jest.mock('./notesApi');
      jest.mock('./notesModel');
      const mockModel = new notesModel();
      const mockApi = new notesApi();
      const notesView = new NotesView(mockModel, mockApi);

      notesView.model.getNotes.mockImplementation(() => [
        "this is a note",
      ]);
      notesView.model.setNotes.mockImplementation(() => [
        "this is a note",
      ]);
  
      notesView.api.loadNotes.mockImplementation((callback) =>
        callback(["this is a note"])
      );

      notesView.displayNotesFromApi();
      expect(notesView.model.getNotes).toHaveBeenCalledTimes(1);
      expect(notesView.model.setNotes).toHaveBeenCalledTimes(1);
      expect(document.querySelectorAll("div.note").length).toEqual(1);
     
    })
  })
})
describe('.displayError', () => {
  it('displays an error on the page if theres an error', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
      const notesModel = require('./notesModel');
      const notesApi = require('./notesApi');
      notesModel.mockClear();
      notesApi.mockClear();
      jest.mock('./notesApi');
      jest.mock('./notesModel');
      const mockModel = new notesModel();
      const mockApi = new notesApi();
      const notesView = new NotesView(mockModel, mockApi);

      notesView.displayError();
      expect(document.querySelector("div.error").innerText).toEqual('Oops, something went wrong')
  })
})

