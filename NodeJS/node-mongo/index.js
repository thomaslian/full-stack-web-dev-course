// Imports
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Database URL
const url = 'mongodb://localhost:27017/';
// Database name
const dbname = 'conFusion';

// Connect to the MongoDB with the url. Second parameter is a callback function
// with two values, error and client. 
MongoClient.connect(url, (err, client) => {
    // Check if error is null
    assert.equal(err, null);

    console.log('Connected correctly to server');

    // Get the database
    const db = client.db(dbname);
    // Get the collection dishes inside the database
    const collection = db.collection('dishes');

    // Insert one document to the collection
    collection.insertOne({ "name": "Uthappizza", "description": "test" }, (err, result) => {
        // Check if error is null
        assert.equal(err, null);

        console.log('After Insert:\n');
        // Show result
        console.log(result.ops);

        // Get all the documents in the collection
        collection.find({}).toArray((err, docs) => {
            // Check if error is null
            assert.equal(err, null);

            console.log('Found:\n');
            // Show documents
            console.log(docs);

            // Drop the dishes collection from the database (Deletes the collection)
            db.dropCollection('dishes', (err, result) => {
                // Check if error is null
                assert.equal(err, null);

                // Close the connection to the database
                client.close();
            });
        });
    });
});