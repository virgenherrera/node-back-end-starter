'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('session_histories', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT
			},
			login: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('now()')
			},
			logout: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: null
			},
			user_id: {
				type: Sequelize.UUID,
				allowNull: false,
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				references: {
					model: "users",
					key: "id"
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('session_histories');
	}
};
