//Linking Route to Data Source(Notes)
//const notesData = require('../db/db.json');
const fs = require('fs');
const path = require('path');



 module.exports = app => {

    //let notelist = fs.readFile(path.join(__dirname, "/db/db.json"));

    app.get('/api/notes', (req, res) => {

        fs.readFile(__dirname + '/db/db.json', (err, notes) => {
            if (err) {
                console.log('Failed:', err)
                return
            }
            JSON.parse(notes);
        })
    });
    
 





    app.post('/api/notes', (req, res) => {
        let newNote = req.body;
        notes.push(newNote);
    }); 

 }
 /* module.exports = app => {

fs.writeFile

    // Grabbing Notes from db.json
app.get('/api/notes', (req, res) => {fs.readFile('../db/db.json', 'utf8', (err, notesJsonString) => {
    if(err){
        console.log("File read failed:", err)
        return
    } try{
        const notesData = JSON.parse(notesJsonString)
        console.log("Notes Title:", notesData)
    }
    catch(err){
        console.log('Error parsing', notesJsonString)
    }
});*/
