# **Programming Standards & Style Guide**

This document defines the coding standards for the project.
Its purpose is to ensure **maintainable, readable, and consistent code** across all contributors.

---

# **1. Maintainability & Readability**

### Prefer clarity over complexity

* Write simple and explicit code instead of clever, compact, or overly abstract solutions.
* Optimize for human understanding before performance (unless performance-critical).

### Extract reusable logic

* Move repeated patterns into functions, classes, or shared modules.
* Avoid duplication ("Don't Repeat Yourself" — DRY).

###  Minimize nesting

Use **inversion** and **guard clauses** to flatten code and improve readability.

#### ❌ Bad — deeply nested logic

```js
if (!isNaN(restID)) {
  if (!isNaN(itemID)) {
    if (validateCategory(category)) {
      MenuItem.update({ category }, { where: { restID, itemID } })
        .then(updated => {
          if (updated[0]) {
            res.status(200).json({ message: "Updated successfully" });
          } else {
            res.status(404).json({ error: "Item not found" });
          }
        })
    } else {
      res.status(400).json({ error: "Invalid category" });
    }
  } else {
    res.status(400).json({ error: "Invalid item ID" });
  }
} else {
  res.status(400).json({ error: "Invalid restaurant ID" });
}
```

#### ✅ Good — flat, predictable guard clauses

```js
if (isNaN(restID))
  return res.status(400).json({ error: "Invalid restaurant ID" });

if (isNaN(itemID)) 
  return res.status(400).json({ error: "Invalid item ID" });

if (!validateCategory(category))
  return res.status(400).json({ error: "Invalid category" });

const updated = await MenuItem.update(
  { category },
  { where: { restID, itemID } }
);

if (!updated[0])
  return res.status(404).json({ error: "Item not found" });

return res.status(200).json({ message: "Updated successfully" });
```

---

# **2. Frontend Naming Conventions**

### **Variables & Functions**

* **camelCase**

  ```
  let selectedItem;
  function renderMenuItems(items) {}
  ```

### **Classes**

* **PascalCase**

  ```
  class LayoutCreator {}
  class FloorplanView {}
  ```

### **Methods inside Classes**

* Public methods: **camelCase()**
* Private helpers: **_camelCase()**

### **Constants**

* **SCREAMING_SNAKE_CASE**

  ```
  const DEFAULT_SCALE = 1.0;
  ```

### **File & Module Names**

| Type                       | Naming         | Examples                           |
| -------------------------- | -------------- | ---------------------------------- |
| CSS files                  | **kebab-case** | `style-guide.css`, `floorplan.css` |
| Class files                | **PascalCase** | `LayoutCreator.js`, `Item.js`      |
| Utility/non-class JS files | **camelCase**  | `timeUtils.js`, `renderHelpers.js` |
| Test Files | *follow testing files name syntax*  | `filename.test.js` |

---

# **3. Backend Naming Conventions**

### **Variables & Functions**

* **snake_case**

  ```
  let reservation_id;
  function create_reservation(data) {}
  ```

### **Constants**

* **SCREAMING_SNAKE_CASE**

  ```
  const TOKEN_EXPIRY_MINUTES = 30;
  ```

### **File & Module Names**

| Purpose         | Naming                          | Examples                                  |
| --------------- | ------------------------------- | ----------------------------------------- |
| Database Models | **PascalCase**                  | `Reservation.js`, `MenuItem.js`           |
| Routers         | **camelCase**                   | `menuRouter.js`, `reservationRouter.js`   |
| Logic/Services  | **camelCase**                   | `menuLogic.js`, `scheduleLogic.js`        |
| Test Files      | **camelCase** (matching source) | `menuRouter.test.js`, `menuLogic.test.js` |

---

# **4. General Guidelines**

### Keep functions small and single-purpose

If a function does more than one thing, break it apart.

### Validate input early

Use guard clauses at the top of controllers and logic functions.

###  Consistent error messages

Error responses should follow a predictable pattern:

```
{ "error": "Description here" }
```

### Use async/await over .then chains

Avoid callback pyramids and promise chaining when possible.

---



# **5. Commenting Standards**

### Recommended:

- Only comment when need to describe complex logic

- ❌ Don’t comment obvious lines

- ❌ Explain non-trivial business rules

- Use block comments for complex logic