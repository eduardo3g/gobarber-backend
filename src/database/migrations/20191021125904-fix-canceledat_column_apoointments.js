module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn(
      'appointments',
      'cancelede_at',
      'canceled_at'
    );
  },
};
