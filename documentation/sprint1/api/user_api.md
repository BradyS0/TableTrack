# User API Documentation

Unless specified otherwise, parameters are sent through request body.

### POST /v1/user/ 
Creates a new account.

### Parameters:

#### **first_name** (*String*)
limit of 2-30 characters, first letter of each part of name must be uppercase.

#### **last_name** (*String*)
limit of 2-30 characters, first letter of each part of name must be uppercase.

#### **email** (*String*) 

must be in similar format *username*@*email*.*com*, can include domain extension. 

#### **password**  (*String*)
limit of 8-15 characters, must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and one special character (#?!@$%^&*-).

### Responses:

#### 201: User created successfully.

#### 400: Invalid parameters, user was not created.


## POST /v1/user/login
Logs user into account.

### Parameters:

#### **email** (*String*) 

must be in similar format *username*@*email*.*com*, can include domain extension. 

#### **password**  (*String*)
limit of 8-15 characters, must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and one special character (#?!@$%^&*-).

### Responses:

#### 200: Login successful.

#### 401: Invalid email or password.

## DELETE /v1/user/{userID}
Deletes a given account.

### Parameters:

#### userID (*int*)
User ID of account to be deleted. Passed through URL.

### Responses:

#### 204: User successfully deleted.

#### 404: User not found.

## PATCH /v1/user/change/firstname
Changes the first name of user.

### Parameters:

#### **userID** (*int*)
User ID of account that will be updated.

#### **first_name** (*String*)
limit of 2-30 characters, first letter of each part of name must be uppercase.

### Responses:

#### 200: Account successfully updated.

#### 400: New first name was invalid.

#### 404: User was not found.

## PATCH /v1/user/change/lastname
Changes the last name of user.

### Parameters:

#### **userID** (*int*)
User ID of account that will be updated.

#### **last_name** (*String*)
limit of 2-30 characters, first letter of each part of name must be uppercase.

### Responses:

#### 200: Account successfully updated.

#### 400: New last name was invalid.

#### 404: User was not found.

## PATCH /v1/user/change/email
Changes email linked to account.

### Parameters:

#### **userID** (*int*)
User ID of account that will be updated.

#### **email** (*String*)
must be in similar format *username*@*email*.*com*, can include domain extension.

### Responses:

#### 200: Account successfully updated.

#### 400: New email was invalid, either does not meet requirements or email is already being used.

#### 404: User was not found.

## PATCH /v1/user/change/password
Changes account's password

### Parameters:

#### **userID** (*int*)
User ID of account that will be updated.

#### **old_password** (*String*)
limit of 8-15 characters, must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and one special character (#?!@$%^&*-).

#### **new_password** (*String*)
limit of 8-15 characters, must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and one special character (#?!@$%^&*-).

### Responses:

#### 200: Account successfully updated.

#### 400: Either old password or new password were invalid.

#### 401: The old password sent and the actual old password of the account do not match.

#### 404: User was not found.