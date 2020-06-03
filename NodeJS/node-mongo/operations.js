// Imports
const assert = require('assert');

/* 
* Exports the insertDocument method
* 
* db = database
* document = document that will be inserted in the collection
* collection = collection within the database (document will be inserted here)
* callback = will be call back when the operation is completed
*/
exports.insertDocument = (db, document, collection, callback) => {
    // Get the collection from the right database
    const coll = db.collection(collection);
    // Enter the document that should be inserted
    coll.insert(document, (err, result) => {
        // Check if error is null, if it is not null it will print 
        // an error and quit the application
        assert.equal(err, null);
        console.log("Inserted " + result.result.n +
            " documents into the collection " + collection);
        // Pass the result back to the calling function
        callback(result);
    });
}

/* 
* Exports the findDocuments method
* 
* db = database
* collection = collection with all the documents that will searched
* callback = will be call back when the operation is completed
*/
exports.findDocuments = (db, collection, callback) => {
    // Get the collection from the right database
    const coll = db.collection(collection);
    // Get all the documents in the collection
    coll.find({}).toArray((err, docs) => {
        // Check if error is null, if it is not null it will print 
        // an error and quit the application
        assert.equal(err, null);
        // Pass the result back to the calling function
        callback(docs);
    });
}

/* 
* Exports the removeDocument method
* 
* db = database
* document = document that will be deleted
* collection = collection with the document that will be deleted
* callback = will be call back when the operation is completed
*/
exports.removeDocument = (db, document, collection, callback) => {
    // Get the collection from the right database
    const coll = db.collection(collection);
    // Delete a document
    coll.deleteOne(document, (err, result) => {
        // Check if error is null
        assert.equal(err, null);
        console.log("Removed the document ", document);
        // Pass the result back to the calling function
        callback(result);
    });
}

/* 
* Exports the updateDocument method
* 
* db = database
* document = document that will be updated
* update = contains the fields that needs to be updated 
* collection = collection with the document that will be updated
* callback = will be call back when the operation is completed
*/
exports.updateDocument = (db, document, update, collection, callback) => {
    // Get the collection from the right database
    const coll = db.collection(collection);
    // Update a document, "$set: update" is which fields of the document that
    // needs to be updated
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        // Check if error is null
        assert.equal(err, null);
        console.log("Updated the document with ", update);
        // Pass the result back to the calling function
        callback(result);
    });
}