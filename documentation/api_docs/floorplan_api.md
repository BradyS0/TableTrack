

# **Floorplan API Documentation**

**Base URL:** `/v1/floorplan`

---

## **PUT [/v1/floorplan/walls/:restID]()**

Update the walls (floorplan) for a restaurant.

### **Description**

Updates the list of wall points that define the restaurant’s floorplan boundary.
Validates the polygon and replaces the existing one.
The array must contain at least three pairs of json containing valid `pos.x` and `pos.y`.

### **Request Body**

```json
{
  "floorplan": [ {"pos.x":number,"pos.y":number}, ...]
}
```

### **Responses**

* **201 Created** – Walls successfully added
* **400 Bad Request** – Invalid wall structure
* **404 Not Found** – Restaurant cannot be found
* **500 Internal Server Error** – Unknown error

---

## **PUT [/v1/floorplan/layout/:restID]()**

Update the tables and miscellaneous items in the restaurant’s floorplan layout.

### **Description**

Replaces all tables and misc items.
Each entry is validated for type, position, rotation, and data format.

### **Request Body**

```json
{
  "tables": [ ... ],
  "misc": [ ... ]
}
```
```json
  // a table item should look like this
        {
            type: "table",
            pos: {
                x: Number,
                y: Number
            },
            rotation: Number, // should be between [-360,360] deg
            data: {
                capacity: Number,
                reservable: Boolean,
            }
        }

// A misc item should look like this

        {
            type: "door",
             pos: {
                x: Number,
                y: Number
            },
            rotation: Number, // should be between [-360,360] deg
            data: {length: Number}
        }
// or
        {
            type: "window",
             pos: {
                x: Number,
                y: Number
            },
            rotation: Number, // should be between [-360,360] deg
            data: {length: Number}
        }  
```

### **Responses**

* **201 Created** – Layout successfully added
* **400 Bad Request** – Invalid table/misc data
* **404 Not Found** – Restaurant cannot be found
* **500 Internal Server Error** – Unknown error

---

## **GET [/v1/floorplan/walls/:restID]()**

Retrieve the wall polygon for the restaurant.

### **Responses**

* **200 OK** – Returns list of wall points
* **404 Not Found** – Restaurant cannot be found
* **500 Internal Server Error** – Unknown error

### **Returns**

```json
{
  "floorplan": [ ... ]
}
```

---

## **GET [/v1/floorplan/layout/:restID]()**

Retrieve all tables and misc items for the restaurant.

### **Responses**

* **200 OK** – Layout returned
* **404 Not Found** – Restaurant cannot be found
* **500 Internal Server Error** – Unknown error

### **Returns**

```json
{
  "tables": [ ... ],
  "misc": [ ... ]
}
```