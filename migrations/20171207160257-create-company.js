'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('companies', {
			id: {
				allowNull: false,
				primaryKey: true,
				defaultValue: UUIDV4,
				type: Sequelize.UUID,
			},
			name: {
				type: Sequelize.STRING
			},
			namespace: {
				type: Sequelize.STRING(45)
			},
			password: {
				type: Sequelize.STRING(255)
			},
			enabled: {
				type: Sequelize.BOOLEAN
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('companies');
	}
};
