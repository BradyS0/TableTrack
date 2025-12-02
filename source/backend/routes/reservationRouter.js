import express from "express";
import { Schedule, Restaurant, User, Reservation } from "../db/models/index.js";
import ReservationLogic from "../logic/reservationLogic.js";

const router = express.Router();

// POST /v1/reservation/ticket
// Request Body: restID, tableID, date_stamp
// sends: 200 ok + [available tickets]
router.post("/ticket", async (req, res) => {
  let { restID, tableID, date_stamp } = req.body;
  try {
    restID = ReservationLogic.validate_int(restID, "restaurant");
    tableID = ReservationLogic.validate_int(tableID, "table");

    const rest = await Restaurant.get_by_id(restID);
    if (!rest) return res.status(404).json({ error: "Restaurant not found." });

    //TO-DO: validate the table

    const date = ReservationLogic.validate_date(date_stamp);
    const schedule = await Schedule.get_day(restID, date.getDay());

    console.log("DB TEST::::",date_stamp,'-+-',date.toDateString(),' ',schedule)

    if (schedule.open === schedule.close)
      return res
        .status(200)
        .json({ tickets: [], message: "restaurant closed" });

    let reserved = await Reservation.get_all_table_reservations_for_day(
      restID,
      tableID,
      date
    );
    //build a list of time floats from the reserved date_stamps
    reserved = reserved.map((r) => {
      const d = new Date(r.date_stamp);
      return d.getHours() + d.getMinutes() / 60;
    });

    let tickets = ReservationLogic.generate_reservation_tickets(
      schedule.open,
      schedule.close,
      reserved
    );

    //convert tickets back into timestamps from floats
    tickets = tickets.map((t) => {
      const ds = new Date(date);

      const hours = Math.floor(t);
      const minutes = Math.round((t % 1) * 60);

      ds.setHours(hours, minutes, 0, 0);

      return ds;
    });

    return res.status(200).json({ tickets });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// POST /v1/reservation/create
// Request Body: restID, userID, tableID, date_stamp, capacity
// sends : 201 created
router.post("/create", async (req, res) => {
  let { restID, userID, tableID, date_stamp, capacity } = req.body;

  try {
    restID = ReservationLogic.validate_int(restID, "restaurant");
    userID = ReservationLogic.validate_int(userID, "user");
    tableID = ReservationLogic.validate_int(tableID, "table");
    capacity = ReservationLogic.validate_guest_amount(capacity);

    const user = await User.get_by_id(userID);
    if (!user) return res.status(404).json({ error: "User not found." });

    const rest = await Restaurant.get_by_id(restID);
    if (!rest) return res.status(404).json({ error: "Restaurant not found." });

    let date = ReservationLogic.validate_date(date_stamp);
    date = ReservationLogic.create_date_stamp(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    );

    //TO-DO: get table info and match table capacity with given capacity

    let reserved = await Reservation.get_all_table_reservations_for_day(
      restID,
      tableID,
      date_stamp
    );

    //build a list of time floats from the reserved date_stamps
    reserved = reserved.map((r) => {
      const d = new Date(r.date_stamp);
      return d.getHours() + d.getMinutes() / 60;
    });

    let reserved_time = date.getHours() + date.getMinutes() / 60;
    let is_overlapped = ReservationLogic.validate_reservation_time(
      reserved_time,
      reserved
    );

    if (is_overlapped)
      return res.status(400).json({ error: "Reservation time already booked" });

    const reservation = await Reservation.create_new(
      restID,
      userID,
      tableID,
      date
    );

    if (!reservation)
      return res.status(400).json({ message: `Failed to created reservation` });

    return res
      .status(201)
      .json({ message: `Reservation made successfully for ${date}` });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// GET /v1/reservation/user/userID
// sends: 200 ok + [list of reservations of the user]
router.get("/user/:userID", async (req, res) => {
  let { userID } = req.params;

  try {
    userID = ReservationLogic.validate_int(userID, "user");
    const user = await User.get_by_id(userID);
    if (!user) return res.status(404).json({ error: "User not found." });

    const reservations = await Reservation.get_all_user_reservations(userID);
    // const out = reservations.map(r => r.get({ plain: true }));

    return res.status(200).json({ reservations: reservations });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// GET /v1/reservation/restaurant/restID
// Sends : 200 ok + [list of reservations of the restaurants]
router.get("/restaurant/:restID", async (req, res) => {
  let { restID } = req.params;

  try {
    restID = ReservationLogic.validate_int(restID, "restaurant");
    const rest = await Restaurant.get_by_id(restID);
    if (!rest) return res.status(404).json({ error: "Restaurant not found." });

    const reservations = await Reservation.get_all_restaurant_reservations(
      restID
    );

    return res.status(200).json({ reservations: reservations });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// DELETE /v1/reservation/reserveID
// Request Body: restID, userID
router.delete("/delete/:reserveID", async (req, res) => {
  let { reserveID } = req.params;
  let {restID,userID} = req.body

  try {
    reserveID = ReservationLogic.validate_int(reserveID, "reservation");
    restID = ReservationLogic.validate_int(restID, "restaurant");
    userID = ReservationLogic.validate_int(userID, "user");

    const result = await Reservation.delete_reserved(reserveID, restID, userID);

    if (!result)
      return res.status(400).json({ error: "Failed to cancel reservation" });

    return res.status(200).json({ message: "Reservation successfully removed" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// PATCH /v1/reservation/update/status
// Request Body: reserveID, status
// sends: 201
router.patch("/update/status", async (req, res) => {});

// PATCH /v1/reservation/change/old_reserveID
// Request Body: restID, tableID, date, date_stamp
// sends: 201
router.patch("/change/:old_reserveID", async (req, res) => {});

export default router;
