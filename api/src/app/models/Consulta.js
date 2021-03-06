import Sequelize, { Model } from 'sequelize';

class Consulta extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.STRING,
        hora: Sequelize.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'consultas',
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
  }


}

export default Consulta;
