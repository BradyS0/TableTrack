# **Menu API Documentation**

**Base URL:** `/v1/menu`

---

## **POST [/v1/menu/:restID](##)**

Create a new menu item for a restaurant.

### **URL Params**

`restID` — integer

### **Request Body**

```json
{
  "name": "string",
  "price": "string | number",
  "description": "string",
  "category": "string"
}
```

### **Validation**

- `restID` must be a number
- Restaurant must exist
- `name` must be valid
- `price` must be convertible to money
- `description` must be valid
- `category` must be valid

### **Responses**

#### **201 Created**

```json
{
    "itemID" : number,
    "restID" : number,
    "name" : "string",
    "price" : number,
    "description" : "string",
    "category" : "string",
}
```

#### **400 Bad Request**

Invalid restaurant ID, item fields, or money format.

#### **404 Not Found**

Restaurant not found.

---

## **GET [/v1/menu/:restID](##)**

Retrieve the full menu for a restaurant.

### **URL Params**

`restID` — integer

### **Responses**

#### **200 OK**

```json
{ "menu": [ 
    {
        "itemID" : number,
        "restID" : number,
        "name" : "string",
        "price" : number,
        "description" : "string",
        "category" : "string",
    },
    {...},
    ...,
    ] 
}
```

#### **400 Bad Request**

Invalid restaurant ID.

#### **404 Not Found**

Restaurant not found.

---

## **GET [/v1/menu/:restID/:itemID](##)**

Retrieve a specific menu item.

### **URL Params**

`restID` — integer
`itemID` — integer

### **Responses**

#### **200 OK**

Returns the menu item.

#### **400 Bad Request**

Invalid restaurant or item ID.

#### **404 Not Found**

Restaurant not found.

#### **400 Bad Request**

Item does not exist for that restaurant.

---

## **PATCH [/v1/menu/:restID/change/name](##)**

Update the **name** of a menu item.

### **Request Body**

```json
{
  "itemID": number,
  "name": "string"
}
```

### **Responses**

#### **200 OK**

```json
{ "message": "Name updated." }
```

#### **400 Bad Request**

Invalid IDs or invalid name.

#### **404 Not Found**

Menu item not found.

---

## **PATCH [/v1/menu/:restID/change/price](##)**

Update the **price** of a menu item.

### **Request Body**

```json
{
  "itemID": number,
  "price": "string | number"
}
```

### **Responses**

#### **200 OK**

```json
{ "message": "Price updated." }
```

#### **400 Bad Request**

Invalid IDs or invalid price.

#### **404 Not Found**

Menu item not found.

---

## **PATCH [/v1/menu/:restID/change/description](##)**

Update the **description** of a menu item.

### **Request Body**

```json
{
  "itemID": number,
  "description": "string"
}
```

### **Responses**

#### **200 OK**

```json
{ "message": "Description updated." }
```

#### **400 Bad Request**

Invalid IDs or invalid description.

#### **404 Not Found**

Menu item not found.

---

## **PATCH [/v1/menu/:restID/change/category](##)**

Update the **category** of a menu item.

### **Request Body**

```json
{
  "itemID": number,
  "category": "string"
}
```

### **Responses**

#### **200 OK**

```json
{ "message": "Category updated." }
```

#### **400 Bad Request**

Invalid IDs or invalid category.

#### **404 Not Found**

Menu item not found.

---

## **DELETE [/v1/menu/:restID/:itemID](##)**

Delete a menu item.

### **URL Params**

`restID` — integer
`itemID` — integer

### **Responses**

#### **204 No Content**

Menu item successfully deleted.

#### **400 Bad Request**

Invalid restaurant or item ID.

#### **404 Not Found**

Menu item was not found.
