import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const Reservation = sequelize.define("Reservation",
  {
    reservationID: {
      type: DataTypes.STRING(7),
      allowNull: false,
      unique: true,
      defaultValue: sequelize.literal("substring(md5(random()::text), 1, 7)"), //auto generate 7 digit unique code using postgres
    },

    restID:  { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull : false,
        references: { model: 'Restaurants', key: "restID" },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
     },

    tableID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userID:  { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        references: { model: 'User', key: "userID" },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
     },

    dateStamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    guestAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, 
      validate: {min: 1},
    },

    status: {
      type: DataTypes.ENUM("ok", "needs-attention"),
      allowNull: false,
      defaultValue: "ok",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["restID", "tableID", "dateStamp"]
      },
    ],
  }
);