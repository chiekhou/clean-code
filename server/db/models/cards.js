const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cards.hasMany(models.Learning, { foreignKey: 'cardId' });
    }
  }
  Cards.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    tag: DataTypes.STRING,
    category: {
   type: DataTypes.ENUM('FIRST','SECOND','THIRD','FOURTH','FIFTH','SIXTH','SEVENTH','DONE'),
      defaultValue: 'FIRST'
    }
  }, {
    sequelize,
    modelName: 'Cards',
  });
  return Cards;
};
