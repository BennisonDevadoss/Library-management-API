### LIBRARY MANAGEMENT PROJECT

#### INITIAL DIRECTORY CREATION:

STEP 1: Create a directory --> library-managemet. 

STEP 2: Create another two directory app and db which is created inside the library-management directory. 

#### SERVER CREATION:

STEP 1: Inside the library-management directory we should create a file called server.js 

STEP 2: This file will be entrypoin to our application. 

##### Server.js Initial setup

```
const fastify = require('fastify')({
    logger: true
})

const PORT = 3000;

fastify.listen(PORT, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})
```

### Sequelize setup

STEP 1: We are going to require Sequelize. this is an ORM that will interface with the postgres database for us. 

STEP 2: And then we are going to install sequelize CLI package. 

```
$ npm install -g sequlize-cli
```

STEP 3: After run the above command, we need to configure Sequelize for our project, for that we will create a .sequelizerc file in our project's root folder. 

STEP 4: In this file, we are going to be specifying the path to files required by the Sequelize. 

```
const path = require('path');

module.exports = {
    "config": path.resolve('./db/config', config.json), 
    "models-path": path.resolve('./app/models'),
    "seeders-path": path.resolve('./db/seeders'),
    "migrations-path": path.resolve('./db/migrations')
};
```

STEP 5:This file contains our application configuration settings, such as database authentication configuration. migrations folder will hold our application's migrations, while the models folder will hold the application models. seed data is initial data provided with a system for testing, training, or templeting purpose. the seeders folder typically holds seed data. 

STEP 6: Now we are going to install actual Sequelize package, alongside its dependenecies. 

```
$ npm install --save sequelize pg pg-hstore
```

STEP 7: pg will responsible for creating the database connection while pg-hstore is a module for serializing and deserializing JSON data into the Postgres hstore format. 

STEP 8: Now with paths defined, we will need to run the init command in order to create the specified folder and generate boilerplate code. 

#### CREATING DATABASE AND UPDATING config.JSON FILE: 

STEP 1: First we need to create a developement database. 

STEP 2: createdb command will available for creating database 

```
$ createdb library-db
```

STEP 3: Then we have to modify your config.json file, we have to change such as username, password, database, dialect. 

```
{
  "development": {
    "username": "bennison",
    "password": "bennison",
    "database": "library-db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "bennison",
    "password": "bennison",
    "database": "library-db",
    "host": "127.0.0.1",
    "dialect": "bennison"
  },
  "production": {
    "username": "bennison",
    "password": "bennison",
    "database": "library-db",
    "host": "127.0.0.1",
    "dialect": "bennison"
  }
}
```

### CREATING MODELS: 

STEP 1: We are going to have two models, users and books. 

Run the following command

```
$ sequelize model:create --name Users --attributes name:string,email:string,encrypted_password:string,access_token:string

sequelize model:create --name Books --attributes name:string,category:string,author:string,price:number,notes:string
```

STEP 2: this will generate users.js and book.js in models directory. and <date>-create-user.js and <date>-create-books.js in migrations directory. 

```
<date>-create-user.js

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      encrypted_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      access_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
```

```
<date>-create-book.js

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        allowNull: true,
        type: Sequelize.STRING
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.NUMBER
      },
      notes: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};
```
STEP 3: When we run these migrations, the up function will be executed. it will take care of creating the table and its associated columns for us. 

STEP 4: If for whatever reson, we needed to rollback (undo) the migration, down function would be executed and it would undo whatever the up function did. 

STEP 5: These migrations are a representation of how we want our models to look like in the database. 

STEP 6: Sequelize automatically generates the id, createdAt and DeletedAt fields for you. 

```
$ sequelize db:migrate
```

STEP 7: This command will discover the migrations in our migrations directory and execute them. 

### CREATING CONTROLLERS AND ROUTING

STEP 1: We are going to have two controllers, books and users. 

STEP 2:The controllers directory should be placed inside the app directory. 

STEP 3: The books directory will be responsible for creating and listing, updating, and deleting books. while the users table is for collecting loging user datail and this datail is used for do some authentication and autherization. 

#### CREATING contrllers/Books.js

#### SEEDERS FILE CREATIONS: 

```
$ sequelize seed:create --name Users

$ sequelize seed:create --name Books
```

#### IMPORT SEEDERS DATA TO DATABASE:

STEP 1: In the seeder's folder Users.js file, we have to bcyript the password. 

STEP 2: So, first we have to install the pcyript using npm install bcyript. 

```
$ npm install bcyript
```

STEP 3: Then, we have to require the bcyript pacakge to the seeders' users.js file. then only we can bcycript your password. 

```
app/seeders/Users.js

'use strict';

const bcrypt = require('bcrypt')
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      name: 'Bennison D',
      email: 'bennisondevadoss@gmail.com',
      encrypted_password: bcrypt.hashSync('bennison', 10),
      access_token: "",
      createdAt: new Date(),
      updatedAt: new Date(),

    }], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
```
STEP 4: Now we have to run bellow command, this command also push our seeders data to database. 

```
$ sequelize db:seed:all
```

STEP 5: This command push the the seeers directory's all file's initial value to database tables. 

#### AUTHENTICATION(USER EMAIL AND PASSWORD):

```
app/controllers/Users.js

const Users = require('../models').Users;
const bcrypt = require('bcrypt');
module.exports = {
    list(req, reply) {
        return Users
            .findAll()
            .then(Users => reply.status(200).send(Users))
            .catch(error => reply.status(400).send(error));
    },
    login(req, reply) {
        return Users
            .findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then(Users => {
                if (!Users) {
                    return reply.status(400).send({
                        message: "Email Id is Not Found",
                        message: "Please enter valied email id"
                    })
                }
                else {
                    if (bcrypt.compareSync(req.body.password, Users.encrypted_password)) {
                        return reply.status(200).send({
                            message: 'You are Successfully logged in 👍'
                        })
                    }
                    else {
                        reply.status(400).send({
                            message: "Invalid Password"
                        })
                    }
                }
            })
            .catch(error => reply.status(400).send(error));
    }
}
```

STEP 1: In the above program we checks the email id fist, if the req.body.email equal to Users.email then we move to next step. 

STEP 2: Now we checking our database's encrypted_password with req.body.password. 

STEP 3: To do this, first we have to convert the req.body.password to encrypted_password then we can compare the req.body.password with Users.Password. 

STEP 4: To do this we can use bcyript.compare funciton. 

```
 if (bcrypt.compareSync(req.body.password, Users.encrypted_password)) {
                        return reply.status(200).send({
                            message: 'You are Successfully logged in 👍'
                        })
                    }
                    else {
                        reply.status(400).send({
                            message: "Invalid Password"
                        })
                    }
```

#### GENERATE JWTs TOKEN: 

STEP 1: First we have to install the npm package jsonwebtoken

```
$ npm install jsonwebtoken
```

STEP 2: And improt it into our server.js file. 

```
const jwt = require('jsonwebtoken'); 
```

STEP 3: To sign a token, you will need to have three pieces of information. 

1: The token secret
2: The piece of data to hase in the token. 
3: The token expire time


STEP 4: The token string is a long random string used to encrype and decrypt the data. 

STEP 5: To generate this secret, there is node.js built in library called crypto library. 

STEP 6: We have to create .env file to store secret_token.

```
server.js

const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET_TOKEN = require('crypto').randomBytes(64).toString('hex');
fs.writeFile('.env', SECRET_TOKEN, function (err) {
    if (err) return console.log(err);
})
const PORT = 4000;
```

STEP 6: When we start our server the SECRET_TOKEN will be created and this TOKEN will be stored into the .env file.

#### DOTENV INSTALLATION: 

STEP1: First we have to install dotenv file.

```
$ npm install dotenv
```

STEP 2: Then we have to import this file to our controllers' Users file. 


#### --------------------------------------------------------------------- ####

# library API

#### Description
- Develop a CRUD for Books 
- Authenticate user and only the authenticated user should perform the CRUD
- Authorise user login using JWT Token

## Pre-requisities

- Create a New Directory for the Project
- Make sure Node.JS and NPM is installed in your system
- Run the following command to initialise the projec
t

npm init -y

The above command will generate a "package.json" file

##### Install nodemo
n

npm i -D nodemon

Install Nodemon to auto restart the server when the code is changed.

- Add the following lines in the "package.json" fil
e

"scripts": {
"start": "node server",
"dev": "nodemon server"
},


##### Install fastif
y

npm i fastify --save


##### Install postgresql hstore globall
y

npm i sequelize pg pg-hstore


##### Install sequelize
- Sequelize is an ORM.
 

npm i sequelize-cli
npm i sequelize-fastify


##### Create .sequelizerc file

- It is used for assigning the directory path for sequelize files in our application
.

const path = require("path");

module.exports = {
  config: path.resolve("./db", "config.json"),
  "models-path": path.resolve("./app/models"),
  "seeders-path": path.resolve("./db/seeders"),
  "migrations-path": path.resolve("./db/migrations"),
};


##### Initialise Sequeliz
e

npx sequelize init


### Work Flow
- Install Postgresql
- Create a DB
- Generate Models & Migrations
- Generate Seeders
- Migrate the DB
- Seed the DB
- CRUD for Books
- Authenticate User using Login
- Authorise User using JWT
- Run the Server
