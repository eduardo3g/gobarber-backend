module.exports = {
  dialect: 'portgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    udnerscoredAll: true,
  },
};
