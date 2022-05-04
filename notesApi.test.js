const NotesApi = require('./notesApi')

require('jest-fetch-mock').enableMocks()

describe('notesAPI', () => {
  it('.loadnotes loads saved notes from the server', () =>{
    const notesApi = new NotesApi();
    fetch.mockResponseOnce(JSON.stringify({
      name: 'notes',
      notes: ['test']
    }))
    notesApi.loadNotes((dataFromApi) => {
      expect(dataFromApi.notes).toBe(['test']);
    })
  })
  
  describe('.createNote', () => {
    it('makes a POST request to notes backend to create a new note', () => {
      const notesApi = new NotesApi();
      fetch.mockResponseOnce('Create a note')
      notesApi.createNote('Create a note', notesApi.newestNote((something) => {
        expect(something).toBe('Create a note');
      }))
    })
  })
 
})

// fetch.mockResponseOnce(JSON.stringify({
//   name: 'rails/rails',
//   description: 'Ruby on Rails'
// }));

// api.getRepoInfo('rails/rails', (repoInfo) => {
//   expect(repoInfo.description).toBe('Ruby on Rails');
// });