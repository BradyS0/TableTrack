# **User API Documentation**

**Base URL:** `/v1/user`

---

## **POST [/v1/user/]()**

Create a new user account.

### **Request Body**

```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string"
}
```

### **Validation Rules**

* `first_name` & `last_name` must pass `UserLogic.validate_name`
* `email` must pass `UserLogic.validate_email`
* `password` must pass `UserLogic.validate_password`
* `email` must not already exist in the database

### **Responses**

#### **201 Created**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com"
}
```

#### **400 Bad Request**

```json
{ "error": "Invalid parameters" }
```

---

## **POST [/v1/user/login]()**

Authenticate and sign in a user.

### **Request Body**

```json
{
  "email": "string",
  "password": "string"
}
```

### **Responses**

#### **200 OK**

```json
{
  "user": { ... },
  "message": "Login successful!"
}
```

#### **401 Unauthorized**

```json
{ "error": "Invalid email or password" }
```

---

## **DELETE [/v1/user/:userID]()**

Delete a user by ID.

### **URL Parameter**

`userID` — integer

### **Responses**

#### **204 No Content**

User deleted successfully.

#### **404 Not Found**

```json
{ "error": "User not found" }
```

---

## **PATCH [v1/user/change/firstname]()**

### **Request Body**

```json
{
  "userID": number,
  "first_name": "string"
}
```

### **Responses**

#### **200 OK**

```json
{ "message": "First name updated" }
```

#### **400 Bad Request**

```json
{ "error": "Invalid first name" }
```

#### **404 Not Found**

```json
{ "error": "User not found" }
```

---

## **PATCH [v1/user/change/lastname]()**

### **Request Body**

```json
{
  "userID": number,
  "last_name": "string"
}
```

### **Responses**

#### **200 OK**

```json
{ "message": "Last name updated" }
```

#### **400 Bad Request**

```json
{ "error": "Invalid last name" }
```

#### **404 Not Found**

```json
{ "error": "User not found" }
```

---

## **PATCH [/v1/user/change/email]()** 

### **Request Body**

```json
{
  "userID": number,
  "email": "string"
}
```

### **Validation Rules**

* Email must be valid syntax.
* Email must not already exist.

### **Responses**

#### **200 OK**

```json
{ "message": "Email updated" }
```

#### **400 Bad Request**

```json
{ "error": "Invalid parameter" }
```

#### **404 Not Found**

```json
{ "error": "User not found" }
```

---

## **PATCH [/v1/user/change/password]()** — Update Password

### **Request Body**

```json
{
  "userID": number,
  "old_password": "string",
  "new_password": "string"
}
```

### **Responses**

#### **200 OK**

```json
{ "message": "Password updated" }
```

#### **400 Bad Request**

```json
{ "message": "Old password is invalid" }
```

or

```json
{ "message": "New password is invalid" }
```

#### **401 Unauthorized**

```json
{ "message": "Passwords do not match" }
```

#### **404 Not Found**

```json
{ "error": "User not found" }
```