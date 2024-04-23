const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dataAdmin:${password}@cluster0.n2kpyr5.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
    console.log('Phonebook:')
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
} else {
    const newName = process.argv[3]
    const newNumber = process.argv[4]
    const contact = new Contact({
        name: newName,
        number: newNumber
    })
    
    contact.save().then(result => {
        console.log(`added ${contact.name} number ${contact.number} to phonebook`)
        mongoose.connection.close()
    })
}
