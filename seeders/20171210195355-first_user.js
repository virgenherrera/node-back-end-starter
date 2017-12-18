'use strict';
require('ts-node').register();
const { obfuscatePassword } = require('../src/Lib/passwordUtil');
const UUID = require('uuid/v4');
const adminUser = {
	first_name: 'Admin Name',
	last_name: 'Admin Last Name',
	email: 'admin@admin.com',
	password: '111111',
	role: 'admin',
};

module.exports = {
	up: (queryInterface, Sequelize) => {
		adminUser.id = UUID();
		adminUser.password = obfuscatePassword( adminUser.password );
		return queryInterface.bulkInsert('users', [ adminUser ],{});
	},

	down: (queryInterface, Sequelize) => {
		delete adminUser.password;
		return queryInterface.bulkDelete('users', adminUser );
	}
};
