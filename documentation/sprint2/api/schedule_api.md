# Schedule API Documentation

Unless specified otherwise, parameters are sent through request body.



## PUT /v1/restaurant/schedule
Creates or updates a restaurant's schedule

### Parameters:
#### **restID** (*Int*)
The ID of the restaurant to change
#### **schedule** (*Json*)
Each day that should be changed on the schedule
To remove a day, set the open time > close time
Format: { sunday: { open: 9.5, close: 24.0 }, monday: { ... }}

### Responses:
#### 201: Schedule updated successfully
#### 400: Invalid format of schedule
#### 404: Restaurant cannot be found



## GET /v1/restaurant/schedule
Gets the open and close times on a day

### Parameters:
#### **restID** (*Int*)
The ID of the restaurant to get
#### **day** (*Int*)
The day to get from the schedule
(0 - 6) Sunday is 0, Saturday is 6

### Responses:
#### 200: Schedule read successfully
Returns open and close times, and a flag if currently open
#### 400: Invalid day
#### 404: Restaurant cannot be found
