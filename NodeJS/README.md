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
- npm install express-session session-file-store 
- npm install passport passport-local passport-local-mongoose@5.0.1 --save
- npm install passport-jwt jsonwebtoken --save
- npm install multer@1.3.1 --save
- npm install cors@2.8.4 --save
- npm install passport-facebook-token@3.3.0 --save

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
- db.users.drop() (Delets all the users in the users document)

## Generating a SSL key
- openssl genrsa 1024 > private.key - Generate a private key - Windows: After installing OpenSSL
- openssl req -new -key private.key -out cert.csr - Generate a cert.csr
- openssl x509 -req -in cert.csr -signkey private.key -out cerfificate.pem - Generate a certificate
- https://wiki.openssl.org/index.php/Binaries (Different OpenSSL distrubutions)
- https://blog.didierstevens.com/2015/03/30/howto-make-your-own-cert-with-openssl-on-windows/ (Install openssl on windows)
- http://www.selfsignedcertificate.com/ (Self signed SSL key for testing purposes)

## Node modules for server development
- Express
- Morgan
- Body-parser
- Express generator
- Mongoose
- Cookie parser
- express-session
- session-file-store 
- passport
- passport-local
- passport-local-mongoose
- passport-jwt
- jsonwebtoken
- multer
- cors
- passport-facebook-token


## Keywords
- NodeJS
- Postman
- Express
- Morgan
- Body-parser
- Express generator
- MongoDB
- Mongoose
- Cookie parser
- express-session
- session-file-store 
- passport
- passport-local
- passport-local-mongoose
- passport-jwt
- jsonwebtoken
- multer
- cors
- passport-facebook-token