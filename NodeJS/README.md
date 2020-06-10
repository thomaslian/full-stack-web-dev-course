# Learning NodeJS
Leaning NodeJS with Coursera.
Course name: Server-side Development with NodeJS, Express and MongoDB
Link: https://www.coursera.org/learn/server-side-nodejs

## npm CLI commands
- npm init (Initialize this folder as a node folder)
- npm start (Start the application that is in the folder)
- npm install express@4.0.0 (Install exact version) 
- npm install express@"~4.0.0" (Install and accept version with patch) 
- npm install express@"^4.0.0" (Install and acceptminor version) 
- "--save", saves the module in the dependencies list
- npm install morgan
- npm install -g express-generator
- npm install mongodb --save
- npm install assert@1.4.1 --save
- npm install mongoose --save
- npm install mongoose mongoose-currency --save

## npm CLI
- v. 6.14.5

## Express generator commands
- express conFusionServer (Creates an express app called conFusionServer)
- npm install (Do this in app folder after creation)

## MongoDB commands
- mongod --dbpath=data --bind_ip 127.0.0.1 (Start database and set the database path as data and bind it to ip 127.0.0.1)
- mongo (Command line to access the mongo server)
### After typing "mongo"
- db (Show database that you are currenctly connected to)
- use conFusion (Creates a database called conFusion if it does not already exist)
- db.help() (Show commands that are avilable)
- db.dishes (Create a collection called dishes if it does not already exist)
- db.dishes.insert({"name": "Uthappizza", "description": "Test"}); (Insert a document into the database)
- db.dishes.find() (Print out the documents in the database)
- db.dishes.find().pretty() (Prints the documents in a more readable way)
- exit (To go out of the mongo command line)

## Node modules for server development
- Express
- Morgan
- Body-parser
- Express generator
- Mongoose

## Keywords
- NodeJS
- Postman
- Express
- Morgan
- Body-parser
- Express generator
- MongoDB
- Mongoose