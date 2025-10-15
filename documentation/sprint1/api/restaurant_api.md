
# Restaurant API Documentation

Unless specified otherwise, parameters are sent through request body.

## POST /v1/restaurant
Creates a new restaurant
### Parameters:
#### **userID** (*Int*)
The ID of the user who will own this restaurant
#### **name** (*String*)
The name of restaurant (1 - 50 characters)
#### **address** (*String*)
The address of the restaurant
#### **phone** (*String*)
The phone number of the restaurant
#### **desc** (*String*)
A description of the restaurant (10 - 400 characters)
#### **hours** (*String*)
A JSON format string containing the open and close times each day  
Ex: {"sunday":{"open":"8:30", "close":"22:30"},
     "monday":{"open":"7:30", "close":"24:00"},
     ...}
### Responses:
#### 201: Restaurant created successfully
Returns the created restaurant:  
{ restID: (*Int*), userID: (*Int*), name: (*String*), address: (*String*), phone_num: (*String*), description: (*String*), open_hours: (*String*), logo: (*String*) }
#### 400: Invalid item in request
#### 404: User cannot be found
#### 409: User already owns a restaurant
#### 500: Internal server error

## GET /v1/restaurant
Get a list of all restaurants
### Parameters:
#### None
### Responses:
#### 200: Found a list of restaurants
Returns the list of restaurants:  
{ restaurants:[ { id: (*Int*), name: (*String*), address: (*String*), phone_num: (*String*), description: (*String*), tags:[ (*Strings*) ] }, {...} ] }
#### 500: Internal server error

## GET /v1/restaurant/{id}
Get all details of a specific restaurant  
Ex: GET /v1/restaurant/12
### Parameters:
#### None
### Responses:
#### 200: Found the restaurant
Returns the specified restaurant:  
{ restID: (*Int*), userID: (*Int*), name: (*String*), address: (*String*), phone_num: (*String*), description: (*String*), open_hours: (*String*), logo: (*String*), tags:[ (*Strings*) ] }
#### 404: Restaurant cannot be found
#### 500: Internal server error

## PATCH /v1/restaurant/change
Update the information of a restaurant
### Parameters:
#### **restID** (*Int*)
The ID of the restaurant being changed
#### **name** (*String*)
The name of restaurant (1 - 50 characters)
#### **address** (*String*)
The address of the restaurant
#### **phone** (*String*)
The phone number of the restaurant
#### **desc** (*String*)
A description of the restaurant (10 - 400 characters)
#### **hours** (*String*)
A JSON format string containing the open and close times each day  
Ex: {"sunday":{"open":"8:30", "close":"22:30"},
     "monday":{"open":"7:30", "close":"24:00"},
     ...}
### Responses:
#### 200: Restaurant changed successfully
Returns the changed restaurant:  
{ restID: (*Int*), userID: (*Int*), name: (*String*), address: (*String*), phone_num: (*String*), description: (*String*), open_hours: (*String*), logo: (*String*), tags:[ (*Strings*) ] }
#### 400: Invalid item in request
#### 404: Restaurant cannot be found
#### 500: Internal server error
