//Linking Route to Data Source(Notes)
//const notesData = require('../db/db.json');
const fs = require('fs');
const path = require('path');

const { v4 : uuidv4 } = require('uuid');


 module.exports = app => {
    
    const notesPath = path.join(__dirname,'../db/db.json')

    // Builds route to get notes
    app.get('/api/notes', (req, res) => {
        
        fs.readFile(notesPath, (err, notesJSON) => {
            if (err) {
                console.log('Failed:', err)
                return
            }
            console.log('API*********', notesJSON)
            let notes = JSON.parse(notesJSON);
            return res.json(notes);
        });
    });
    


    app.post('/api/notes', (req, res) => {
        let newNote = req.body;
        const id = uuidv4();

        newNote.id = id
        
        console.log('line 30---------', newNote)
        //let notesData = JSON.parse(fs.readFile(notesPath, 'utf8'));
        //reads the JSON file and returns the notes data 
        fs.readFile(notesPath,(err, notesJSON) => {
            if(err) {
                throw 'File Not Read:', err;
            }
            let notesData = JSON.parse(notesJSON)
            console.log('line 37----------', notesData);
        
        
            notesData.push(newNote);
            console.log('line 41----------', notesData);
            //Addd the new note to the JSON file
            fs.writeFile(notesPath, JSON.stringify(notesData), err  => {
                    if(err) {
                throw "File Not written", err;
                } 
                return res.json(notesData)
            });
        });
    }); 

    app.delete('/api/notes/:id', (req, res) => {
        
        let noteId = req.params.id;

        fs.readFile(notesPath, (err, notesJSON) => {
            if (err) {
                console.log('Failed:', err)
                return
            }
            let notesData = JSON.parse(notesJSON)
            
            notesData = notesData.filter(notes => notes.id !== noteId)

            //Re writes the notes data onto the left column without deleted notes
            fs.writeFile(notesPath, JSON.stringify(notesData), err  => {
                    if(err) {
                throw "File Not written", err;
                } 
                return res.json(notesData)
            });
        });
    });
}
