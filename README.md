# Todo - Task Manager MERN Application

---

## TodoApp :-

##### website link :-

### https://mern-todoapp-crd6.onrender.com

##### hoseted on Render platform

### Test Examples:-

| variable name | Example                |
| ------------- | ---------------------- |
| email         | test@gmail.com |
| password      | test123456             |

---

## Installation :-

1. Clone the Repository First For Frontend and Backend

```sh
git clone https://github.com/ranupl/todoClient
```

```sh
git clone https://github.com/ranupl/Todo
```

2. Create a DataBase in the mongodb for locally running the porject
   Database Name : todo

- there are 2 repository
  1- Backend - todo
  2- Frontend - todoClient

3. install the dependencies

- for Backend purpose

```sh
cd Backend
npm install
```

- for Fontend purpose

```sh
cd Frontend
npm install
```

## To Start Development :-

### Note :

- internet is connected initially to start the react server
- 1st start backend development and then start the frontend
- need to have local mongoDB set up

### Note : before starting there should be a mongodb Database

Database Name : todo

#### Environment Variables :-

To run this project, you will need to add the following environment variables to your .env file

1. env file
   `PORT` = 5006
   `MONGODB_URI` = mongodb://localhost:27017/todo

### To Start the Servers

Backend Server:

```sh
npm start
```

Frontend Server:

```sh
npm start
```

## Backend :-

### Features

1. **JWT Token Usage:**

   - Upon successful user login or signup, a JSON Web Token (JWT) is generated.
   - The token contains user-specific information and a digital signature for verification.
   - This token is sent to the client and stored in localstorage for secure storage.

2. **Authorization:**

   - User actions, such as creating tasks or viewing the task list, updating the task , deleting the task
   - The JWT token includes information about the user's roles and permissions.
   - Middleware on the server validates the token and checks user permissions before allowing or denying access to specific routes or actions.

3. **Token Expiration and Renewal:**
   - JWT tokens can have expiration times to enhance security.
   - When a token is close to expiration, the client can make new login request.

### Libraries Used

    - cors
    - dotenv
    - express
    - http-errors
    - jsonwebtoken
    - mongoose
    - uuid
