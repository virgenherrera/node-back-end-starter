'use strict';
const fs		= require('fs');
const path		= require('path');
const basename	= path.basename( module.filename );
let tasks		= {};

fs
.readdirSync(__dirname)
.filter( file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') )
.forEach( file => tasks[ file.split('.').shift() ]	= require( `./${file}` ) );

module.exports = tasks;
