# **Restaurant Schedule API Documentation**

**Base URL:** `/v1/restaurant/schedule`

---

## **PUT [/v1/restaurant/schedule/](##)**

Update the weekly schedule of a restaurant.

### **Request Body**

```json
{
  "restID": number,
  "schedule": {
    "monday":    { "open": number, "close": number },
    "tuesday":   { "open": number, "close": number },
    "wednesday": { "open": number, "close": number },
    "thursday":  { "open": number, "close": number },
    "friday":    { "open": number, "close": number },
    "saturday":  { "open": number, "close": number },
    "sunday":    { "open": number, "close": number }
  }
}
```

### **Validation Rules**

* `restID` must reference an existing restaurant
* `schedule` must be an object
* Day keys must be weekday names from (Sunday - Saturday) it isn't case-sensitive.
* Any invalid day keys will be ignored without any error.
* If multiple keys of the same day is provided in different letter-cases, only the last instance of it will be persisted, as any previous ones will be overwritten. 
* `open` and `close` must be between **0–24**
* If:

  * `open > close`, or
  * `open == close`, or
  * either value is `-1`
    → the day is treated as **closed**

### **Responses**

#### **201 Created**

```json
{ "message": "X change(s) accepted" }
```

#### **400 Bad Request**

```json
{ "error": "Invalid schedule format" }
```

#### **404 Not Found**

```json
{ "error": "Restaurant cannot be found" }
```

#### **500 Internal Error**

```json
{ "error": "message" }
```

---

## **GET [/v1/restaurant/schedule/](##)**

Retrieve a restaurant’s schedule for a specific day and whether it is currently open.

### **Query Parameters**

```js
restID = number
day    = string (monday–sunday)
```

### **Responses**

#### **200 OK (closed day)**

```json
{
  "open": 0,
  "close": 0,
  "currently_open": false
}
```

#### **200 OK (open day)**

```json
{
  "open": number,
  "close": number,
  "currently_open": true | false //depending on the current time
}
```

#### **400 Bad Request**

```json
{ "error": "Invalid day" }
```

#### **404 Not Found**

```json
{ "error": "Restaurant cannot be found" }
```

#### **500 Internal Error**

```json
{ "error": "message" }
```

---

## **GET [/v1/restaurant/schedule/weekly/:restID](##)**

Retrieve the entire weekly schedule for a restaurant.

### **URL Params**

`restID` — integer

### **Responses**

#### **200 OK**

```json
{
  "restID": number,
  "schedule": {
    "monday":    { "open": number, "close": number },
    "tuesday":   { "open": number, "close": number },
    "wednesday": { "open": number, "close": number },
    "thursday":  { "open": number, "close": number },
    "friday":    { "open": number, "close": number },
    "saturday":  { "open": number, "close": number },
    "sunday":    { "open": number, "close": number }
  }
}
```

#### **404 Not Found**

```json
{ "error": "Restaurant cannot be found" }
```

#### **500 Internal Error**

```json
{ "error": "message" }
```