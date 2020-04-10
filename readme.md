# <center> RESTful API </center>


## :page_facing_up: About

This RESTful API is part of the backend of an application that i am developing.

Their sharing aims to show some of the knowledge that i have acquired over the past few months, in which i have dedicated myself to the study of the most varied development technologies for the web.

## :package: Dependencies

Dependencies used for the development of the application.

    - bcryptjs: Password Hashing
    - express: Server Creation
    - jsonwebtoken: JWT Authentication
    - pg: PostgreSQL Client 
    - pg-hstore: Serializing and deserializing JSON data
    - sequelize: ORM
    - sequelize-cli: Sequelize Command Line Interface
    - yup: HTTP Request Validations

## :package: Dev Dependencies

All other dev dependencies, which are not listed below, are merely for linting the code.

    - nodemon: Auto-Reload Application on File Changes
    - sucrase: Import and Export Syntax

## :star: **Features**
This application was developed based on an MVC architecture model (Model, View, Controller).

#### Note: The view will be represented in the application by a web page and possibly a mobile application


### :twisted_rightwards_arrows: **Routes**

#### **Create User**
    
    - Route: http://localhost:3000/login
    - HTTP Method: POST
    - Model: User
    - Controller: UserController


#### **Update User**
    
    - Route: http://localhost:3000/users
    - HTTP Method: PUT
    - Model: User
    - Controller: UserController


#### **Login User**
    
    - Route: http://localhost:3000/login
    - HTTP Method: POST
    - Model: User
    - Controller: LoginController

#### **Authentication Middleware**

    - Global middleware, executed before any user update request
    
    - Its purpose is to validate the authentication of a user, using the token sent in the request authentication header

## :wrench: **Configurations**

### :file_folder: src/config/authConfig.js

    - authConfig.js (already with MD5 Encryption for jwt.sign)
    - database.js (needs username, password and database name)

### :dvd: Deploy

    - yarn (install dependencies listed on packade.json)
    - yarn sequelize db:migrate  (to run migrations)     
    - yarn sequelize db:seed:all (seeds the database)
    - yarn dev (start the application, requires nodemon)