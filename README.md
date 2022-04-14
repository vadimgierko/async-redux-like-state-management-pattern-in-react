# Async Redux-like state management pattern in React. Tutorial about how to manage global state & handle async CRUD functions in React apps integrated with Firebase realtime database using Context API & useReducer

## What we've built in previous tutorial

In [previous tutorial](https://github.com/vadimgierko/redux-like-state-management-pattern#readme) we've build a simple single page todo app using Context API & useReducer Redux-like state management pattern. You can see the code & play with it here: https://codesandbox.io/s/react-context-usereducer-redux-like-state-management-pattern-l7tpm2.

The app we've build in previous tutorial (& what be a foundation for the extended features in this tutorial) has:

- a global store created using React Context API,
- a reducer function to handle the state changes with useReducer hook,
- an app CRUD logic functions dispatching the changes in state via reducer,
- basic UI components.

Those version of the app didn't handle any async functions. There was no database connection & no fetching data. But in a real-world applications we would deal with async JavaScript, for example when fetching or posting data from database.

## What we will build in this tutorial

So in this tutorial we will extend our previous app features by connecting it to Firebase Realtime Database to store our todos in a cloud database.

## What we will will learn in this tutorial

In this tutorial we will learn:

- that Redux-like state management pattern works perfectly with async JS and we don't need to use any external libraries, like Thunk in Redux,
- how to connect a Redux-like state management pattern to the database & handle all of CRUD functions without any external libraries or packages (except firebase npm package).

## Get started!

`NOTE`: we wouldn't be building the app from the total scratch in this tutorial. We'd use a foundation built in previous tutorial. So if you want to built an app from scratch (to learn how to implement the basic Redux-like state management pattern in React), go to the previous tutorial first:

- link to the tutorial in readme file on github: https://github.com/vadimgierko/redux-like-state-management-pattern#readme
- link to the codesandbox with completed app: https://codesandbox.io/s/react-context-usereducer-redux-like-state-management-pattern-l7tpm2.

### Create a new Firebase project & connect it to the app

Ok, so we have an app from the previous tutorial set & now we will create a new Firebase project & connect it to the app:

- install firebase (9.6 +) as a dependency in your app (run _npm install firebase_ in your VSC terminal),
- go to https://firebase.google.com/,
- log in or create a new account,
- create a new Firebase project according to Firebase guide/ docs,
- create a Realtime database in the project (choose the test mode),
- register your app,
- copy Firebase SDK & paste it into firebaseConfig.js file (create the file) in src folder & then import { getDatabase } from "firebase/database" & export const database = getDatabase(app) (copy the code snippet below, but change your firebaseConfig object according to your SDK):

```
// src/firebaseConfig.js file:

// Import the functions you need from the SDKs:
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  // change your firebaseConfig object according to your SDK
  // keys below are the keys of tutorial app:

  apiKey: "AIzaSyBw_97Hn4rdu652ikqPPCD9RVHsVp8VGoE",
  authDomain: "redux-like-pattern-todo-app.firebaseapp.com",
  databaseURL:
    "https://redux-like-pattern-todo-app-default-rtdb.firebaseio.com",
  projectId: "redux-like-pattern-todo-app",
  storageBucket: "redux-like-pattern-todo-app.appspot.com",
  messagingSenderId: "657010584050",
  appId: "1:657010584050:web:6f96b6e1fd9ff2698be36b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
```

### Create basic CRUD Firebase functions

In our app we already have a folder named _logic_ & _todos-crud_ folder inside it. In that folder we have 3 files for addTodo, deleteTodo & updateTodo functions, which manage changes in our global app store.

So now we need to define same functions for adding, deleting & updating our database. The apps logic (order of CRUD functions) is as follows:

- when app mounts, it fetches todos from database & then put it to the global app store,
- when we add/delete/update todos, we first add/delete/update todos in database & then, if it succeed, we dispatch changes in app store (what means, that we do not fetch todos from database again).

So complete steps below:

- in _logic_ folder create a _firebase-crud_ folder,
- inside _firebase-crud_ folder create 4 files:
  - addToDatabase.js
  - deleteFromDatabase.js
  - fetchFromDatabase.js
  - generateFirebaseKeyFor.js
- copy the code from code snippets mentioned below & paste it to the appropriate files:

```
// addToDatabase.js file

import { database } from "../../firebaseConfig";
import { ref, set } from "firebase/database";

// props are structured in a firebase reference order
export default function addToDatabase(
  itemCategoryNameInThePlural,
  itemKey,
  item
) {
  return set(ref(database, itemCategoryNameInThePlural + "/" + itemKey), {
    todo: item
  })
    .then(() => {
      console.log(
        itemCategoryNameInThePlural +
          " item was successfully added to the database under the key:",
        itemKey
      );
    })
    .catch((error) => alert(error.message));
}
```

```
// deleteFromDatabase.js file

import { database } from "../../firebaseConfig.js";
import { ref, remove } from "firebase/database";

export default function deleteFromDatabase(
  itemCategoryNameInThePlural,
  itemKey
) {
  return remove(
    ref(database, itemCategoryNameInThePlural + "/" + itemKey)
  ).then(() =>
    console.log(
      itemCategoryNameInThePlural + " item with the key,",
      itemKey,
      " was successfully deleted from database."
    )
  );
}

```

```
// fetchFromDatabase.js file

import { database } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";

export default function fetchFromDatabase(
  itemCategoryNameInThePlural,
  dispatch
) {
  return onValue(
    ref(database, itemCategoryNameInThePlural),
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(
          "DATA WAS FETCHED: ALL USER'S " +
            itemCategoryNameInThePlural.toUpperCase() +
            ":",
          data
        );
        // add every fetched todo to the store:
        Object.keys(data).forEach((key) => {
          dispatch({
            type: "add-todo",
            payload: {
              id: key,
              todo: data[key].todo
            }
          });
        });
      } else {
        console.log(
          "There are no " +
            itemCategoryNameInThePlural +
            " or smth went wrong..."
        );
      }
    },
    {
      onlyOnce: true
    }
  );
}

```

```
// generateFirebaseKeyFor.js file

import { database } from "../../firebaseConfig";
import { ref, push, child } from "firebase/database";

export default function generateFirebaseKeyFor(itemCategoryNameInThePlural) {
  const firebaseKey = push(child(ref(database), itemCategoryNameInThePlural))
    .key;

  return firebaseKey;
}
```

### Modify CRUD functions in _todos-crud_ folder

Now we need to update our CRUD functions in _todos-crud_ folder. In every file we need to run firebase function first & then dispatch changes in the app. So the updated code in those files will be:

```
// addTodo.js
import generateFirebaseKeyFor from "../firebase-crud/generateFirebaseKeyFor";
import addToDatabase from "../firebase-crud/addToDatabase";

export default function addTodo(todo, dispatch) {
  // create a Firebase database key for a new todo:
  const id = generateFirebaseKeyFor("todos");

  if (todo && id) {
    addToDatabase("todos", id, todo).then(() => {
      dispatch({
        type: "add-todo",
        payload: {
          id: id,
          todo: todo
        }
      });
    });
  }
}
```

```
/// deleteTodo.js file:

import deleteFromDatabase from "../firebase-crud/deleteFromDatabase";

export default function deleteTodo(id, dispatch) {
  return deleteFromDatabase("todos", id).then(() => {
    return dispatch({
      type: "delete-todo",
      payload: {
        id: id
      }
    });
  });
}
```

```
// updateTodo.js

import addToDatabase from "../firebase-crud/addToDatabase";

export default function updateTodo(id, updatedTodo, dispatch) {
  return addToDatabase("todos", id, updatedTodo).then(() => {
    return dispatch({
      type: "update-todo",
      payload: {
        id: id,
        todo: updatedTodo
      }
    });
  });
}
```

### Modify Store to fetch todos when app mounts

```
// Store.js file:

import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer.js";
import { INIT_STATE } from "./initState.js";
import fetchFromDatabase from "../logic/firebase-crud/fetchFromDatabase";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  useEffect(() => {
    // fetch all todos from database:
    fetchFromDatabase("todos", dispatch);
  }, []);

  const value = {
    state,
    dispatch
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
```

Happy Coding!
