# Async Redux-like state management pattern in React. Tutorial about how to manage global state & handle async CRUD functions in React apps integrated with Firebase realtime database using Context API & useReducer

## What we've built in previous tutorial

In [previous tutorial](https://github.com/vadimgierko/redux-like-state-management-pattern#readme) we've build a simple single page todo app using Context API & useReducer Redux-like state management pattern. You can see the code & play with it here: https://codesandbox.io/s/react-context-usereducer-redux-like-state-management-pattern-l7tpm2.

The app we've build in previous tutorial (& what be a foundation for the extended features in this tutorial) has:

- a global store created using React Context API,
- a reducer function to handle the state changes with useReducer hook,
- an app CRUD logic functions dispatching the changes in state via reducer,
- basic UI components.

Those version of the app didn't handle any async functions. There was no database connection & no fetching data. But in a real-world applications we would deal with async JavaScript, for example when fetching or posting data from/to database.

## What we will build in this tutorial

So in this tutorial we will extend our previous app features by connecting the app to the Firebase Realtime Database to store our todos. And of course, to do that, we will connect Firebase API with our previously built Redux-like store management pattern.

## What we will learn in this tutorial

In this tutorial we will learn:

- how React Context & useReducer Redux-like state management pattern works with async JS (Firebase API)
- that our Redux-like state management pattern needs no external libraries, like Thunk in Redux,
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
- copy Firebase SDK & paste it into src/firebaseConfig.js file (create the file)
- import { getDatabase } from "firebase/database" & export const database = getDatabase(app) (copy the code snippet below, but change your firebaseConfig object according to your SDK):

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

If you will have any problems with creating Firebase project or connecting it to your app, see Firebase docs.

### Create basic CRUD Firebase functions

In our app we already have a folder named _logic_ & _todos-crud_ folder inside it. In that folder we have 3 files for addTodo, deleteTodo & updateTodo functions, which manage changes in our global app store.

So now we need to define same functions for adding, deleting & updating our database. The apps logic (order of CRUD functions) is as follows:

- when app mounts, it fetches todos from database & then put it to the global app store,
- when we add/delete/update todos, we first add/delete/update todos in database & then, if it succeed, we dispatch changes in app store (what means, that we do not fetch todos from database again).

Before we will create Firebase CRUD functions, I want to show you, how our database structure will look:

```
"todos": {
  "$uniqueFirebaseKeyForTodo": {
    "todo": "our todo's content"
  }
}
```

You can see, that our store looks similar to database structure:

```
todos: {
  Tgfd87r990w-iekdkwew98: {
     todo: "our todo's content",
  },
}
```

Now, when we understand how our database is structured, complete steps below:

- in _logic_ folder create a _firebase-crud_ folder,
- inside _firebase-crud_ folder create 4 files:
  - addToDatabase.js
  - deleteFromDatabase.js
  - fetchFromDatabase.js
  - generateFirebaseKeyFor.js
- copy the code from code snippets mentioned below & paste it to the appropriate files:

(check explanation comments in code snippets below to understand the logic)

```
// addToDatabase.js file

import { database } from "../../firebaseConfig";
import { ref, set } from "firebase/database";

// The function below is written to be reusable:
// itemCategoryNameInThePlural argument represents the type of item, ex. "todos", "items" etc.
// It's needed for creating a database reference.
// The usual Firebase function would look like the commented function in the bottom of this file.

export default function addToDatabase(
  itemCategoryNameInThePlural, // "todos"
  itemKey, // generated Firebase unique key
  item // that's our todo
) {
  return set(ref(database, itemCategoryNameInThePlural + "/" + itemKey), {
    todo: item
  })
    .then(() => {
      // when todo is added to database, log success message:
      // (that's optional)
      console.log(
        itemCategoryNameInThePlural +
          " item was successfully added to the database under the key:",
        itemKey
      );
    })
    .catch((error) => alert(error.message));
}

// The function above is written to be reusable
// so it can be tricky to understand it on the first glance.
// If you want to simplify the function above (and maybe understand it better)
// you can use the code below:

/*
export default function addToDatabase(itemKey, item) {
  return set(ref(database, "todos/" + itemKey), {
    todo: item
  })
    .then(() => {
      // when todo is added to database, log success message:
      // (that's optional)
      console.log(
        "todos item was successfully added to the database under the key:",
        itemKey
      );
    })
    .catch((error) => alert(error.message));
}
*/
```

```
// deleteFromDatabase.js file

import { database } from "../../firebaseConfig.js";
import { ref, remove } from "firebase/database";

// The function below is written to be reusable:
// itemCategoryNameInThePlural argument represents the type of item, ex. "todos", "items" etc.
// It's needed for creating a database reference.
// The usual Firebase function would look like the commented function in the bottom of this file.

export default function deleteFromDatabase(
  itemCategoryNameInThePlural, // "todos"
  itemKey // Firebase unique key
) {
  return remove(ref(database, itemCategoryNameInThePlural + "/" + itemKey))
    .then(() =>
      // when todo is deleted from database, log success message:
      // (that's optional)
      console.log(
        itemCategoryNameInThePlural + " item with the key,",
        itemKey,
        " was successfully deleted from database."
      )
    )
    .catch((error) => alert(error.message));
}

// The function above is written to be reusable,
// so it can be tricky to understand it on the first glance.
// If you want to simplify the function above (and maybe understand it better)
// you can use the code below:

/*
export default function deleteFromDatabase(itemKey) {
  return remove(ref(database, "todos/" + itemKey))
    .then(() =>
      // when todo is deleted from database, log success message:
      // (that's optional)
      console.log(
        "todo item with the key",
        itemKey,
        "was successfully deleted from database."
      )
    )
    .catch((error) => alert(error.message));
}
*/
```

```
// fetchFromDatabase.js file

import { database } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";

// The function below is written to be reusable:
// itemCategoryNameInThePlural argument represents the type of item, ex. "todos", "items" etc.
// It's needed for creating a database reference.

// fetch all items (todos in this case) from database (once, when app is mounted)
// and add them to the store using dispatch:
export default function fetchFromDatabase(
  itemCategoryNameInThePlural, // "todos"
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

// The function below is written to be reusable:
// itemCategoryNameInThePlural argument represents the type of item, ex. "todos", "items" etc.
// It's needed for creating a database reference.

// generate Firebase unique key for the item:
export default function generateFirebaseKeyFor(itemCategoryNameInThePlural) {
  const firebaseKey = push(child(ref(database), itemCategoryNameInThePlural))
    .key;

  return firebaseKey;
}
```

### Modify todos CRUD functions in logic/todos-crud

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

### Last step: Modify Store to fetch todos when app mounts

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

## Summary

Congratulations! Our app is complete!

Remember, that the pattern we've learned in this and previous tutorial, is reusable, so you can use it in every app (like me ;-)

Happy Coding!
