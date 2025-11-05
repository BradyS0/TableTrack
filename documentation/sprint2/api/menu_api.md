# Menu API Documentation

Unless specified otherwise, parameters are sent through request body.

### POST /v1/menu/{restID}
Creates a new menu item

### Parameters:
#### **restID** (*Int*)
The ID of restaurant this menu item belongs to.

#### **name** (*String*)
The name of the menu item to be added. (1 - _ characters)

#### **price** (*Int*)
The price of the menu item. ()

#### **description** (*String*) 
A description of the menu item. (0 - 200 characters)

#### **category** (*String*)
A category of the menu item. (1 - 20 characters)

### Responses:

#### 201: Menu Item created successfully.
Returns the created menu item:
{ itemID: (*Int*), restID: (*Int*), itemID: (*Int*), name: (*String*), price(*Int*), description (*String*)}

#### 400: Invalid parameters, menu item was not created.
#### 404: Restaurant cannot be found.

## GET v1/menu/{restID}
Get the entire list of menu items.

### Parameters:
#### **restID** (*Int*)
The ID of the restaurant the menu belongs to.

### Responses
#### 200: Found the menu of the restaurant
Returns the list of menu items of the restaurant.
{ menuItems: []}
#### 404: Restaurant cannot be found

## GET v1/menu/{restID}/
Get a single menu item

### Parameters:
#### **restID** (*Int*)
The ID of the restaurant the menu item belongs to.

#### **itemID** (*Int*)
The ID of the specified menu item.

### Responses
#### 200: Found the menu item of the restaurant.
Returns the specified menu item.
{ itemID: (*Int*) }
#### 400: Invalid item in request
#### 404: Restaurant cannot be found

## PATCH /v1/menu/{restID}/change/name
Update the name of the menu item.

### Parameters:

#### **restID** (*Int*)
The ID of the restaurant the menu item belongs to.

#### **itemID** (*Int*)
The ID of the specified menu item.

#### **name** (*Int*)
The new name of the menu item.

### Responses:
#### 200: success

#### 400: invalid name

#### 404: item not found

## PATCH /v1/menu/{restID}/change/price
Update the price of the menu item.

### Parameters:

#### **restID** (*Int*)
The ID of the restaurant the menu item belongs to.

#### **itemID** (*Int*)
The ID of the specified menu item.

#### **price** (*Int*)
New price of the menu item.

### Responses:
#### 200: success

#### 400: invalid price

#### 404: item not found

## PATCH /v1/menu/{restID}/change/description
Update the description of the menu item.

### Parameters:

#### **restID** (*Int*)
The ID of the restaurant the menu item belongs to.

#### **itemID** (*Int*)
The ID of the specified menu item.

#### **description** (*String*)
The new description of the menu item.

### Responses:
#### 200: success

#### 400: invalid description

#### 404: item not found

## PATCH /v1/menu/{restID}/change/category
Update the category of the menu item.

### Parameters:

#### **restID** (*Int*)
The ID of the restaurant the menu item belongs to.

#### **itemID** (*Int*)
The ID of the specified menu item.

#### **category** (*String*)
The category that the menu item will be changed to.

### Responses:
#### 200: success

#### 400: invalid category

#### 404: item not found

## DELETE /v1/menu/{restID}/{itemID}
Deletes a given menu item.

### Parameters:

#### **restID** (*Int*)
The ID of the restaurant the menu item belongs to.

#### **itemID** (*Int*)
The ID of the specified menu item.

### Responses:
#### 204: success

#### 404: item not found