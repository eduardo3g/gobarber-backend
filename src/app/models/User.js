import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // virtual nunca existirá na base de dados
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // hoock = trecho de código que são executados de forma automática baseada em ações que acontecem no model
    // hoock beforeSave = o trecho será executado antes do salvamento na base de dados
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8); // número da força da criptografia
      }
    });

    return this;
  }

  static associate(models) {
    // hasOne = ID do usuário na tabela files
    // hasMany = ID do usuário em vários registros da tabela files

    // coluna 'avatar_id' (ID do arquivo) na tabela Users
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' }); // as = alias
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash); // retorna true ou false
  }
}

export default User;
