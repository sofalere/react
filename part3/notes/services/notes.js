import axios from 'axios'
const baseURL = 'http://localhost:3001/notes';

const getAll = () => axios.get(baseURL);

const create = (noteObject) => axios.post(baseURL, noteObject);

const update = (changedNote, id ) => axios.put(baseURL + '/' + id, changedNote);

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}