import express from "express";
import { Schedule, Restaurant, User, Reservation } from "../db/models/index.js";
import TimeLogic from "../logic/timeLogic.js";


// POST /v1/reservation/ticket
// Request Body: restID, tableID, date_stamp
// sends: 200 ok + [available timeslots]

// POST /v1/reservation/create
// Request Body: restID, userID, tableID, date_stamp
// sends : 201 created

// GET /v1/reservation/user/userID
// sends: 200 ok + [list of reservations of the user]
 
// GET /v1/reservation/restaurant/restID
// Sends : 200 ok + [list of reservations of the restaurants]

// PATCH /v1/reservation/update/status
// Request Body: reserveID, status
// sends: 201

// PATCH /v1/reservation/change/old_reserveID
// Request Body: restID, tableID, date, date_stamp
// sends: 201

// DELETE /v1/reservation/reserveID
// Request Body: restID, userID
