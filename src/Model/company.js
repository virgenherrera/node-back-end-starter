'use strict';
module.exports = (sequelize, DataTypes) => {
	var company = sequelize.define('company', {
		name: DataTypes.STRING,
		namespace: DataTypes.STRING,
		password: DataTypes.STRING,
		enabled: DataTypes.BOOLEAN
	}, {
		classMethods: {
			associate: function(models) {
				// associations can be defined here
			}
		}
	});
	return company;
};
