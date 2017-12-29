'use strict';
require('ts-node').register();
const { sequelizeConnection } = require('../src/Sys/sequelizeConnection');
const { User } = require('../src/Model/User');
const adminUser = {
	first_name: 'Admin Name',
	last_name: 'Admin Last Name',
	email: 'admin@admin.com',
	password: '111111',
	role: 'admin',
};

module.exports = {
	up: (queryInterface, Sequelize) => {
		/**
		* Requiring a model way
		*/
		return sequelizeConnection()
		.then(() => User.create(adminUser) )
		.catch(E => console.log(E));
	},

	down: (queryInterface, Sequelize) => {
		/**
		* queryInterface way
		*/
		delete adminUser.password;
		return queryInterface.bulkDelete('users', adminUser );
	}
};
