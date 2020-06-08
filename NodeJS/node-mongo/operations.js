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
    return coll.insert(document);
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
    return coll.find({}).toArray();
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
    return coll.deleteOne(document);
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
    return coll.updateOne(document, { $set: update }, null);
}
