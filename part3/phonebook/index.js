const express = require('express');
var morgan = require('morgan');

const app = express();
app.use(express.json());
// app.use(morgan('tiny'));
morgan.token('body', req => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method);
//   console.log('Path:  ', request.path);
//   console.log('Body:  ', request.body);
//   console.log('---');
//   next();
// };

// app.use(requestLogger);

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' });
// };

// app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0;
  return maxId + 1;
};

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/info', (request, response) => {
  const count = persons.length;
  response.send(`<p>/Phonebook has info for ${count} people</p><p>${new Date()}</p>`);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  let errorMessage = null;
  console.log(persons);
  if (!body) {
    errorMessage = 'content missing';
  } else if (!body.number) {
    errorMessage = 'missing number';
  } else if (!body.name) {
    errorMessage = 'missing name';
  } else if (persons.some(person => person.name === body.name)) {
    errorMessage = 'name must be unique';
  }

  if (errorMessage) {
    return response.status(400).json({error: errorMessage});
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});
