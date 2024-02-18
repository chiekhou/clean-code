const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Learning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Dans le modèle Learning
Learning.belongsTo(models.Cards, { foreignKey: 'cardId' });
    }
  }
  Learning.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    isValid: {
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Learning',
  });
  return Learning;
};
