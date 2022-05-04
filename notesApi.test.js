const NotesApi = require('./notesApi')

require('jest-fetch-mock').enableMocks()

describe('notesAPI', () => {
  const notesApi = new NotesApi();
  fetch.mockResponseOnce(JSON.stringify({
    name: 'notes',
    notes: ['test']
  }))
  notesApi.loadNotes((dataFromApi) => {
    expect(dataFromApi.notes).toBe(['test']);
  })
})

// fetch.mockResponseOnce(JSON.stringify({
//   name: 'rails/rails',
//   description: 'Ruby on Rails'
// }));

// api.getRepoInfo('rails/rails', (repoInfo) => {
//   expect(repoInfo.description).toBe('Ruby on Rails');
// });