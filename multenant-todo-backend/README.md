# Task Manager App

A simple web application to manage tasks.

## Table of Contents

- [Getting Started]
  - [Prerequisites]
  - [Installation]
- [Usage]
- [API Documentation]


## Getting Started

This guide will help you set up and run the Multitenant app on your local machine.

### Prerequisites

You'll need the following software/tools installed before running the app:

- Node.js (version 14 or higher)
- MongoDB (version 4 or higher)


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-manager.git

### Getting started
1. Navigate to the project directory:

  ```bash
  cd multitenant-todo-backend

  ```

2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the root directory and set environment variables:
  PORT=5000
  HOST=localhost
  secret="one-to-many-njombe-dog-kiingereza"
  mongoURI=mongodb://127.0.0.1:27017/multenant-app
  mailPass="elltuyoesrncsjmd"
  mailUser="dkilamlya@gmail.com"
  invite_secret="safari maji ya kitanda"

  ****for mongoURI Idont hove mongodb in your machine you can set `mongoURI="mongodb+srv://david:2ETBiL9L2bPMaOSO@cluster0.nzgv6ep.mongodb.net/?retryWrites=true&w=majority`

4. Run the application:
   ```bash
   npm start
   ```

## Usage
   * Visit http://localhost:3000 in your web browser.
   * Sign up or log in to your account.
   * Add, update, or delete tasks.
   

## API Documentation

### Base URL

The base URL for all API requests is: `http://localhost:5001/api/v1/`

### Authentication

To access protected routes, you need to include the JWT token in the request headers. The token is automatically added to the request when you're authenticated.

### Endpoints

#### Check Authentication

- **URL:** `/checkAuth`
- **Method:** GET
- **Description:** Check if the user is authenticated
- **Requires Authentication:** Yes
- **Response:**
  - `200 OK` if authenticated
  - `401 Unauthorized` if not authenticated

#### User Registration

- **URL:** `/register`
- **Method:** POST
- **Description:** Register a new user
- **Requires Authentication:** Yes
- **Response:**
  - `200 OK` if success
  - `401 Unauthorized` if not authenticated
  -- `500 Server error`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName":"firstname",
    "lastName":"lastname",
  }

#### User Profile

- **URL:** `/profile`
- **Method:** get
- **Description:** Get user profile
- **Response:**
  - `200 OK` if success
  - `401 Unauthorized` if not authenticated
  -- `500 Server error`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName":"firstname",
    "lastName":"lastname",
  }

#### Update user

- **URL:** `/profile`
- **Method:** put
- **Description:** update user profile
- **Response:**
  - `200 OK` if success
  - `401 Unauthorized` if not authenticated
  -- `500 Server error``
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName":"firstname",
    "lastName":"lastname",
  }

#### Get User 

- **URL:** `/user`
- **Method:** get
- **Description:** Get user
- **Response:**
  - `200 OK` if success
  - `401 Unauthorized` if not authenticated
  -- `500 Server error``
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName":"firstname",
    "lastName":"lastname",
  }

#### Logout

- **URL:** `/logout`
- **Method:** get
- **Description:** logout user

### Todo Lists

## POST /todo-lists
Description: Create a new todo list
Requires Authentication: Yes

Request Body:
{
  "todoListTitle": "My Todo List",
  "todoListDescription": "This is my todo list"
}

Response:
- 201 Created if successful
- 400 Bad Request if invalid data


## GET /todo-lists

Description: Get all todo lists
Requires Authentication: Yes

Response:
[
  {
    "_id": "list_id",
    "todoListTitle": "My Todo List",
    "todoListDescription": "This is my todo list",
    // ...other list data
  },
  // ...other lists
]

## GET /todo-lists/:id

Description: Get details of a single todo list
Requires Authentication: Yes

URL Parameters:
- id: The ID of the todo list

Response:
{
  "_id": "list_id",
  "todoListTitle": "My Todo List",
  "todoListDescription": "This is my todo list",
  // ...other list data
}

## PUT /todo-lists/:id

Description: Update details of a single todo list
Requires Authentication: Yes

URL Parameters:
- id: The ID of the todo list to update

Request Body:
{
  "todoListTitle": "Updated Todo List",
  "todoListDescription": "Updated description"
}

Response:
- 200 OK if successful
- 400 Bad Request if invalid data

## DELETE /todo-lists/:id

Description: Delete a particular todo list
Requires Authentication: Yes

URL Parameters:
- id: The ID of the todo list to delete

Response:
- 200 OK if successful
- 404 Not Found if list not found


## Todo Items

### Create Todo Item

POST /api/v1/todo-lists/:listId/todo-items/

Response:
 Status: 201 Created
 Body:
 {
   "_id": "todoItemId",
   "todoItemTitle": "Buy groceries",
   "completed": false,
   "priority":"high"
 }

## Update Todo Item
PUT /api/v1/todo-lists/:listId/todo-items/:itemId

Response:
 Status: 200 OK
 Body:
 {
   "completed":true
 }

## delete Item
  DELETE /api/v1/todo-lists/:listId/todo-items/:itemId
Response:
  Status: 204 No Content

### Invite Collaborator to Todo List

- **URL**: `/api/v1/todo-lists/:listId/collaborators/invite`
- **Method**: `POST`
- **Headers**:
- **Response (Success):**
     Status: 200 OK successfully

- **Response (Failure - Collaborator Already Added):**
     Status: 400 Bad Request

    -Status: 404 Not Found  
    - Status: 500 Internal Server Error
- **Request Body**:
  ```json
  {
    "email": "collaborator@example.com"
  }


### Collaborators Management

- **URL**: `/api/v1/todo-lists/:listId/collaborators/`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer ACCESS_TOKEN`
- **Response (Success)**:
  - **Status**: 200 OK
  - **Body**:
    ```json
    {
      "collaborators": [
        {
          "id": "collaboratorId1",
          "email": "collaborator1@example.com",
          "role": "editor"
        },
        {
          "id": "collaboratorId2",
          "email": "collaborator2@example.com",
          "role": "viewer"
        }
      ]
    }
    ```

- **URL**: `/api/v1/todo-lists/:listId/collaborators/`
- **Method**: `POST`
- **Headers**:
  - `Authorization: Bearer YOUR_ACCESS_TOKEN`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "newcollaborator@example.com",
    "role": "editor"
  }

**URL**: /api/v1/todo-lists/:listId/collaborators/:collaboratorId

**body**:
{
  "role": "viewer"
}

Status: 200 OK,Collaborator role updated successfully

Method: PUT


**URL:** /api/v1/todo-lists/:listId/collaborators/:collaboratorId

Status: 201 OK,No content
Method: DELETE

### Accept Collaboration Invitation

- **URL**: `/api/v1/collaborators/accept/:token`
- **Method**: `ALL`
- **Parameters**:
  - `token`: The collaboration invitation token
- **Response (Success)**:
  - The action specified by the invitation token will be executed successfully.
  - Note: The status code may vary based on the action executed.

- **Example**:
  - Accepting an invitation might involve joining a specific todo list as a collaborator or updating your role within that list. The exact outcome depends on the provided token.
