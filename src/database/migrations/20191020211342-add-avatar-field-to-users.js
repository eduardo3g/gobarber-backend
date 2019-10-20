module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // table this migration will change
      'avatar_id', // name of the column this migration will add to the table
      {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' }, // foreign key
        onUpdate: 'CASCADE', // all changes made to the file will replicate to the users table
        onDelete: 'SET NULL', // set null if the file is deleted
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
