# node-starter
a tool for begin a node js Web project

## Project Setup
These dependencies must be installed globally as the initial step to configure the project environment.
- nodemon
- forever
- sequelize-cli

### Step 1:
`npm i -g nodemon@1.11.0 forever@0.15.3 sequelize-cli@2.7.0 gulp-cli@1.4.0`

### Step 2:
The rest of the dependencies of this project and the initial pre-configuration will be installed running the command:
`npm i`

### Step 3:
provide this project with your own Environment variables in the following files:
- `.env` (Application Server Config)
- `/src/config/db.json` (db connection settings from an _empty_ existing db)
