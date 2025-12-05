## [**User API**](user_api.md)

| Method | Endpoint                    | Link                                                           |
| ------ | --------------------------- | -------------------------------------------------------------- |
| POST   | `/v1/user/`                 | [Create User](./user_api.md#post-v1user)                       |
| POST   | `/v1/user/login`            | [Login](./user_api.md#post-v1userlogin)                        |
| DELETE | `/v1/user/:userID`          | [Delete User](./user_api.md#delete-v1useruserid)               |
| PATCH  | `/v1/user/change/firstname` | [Update First Name](./user_api.md#patch-v1userchangefirstname) |
| PATCH  | `/v1/user/change/lastname`  | [Update Last Name](./user_api.md#patch-v1userchangelastname)   |
| PATCH  | `/v1/user/change/email`     | [Update Email](./user_api.md#patch-v1userchangeemail)          |
| PATCH  | `/v1/user/change/password`  | [Update Password](./user_api.md#patch-v1userchangepassword)    |

---

## [**Restaurant API**](restaurant_api.md)

| Method | Endpoint                            | Link                                                                          |
| ------ | ----------------------------------- | ----------------------------------------------------------------------------- |
| POST   | `/v1/restaurant/`                   | [Create Restaurant](./restaurant_api.md#post-v1restaurant)                    |
| PATCH  | `/v1/restaurant/change/name`        | [Change Name](./restaurant_api.md#patch-v1restaurantchangename)               |
| PATCH  | `/v1/restaurant/change/address`     | [Change Address](./restaurant_api.md#patch-v1restaurantchangeaddress)         |
| PATCH  | `/v1/restaurant/change/phone`       | [Change Phone](./restaurant_api.md#patch-v1restaurantchangephone)             |
| PATCH  | `/v1/restaurant/change/description` | [Change Description](./restaurant_api.md#patch-v1restaurantchangedescription) |
| PATCH  | `/v1/restaurant/change/tags`        | [Change Tags](./restaurant_api.md#patch-v1restaurantchangetags)               |
| PATCH  | `/v1/restaurant/change`             | [Bulk Update](./restaurant_api.md#patch-v1restaurantchange)                   |
| GET    | `/v1/restaurant/`                   | [Get All Restaurants](./restaurant_api.md#get-v1restaurant)                   |
| GET    | `/v1/restaurant/:id`                | [Get Restaurant by ID](./restaurant_api.md#get-v1restaurantid)                |
| GET    | `/v1/restaurant/user/:id`           | [Get Restaurant by User](./restaurant_api.md#get-v1restaurantuserid)          |

---

## [**Menu API**](menu_api.md)

| Method | Endpoint                              | Link                                                                    |
| ------ | ------------------------------------- | ----------------------------------------------------------------------- |
| POST   | `/v1/menu/:restID`                    | [Create Menu Item](./menu_api.md#post-v1menurestid)                     |
| GET    | `/v1/menu/:restID`                    | [Get All Menu Items](./menu_api.md#get-v1menurestid)                    |
| GET    | `/v1/menu/:restID/:itemID`            | [Get Menu Item](./menu_api.md#get-v1menurestiditemid)                   |
| PATCH  | `/v1/menu/:restID/change/name`        | [Update Name](./menu_api.md#patch-v1menurestidchangename)               |
| PATCH  | `/v1/menu/:restID/change/price`       | [Update Price](./menu_api.md#patch-v1menurestidchangeprice)             |
| PATCH  | `/v1/menu/:restID/change/description` | [Update Description](./menu_api.md#patch-v1menurestidchangedescription) |
| PATCH  | `/v1/menu/:restID/change/category`    | [Update Category](./menu_api.md#patch-v1menurestidchangecategory)       |
| DELETE | `/v1/menu/:restID/:itemID`            | [Delete Menu Item](./menu_api.md#delete-v1menurestiditemid)             |

---

## [**Schedule API**](schedule_api.md)

| Method | Endpoint                                 | Link                                                                        |
| ------ | ---------------------------------------- | --------------------------------------------------------------------------- |
| PUT    | `/v1/restaurant/schedule`                | [Update Schedule](./schedule_api.md#put-restaurantschedule)                 |
| GET    | `/v1/restaurant/schedule`                | [Get Schedule for a Day](./schedule_api.md#get-restaurantschedule)          |
| GET    | `/v1/restaurant/schedule/weekly/:restID` | [Get Weekly Schedule](./schedule_api.md#get-restaurantscheduleweeklyrestid) |

---

## [**Reservation API**](reservation_api.md)

| Method | Endpoint                             | Link                                                                                     |
| ------ | ------------------------------------ | ---------------------------------------------------------------------------------------- |
| POST   | `/v1/reservation/ticket`             | [Get Reservation Tickets](./reservation_api.md#post-v1reservationticket)                 |
| POST   | `/v1/reservation/create`             | [Create Reservation](./reservation_api.md#post-v1reservationcreate)                      |
| GET    | `/v1/reservation/user/:userID`       | [Get Reservations by User](./reservation_api.md#get-v1reservationuseruserid)             |
| GET    | `/v1/reservation/restaurant/:restID` | [Get Reservations by Restaurant](./reservation_api.md#get-v1reservationrestaurantrestid) |
| DELETE | `/v1/reservation/delete/:reserveID`  | [Delete Reservation](./reservation_api.md#delete-v1reservationdeletereserveid)           |


---

## [**Floorplan API**](./floorplan_api.md)
| **Method** | **Endpoint**                   | **Link**                                                        |
| ---------- | ------------------------------ | --------------------------------------------------------------- |
| **PUT**    | `/v1/floorplan/walls/:restID`  | [Update Walls](./floorplan_api.md#put-v1floorplanwallsrestid)   |
| **PUT**    | `/v1/floorplan/layout/:restID` | [Update Layout](./floorplan_api.md#put-v1floorplanlayoutrestid) |
| **GET**    | `/v1/floorplan/walls/:restID`  | [Get Walls](./floorplan_api.md#get-v1floorplanwallsrestid)      |
| **GET**    | `/v1/floorplan/layout/:restID` | [Get Layout](./floorplan_api.md#get-v1floorplanlayoutrestid)    |


