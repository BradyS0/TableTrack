import { DataTypes } from "sequelize";
import {Op} from "sequelize"
import sequelize from "../db.js";


//create immutable enum like structure
const ALLOWED_STATUS = Object.freeze({
  OK: "ok", 
  NEEDS_ATTENTION : "needs-attention"
});


const Reservation = sequelize.define("Reservation",
  {
    reserveID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    restID:  { 
        type: DataTypes.INTEGER, 
        allowNull : false,
        references: { model: 'Restaurants', key: "restID" },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
     },

    tableID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //TO-DO: references  for FP_Table , tableID
    },

    userID:  { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: 'Users', key: "userID" },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
     },

    date_stamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    guest_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, 
      validate: {min: 1},
    },

    status: {
      type: DataTypes.ENUM(...Object.values(ALLOWED_STATUS)),
      allowNull: false,
      defaultValue: ALLOWED_STATUS.OK,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["restID", "tableID", "date_stamp"]
      },
    ],
  }
);


Reservation.STATUS = ALLOWED_STATUS 


Reservation.create_new = async function (restID, userID, tableID, date_stamp) {
  try {
    return await Reservation.create({
      restID,
      userID,
      tableID,
      date_stamp
    });

  } catch (err) {

    // Unique constraint violation (double booking)
    if (err.name === "SequelizeUniqueConstraintError") {
      throw new Error( "Reservation time already booked");
    }

    // All other errors
    throw new Error(
      "Failed to make reservation, verify the information provided is correct."
    );
  }
};


Reservation.get_all_restaurant_reservations = async function (restID) {
  return await Reservation.findAll({
    where: { restID },
    include : [
      {
        model: sequelize.models.User,
        attributes : ["first_name","last_name","email"]
      }
    ],
    order: [
      ["date_stamp", "ASC"],
      ["tableID", "ASC"]
    ],
    raw: true,
  });
};


Reservation.get_all_user_reservations = async function (userID) {
  return await Reservation.findAll({
    where: { userID },
    include : [
      {
        model: sequelize.models.Restaurant,
        attributes : ["name","phone", "address"]
      }
    ],
    order: [["date_stamp", "ASC"]],
    raw: true,
  });
};


Reservation.get_all_table_reservations_for_day = async function (restID,tableID,date_stamp) {
  const dayStart = new Date(date_stamp);
  const dayEnd = new Date(date_stamp);
  
  dayStart.setHours(0, 0, 0, 0); //yyyy-mm-dd 00:00:00:000 - start of day
  dayEnd.setHours(23, 59, 59, 999); //yyyy-mm-dd 23:59:59:999 - end of day

  return await Reservation.findAll({
    where: {
      restID,
      tableID,
      date_stamp: {
        [Op.between]: [dayStart, dayEnd],
      },
    },
    attributes: ["date_stamp"],
    order: [["date_stamp", "ASC"]],
    raw: true,
  });
};


Reservation.set_reservation_status = async function (reserveID, status) {
  if (!Object.values(ALLOWED_STATUS).includes(status)) {
    throw new Error("Invalid reservation status.");
  }

  const updated = await Reservation.update(
    { status },
    { where: { reserveID } }
  );

  if (!updated[0]) {
    throw new Error("Reservation not found.");
  }

  return true;
};


Reservation.delete_reserved = async function (reserveID,restID,userID) {
  return await Reservation.destroy(
    { where: { reserveID , restID , userID } }
  );
};

export default Reservation;