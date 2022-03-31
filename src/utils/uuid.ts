import { DataTypes } from 'sequelize';

const uuid = {
  allowNull: false,
  autoIncrement: false,
  primaryKey: true,
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  unique: true,
  validate: {
    notEmpty: true,
  },
};

export default uuid;
