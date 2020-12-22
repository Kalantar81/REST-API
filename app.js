const express = require('express');
const path = require('path');
// generates a new id's
const {v4} = require('uuid');
const app = express();

let CONTACTS = [
    {id: v4(), name: 'Vlad', value: '+7-921-100-20-30', marked: false}
]

app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS);
    }, 1000);
    
});

// POST
app.post('/api/contacts', (req, res) => {
    // will be published on server
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact)
});

// DELETE
// id -param, that we pass for delete an item
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(contact => contact.id !== req.params.id)
  res.status(200).json({message: 'contact had be deleted'})
});

// PUT - update a specific element
app.put('/api/contacts/:id', (req, res) => {
    const index = CONTACTS.findIndex(contact => contact.id === req.params.id);
    CONTACTS[index] = req.body;
    res.status(200).json(CONTACTS[index])
  });





// @param __dirname - means start path from this location
app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));