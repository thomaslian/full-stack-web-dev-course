// Imports
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

// Database URL
const url = 'mongodb://localhost:27017/';
// Database name
const dbname = 'conFusion';

// Connect to the MongoDB with the url. Second parameter is a callback function
// with two values, error and client. 
MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');

    // Get the database
    const db = client.db(dbname);

    // Insert document with the following values
    dboper.insertDocument(db, { name: "Vadonut", description: 'test' }, 'dishes')
        .then((result) => {
            console.log('Insert Document:\n', result.ops);

            // Find all documents in the following collection
            return dboper.findDocuments(db, "dishes")
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            // Update the document with the name Vadonut with the following description
            return dboper.updateDocument(db, { name: "Vadonut" },
                { description: "Updated Test" }, "dishes")
        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            // Find all documents in the following collection
            return dboper.findDocuments(db, "dishes")
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);

            // Drop the collection (deletes the collection) 
            return db.dropCollection("dishes")
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            // Close the connection to the database
            client.close();
        })
        .catch((err) => console.log(err));
})
    .catch((err) => console.log(err));