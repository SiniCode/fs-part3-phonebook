const express = require('express')
const app = express()

app.use(express.json())

let contacts = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-23-6423122'
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(number => number.id === id)

    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const timestamp = new Date()

    response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${timestamp}</p>
    `)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(number => number.id !== id)

    response.status(204).end()
})

const createRandomId = () => Math.floor(Math.random() * 1000000)

app.post('/api/persons', (request, response) => {
    const body = request.body

    const newContact = {
        id: createRandomId(),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(newContact)
    response.json(newContact)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})