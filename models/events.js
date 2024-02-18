'use strict';
const {
  Model
} = require('sequelize');

const format12hr = (hr) => {
  const time = hr.split(":");
  let hour = parseInt(time[0]);
  let min = time[1];
  let ampm = hour === 12 ? "PM" : "AM";

  if(hour > 12) {
    hour = hour == 24 ? 12 : hour % 12;
    ampm = hour === 12 ? "AM" : "PM";
  }

  return `${hour}:${min}${ampm}`;
};
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  }
  Events.init(
    {
      event_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      time: {
        allowNull: false,
        type: DataTypes.TIME,
        get(){
          const time = this.getDataValue('time');
          return format12hr(time);
        }
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      organizer_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "user_id",
          name: "event_organizer",
        },
      },
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};