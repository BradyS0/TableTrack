# **Restaurant API Documentation**

**Base URL:** `/v1/restaurant`

---

## **POST [/v1/restaurant/]()**

Create a new restaurant.

### **Request Body**

```json
{
  "userID": number,
  "name": "string",
  "address": "string",
  "phone": "string",
  "tags": ["optional", "string"]
}
```

### **Validation**

* `name` must be 1-50 charachters long
* `address` must be valid
* `phone` must be valid (111)-111-1111
* `tags` (if provided) must be a valid array of strings
* `userID` must refer to an existing user
* A user may own *only one* restaurant *for current implementation*

### **Responses**

#### **201 Created**

Restaurant successfully created.

#### **400 Bad Request**

Invalid fields (`name`, `address`, `phone`, `tags`).

#### **404 Not Found**

User does not exist.

#### **409 Conflict**

User already owns a restaurant.

#### **500 Internal Error**

Unexpected server error.

---

## **PATCH [/v1/restaurant/change/name]()**

Update the name of a restaurant.

### **Request Body**

```json
{
  "restID": number,
  "name": "string"
}
```

### **Responses**

#### **201 Updated**

Restaurant name successfully updated.

#### **400 Bad Request**

Invalid or duplicate name.

#### **404 Not Found**

Restaurant not found.

---

## **PATCH [/v1/restaurant/change/address]()**

Update the address of a restaurant.

### **Request Body**

```json
{
  "restID": number,
  "address": "string"
}
```

### **Responses**

#### **201 Updated**

Restaurant address updated.

#### **400 Bad Request**

Invalid or duplicate address.

#### **404 Not Found**

Restaurant not found.

---

## **PATCH [/v1/restaurant/change/phone]()**

Update the phone number of a restaurant.

### **Request Body**

```json
{
  "restID": number,
  "phone": "string"
}
```

### **Responses**

#### **201 Updated**

Phone number updated.

#### **400 Bad Request**

Invalid or duplicate phone number.

#### **404 Not Found**

Restaurant not found.

---

## **PATCH [/v1/restaurant/change/description]()**

Update the description of a restaurant.

### **Request Body**

```json
{
  "restID": number,
  "description": "string"
}
```

### **Responses**

#### **201 Updated**

Restaurant description updated.

#### **400 Bad Request**

Invalid description format.

#### **404 Not Found**

Restaurant not found.

---

## **PATCH [/v1/restaurant/change/tags]()**

Update a restaurant's tag list.

### **Request Body**

```json
{
  "restID": number,
  "tags": ["string"]
}
```

### **Validation**

* `tags` must be an array
* Each tag must contain only letters or hyphens
* Must be 3–30 characters long

### **Responses**

#### **201 Updated**

Restaurant tags updated.

#### **406 Not Acceptable**

Tags were not provided as an array.

#### **400 Bad Request**

Invalid tag syntax.

#### **404 Not Found**

Restaurant not found.

---

## **GET [/v1/restaurant/]()**

Retrieve a list of all restaurants.

### **Responses**

#### **200 OK**

Returns:

```json
{
  "restaurants": [
    { 
        "restID" : number,
        "userID" : userID,
        "name" : "string",
        "address" : "string",
        "phone" : "string",
        "hours" : "string",  ///e.g ("8:00 - 22:05" || "Closed")
        "tags" : ["string"],
        "logo" : "string",
    },
    ...
  ]
}
```

#### **500 Internal Error**

Unexpected server error.

---

## **GET [/v1/restaurant/:id]()**

Retrieve a specific restaurant by ID.

### **URL Params**

`id` — integer

### **Responses**

#### **200 OK**

```json
{ 
    "restID" : number,
    "userID" : userID,
    "name" : "string",
    "address" : "string",
    "phone" : "string",
    "hours" : "string",  ///e.g ("8:00 - 22:05" || "Closed")
    "tags" : ["string"],
    "logo" : "string",
}
```

#### **404 Not Found**

Restaurant not found.

---

## **GET [/v1/restaurant/user/:id]()**

Retrieve the restaurant owned by a specific user.

### **URL Params**

`id` — integer (userID)

### **Responses**

#### **200 OK**

```json
{ 
    "restID" : number,
    "userID" : userID,
    "name" : "string",
    "address" : "string",
    "phone" : "string",
    "hours" : "string",  ///e.g ("8:00 - 22:05" || "Closed")
    "tags" : ["string"],
    "logo" : "string",
}
```

#### **404 Not Found**

No restaurant found for the user.

---

## **PATCH [/v1/restaurant/change]()**

Bulk update a restaurant (name, address, phone, description).

### **Request Body**

```json
{
  "restID": number,
  "name": "string",
  "address": "string",
  "phone": "string",
  "desc": "string"
}
```

### **Responses**

#### **200 OK**

Returns updated restaurant object.

#### **400 Bad Request**

One or more fields are invalid.

#### **404 Not Found**

Restaurant not found.
