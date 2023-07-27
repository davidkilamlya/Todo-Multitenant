Here how you can run this app
1. After successfully cloning the app open the terminal
   run--  cd multenant-to-app

2. install all required dependencies
   run-- npm install 

3.after successfully install open the other terminal
   run-- cd multenant-todo-backend

4. Install all required dependencies
   run-- npm install

5.After successfull install
   run-- npm start 

6.go back to the first terminal where there is frontend
   run-- npm start

7. now app is running successfully

CONFIGURATIONS DATA
--all configurations for backend are found on config folder and .env file
 this include database configurations and server port configuration

--make sure to change the baseUrl file for the frontend for an API connections to work

API TESTING
-first make sure you set the baseURL successfully

-Make sure you login or register first for you to get authentication Token then if your using API testing tools Copy the token and paste to Headers **without** word "Bearer" at the beginning
1.working API in frotend for Now

**--login**
    `{baseUrl}login`
--register
    `{baseUrl}register`




2. **using API testing tools**

--todo-lists
method: GET
    `{baseUrl}todo-lists`

--login
method: POST
    `{baseUrl}login`

--register
method: POST
    `{baseUrl}register`

--get user Profile
Method: GET
    `{baseUrl}profile`

--update user profile
Method: PUT
    `{baseUrl}profile`


TESTING CREDENTIALS
    email: dka@gmail.com
    password:1234


OTHER ROUTES THAT ARE YET TO BE CONNECTED TO FRONTEND
Send invitation
`{baseUrl}invitation`

accept invitation
`{baseUrl}acceptInvitation`

create new todo-list Item for logged user
method: POST
`{baseUrl}todo-list/:listId/todo-items/`

get all todo list items for logged user
method: GET
`{baseUrl}todo-list/:listId/todo-items/`

update singe todo list item for logged user
method: PUT
`{baseUrl}todo-list/:listId/todo-items/:itemId`


Delete single todo list item for logged user
method: DELETE
`{baseUrl}todo-list/:listId/todo-items/:itemId`
