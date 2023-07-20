import axios from 'axios'
const baseURL = 'http://localhost:3001/api/notes';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const create = (noteObject) => {
  const request = axios.post(baseURL, noteObject);
  return request.then(response => response.data);
};

const update = (changedNote, id ) => {
  const request = axios.put(baseURL + '/' + id, changedNote);
  return request.then(response => response.data);
};

export default { getAll, create, update }