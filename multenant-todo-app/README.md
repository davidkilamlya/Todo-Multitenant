# Multitenant Todo App - Frontend

Welcome to the documentation for the frontend of the Multitenant Todo App. This document provides a detailed overview of how to set up, run, and use the frontend part of the application.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)



## Getting Started

Follow these steps to get the frontend up and running on your local machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/davidkilamlya/multitenant-front.git

2. Navigate to the project directory:
```bash
cd multitenant-todo-frontend
```

3. Install the dependencies:

```bash
npm install
```
### Configuration
In the src/constants directory, you can find baseUrl file where you can set your API base URL.

// src/constants/baseUrl.js
export const baseUrl = 'http://localhost:5001/api/v1/';

### Usage

1. Start the development server:
  
   ```bash
   npm start
   ```
2.Open in your browser http://localhost:3000

### Folder Structure

multitenant-todo-frontend/
├── public/
└── src/
    ├── Actions/
    ├── components/
    ├── constants/
    ├── Container/
    ├── PrivateRoutes/
    ├── Reducers/
    ├── Store/
    ├── util/
    ├── App.js
    └── index.js
    
public/: Contains public assets and the HTML template.
src/: Contains the main source code of the application.
actions/: Redux action creators for managing state.
components/: Reusable React components.
constants/: Configuration files and constants.
container/: Individual pages of the application.
reducers/: Redux reducers for handling state changes
store/: Redux store configuration and setup
util/: Utility functions and helper files.
App.js: Main component that renders the app.
index.js: Entry point of the application.

####
The state management is handled using Redux, a popular state management library. Here's a brief overview of the directories related to Redux:

- `actions/`: This directory contains action creators, which are functions that return actions. Actions are payloads of information that send data from the application to the Redux store.

- `reducers/`: Reducers specify how the application's state changes in response to actions sent to the store. Each reducer is responsible for managing a specific part of the state.

- `store/`: The Redux store holds the complete state tree of your application. The store is created using the `redux` library and middleware like `redux-thunk`  for handling asynchronous actions.

## Technologies Used

- React
- React Router
- Redux (for state management)
- Redux Thunk (middleware)
- Axios (for making HTTP requests)
- SCSS (for styling)
