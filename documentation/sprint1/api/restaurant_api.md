
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
#### **tags** (*\[String\]*)
Array of descriptive tags to aid in searching

### Responses:
#### 201: Restaurant created successfully
Returns the created restaurant
#### 400: Invalid item in request
#### 404: User cannot be found
#### 409: User already owns a restaurant
#### 500: Internal server error



## PATCH /v1/restaurant/change/name
Changes the name of a restaurant

### Parameters:
#### **restID** (*Int*)
The ID of the restaurant to change
#### **name** (*String*)
The new name of the restaurant

### Responses:
#### 201: Change made successfully
#### 400: Invalid item in request
#### 404: Restaurant not found
#### 500: Unexpected internal error



## PATCH /v1/restaurant/change/address
Changes the address of a restaurant

### Parameters:
#### **restID** (*Int*)
The ID of the restaurant to change
#### **address** (*String*)
The new address of the restaurant

### Responses:
#### 201: Change made successfully
#### 400: Invalid item in request
#### 404: Restaurant not found
#### 500: Unexpected internal error



## PATCH /v1/restaurant/change/phone
Changes the phone num of a restaurant

### Parameters:
#### **restID** (*Int*)
The ID of the restaurant to change
#### **phone** (*String*)
The new phone num of the restaurant

### Responses:
#### 201: Change made successfully
#### 400: Invalid item in request
#### 404: Restaurant not found
#### 500: Unexpected internal error



## PATCH /v1/restaurant/change/description
Changes the description of a restaurant

### Parameters:
#### **restID** (*Int*)
The ID of the restaurant to change
#### **description** (*String*)
The new description of the restaurant

### Responses:
#### 200: Change made successfully
#### 400: Invalid item in request
#### 404: Restaurant not found
#### 500: Unexpected internal error



## PATCH /v1/restaurant/change/tags
Changes the tags of a restaurant

### Parameters:
#### **restID** (*Int*)
The ID of the restaurant to change
#### **tags** (*\[String\]*)
The new tags of the restaurant

### Responses:
#### 200: Change made successfully
#### 400: Invalid item in request
#### 404: Restaurant not found
#### 406: Invalid tags data type
#### 500: Unexpected internal error



## GET /v1/restaurant
Get a list of all restaurants

### Parameters:
#### None

### Responses:
#### 200: Found a list of restaurants
Returns the list of restaurants
#### 500: Internal server error



## GET /v1/restaurant/{id}
Get all details of a specific restaurant  
Ex: GET /v1/restaurant/12

### Parameters:
#### None

### Responses:
#### 200: Found the restaurant
Returns the specified restaurant
#### 404: Restaurant cannot be found
#### 500: Internal server error



## GET /v1/restaurant/user/{id}
Get the restaurant owned by a user
Ex: GET /v1/restaurant/user/12

### Parameters:
#### None

### Responses:
#### 200: Found the restaurant
Returns the specified restaurant
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

### Responses:
#### 200: Restaurant changed successfully
Returns the changed restaurant
#### 400: Invalid item in request
#### 404: Restaurant cannot be found
#### 500: Internal server error
