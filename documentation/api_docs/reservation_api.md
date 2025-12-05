# **Reservation API Documentation**

Base URL: `/v1/reservation`

---

## **POST [/v1/reservation/ticket](##)**

Retrieve available reservation tickets for a specific table on a given date.

### **Request Body**

```json
{
  "restID": number,
  "tableID": number,
  "date_stamp": "ISO date string"
}
```

### **Description**

* Validates `restID`, `tableID`.
* Confirms the restaurant exists.
* Confirms the table exists and is reservable.
* Validate `date_stamp` it can be any date from tomorrow onwards. *it can be any value that can be casted into a valid date by js `Date()` function*
* Checks the restaurant schedule for that day.
* Fetches all reservations for the table on the given date.
* Attempts to generate a list of available time slots (“tickets”), t doesn't overlap.
* Returns the tickets converted into timestamps.

### **Responses**

#### **200 OK**

```json
{
  "tickets": [ "2026-01-01T10:00:00.000Z", ... ]
}
```

If the restaurant is closed:

```json
{
  "tickets": [],
  "message": "restaurant closed"
}
```

#### **400 Bad Request**

```json
{ "error": "Invalid restaurant id." }
```

#### **404 Not Found**

```json
{ "error": "Restaurant not found." }
```

---

## **POST [/v1/reservation/create](##)**

Create a new reservation.

### **Request Body**

```json
{
  "restID": number,
  "userID": number,
  "tableID": number,
  "date_stamp": "ISO date string",
  "capacity": number
}
```

### **Description**

* Validates all IDs and guest amount.
* Confirms user and restaurant exist.
* Normalizes the provided date into a proper date stamp.
* Validates that the table exists and is reservable.
* Ensures the requested capacity does not exceed the table's max capacity.
* Checks if the reservation overlaps with the times of any existing table for the requested day and time. It should also not overlap within 2hrs of any existing reservations.
* > ! Need to have protection for possible overlapping concurrent reservation requests

### **Responses**

#### **201 Created**

```json
{
  "message": "Reservation made successfully for Fri Dec 01 2026 10:30:00 GMT..."
}
```

#### **400 Bad Request**

```json
{ "error": "Max capacity of 4 allowed for this table" }
```

#### **404 Not Found**

```json
{ "error": "User not found." }
```

---

## **GET [/v1/reservation/user/:userID](##)**

Retrieve all reservations belonging to a specific user.

### **URL Params**

`userID` — integer

### **Description**

* Validates user ID.
* Confirms user exists.
* Returns all reservations made by that user.

### **Response**

#### **200 OK**

```json
{
  "reservations": [ {reserveID, restID, tableID,
                    date_stamp, "Restaurant.name",
                    "Restaurant.address", "Restaurant.phone"},
                     {...}, ... 
                  ]
}
```

#### **404 Not Found**

```json
{ "error": "User not found." }
```

#### **400 Bad Request**

```json
{ "error": "invalid user id." }
```

---

## **GET [/v1/reservation/restaurant/:restID](##)**

Retrieve all reservations for a specific restaurant.

### **URL Params**

`restID` — integer

### **Description**

* Validates restaurant ID.
* Confirms restaurant exists.
* Retrieves all reservations associated with that restaurant.

### **Response**

#### **200 OK**

```json
{
  "reservations": [ {reserveID, userID, tableID,
                    date_stamp, "User.first_name",
                    "User.last_name", "User.email"},
                     {...}, ... 
                  ]
}
```

#### **404 Not Found**

```json
{ "error": "Restaurant not found." }
```

#### **400 Bad Request**

```json
{ "error": "invalid restaurant id." }
```

---

## **DELETE [/v1/reservation/delete/:reserveID](##)**

Delete an existing reservation.

### **URL Params**

`reserveID` — integer

### **Request Body**

```json
{
  "restID": number,
  "userID": number
}
```

### **Description**

* Validates reservation ID, restaurant ID, and user ID.
* Attempts to delete the reservation with matching identifiers.
* Returns success or failure of the cancellation.

### **Responses**

#### **200 OK**

```json
{
  "message": "Reservation successfully removed"
}
```

#### **400 Bad Request**

```json
{
  "error": "Failed to cancel reservation"
}
```